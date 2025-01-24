from django.utils.html import format_html
from django.contrib import admin
from django.http import HttpResponse
from openpyxl import Workbook
from .models import Registration

def calculate_total_amount(events_list):
    """
    Calculate total price with workshop discounts (matches JavaScript logic).
    """
    workshop_price = 300
    competition_price = 30
    workshop_discount_threshold = 3
    workshop_discount_total = 750

    workshop_count = 0
    competition_count = 0

    for event in events_list:
        if event.startswith("workshop"):
            workshop_count += 1
        elif event.startswith("competition"):
            competition_count += 1

    # Apply workshop discount
    if workshop_count >= workshop_discount_threshold:
        workshop_total = workshop_discount_total
    else:
        workshop_total = workshop_count * workshop_price

    competition_total = competition_count * competition_price
    return workshop_total + competition_total

def export_to_excel(modeladmin, request, queryset):
    """
    Custom admin action to export selected records to an Excel file.
    """
    # Create a new workbook and select the active worksheet
    wb = Workbook()
    ws = wb.active
    ws.title = "Registrations"

    # Define the column headers
    headers = [
        "Name",
        "College",
        "Year",
        "Branch",
        "Phone",
        "Email",
        "Events",
        "Payment Screenshot",
        "Total Amount",
    ]
    ws.append(headers)

    # Add data rows
    for registration in queryset:
        row = [
            registration.name,
            registration.college,
            registration.year,
            registration.branch,
            registration.phone,
            registration.email,
            registration.events,
            registration.payment_screenshot.url if registration.payment_screenshot else "No Image",
            registration.total_amount,
        ]
        ws.append(row)

    # Create a response object with the Excel file
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = 'attachment; filename="registrations.xlsx"'
    wb.save(response)

    return response

export_to_excel.short_description = "Export selected registrations to Excel"

class RegistrationAdmin(admin.ModelAdmin):
    """
    Custom admin interface for the Registration model.
    """
    list_display = (
        "name",
        "college",
        "year",
        "branch",
        "phone",
        "email",
        "events_preview",
        "payment_preview",
        "total_amount",  # Display total amount in the list view
    )
    actions = [export_to_excel]  # Add the custom action here

    def save_model(self, request, obj, form, change):
        """
        Calculate total amount using the same logic as the JavaScript.
        """
        events_list = obj.events.split(", ")  # Split stored events string
        obj.total_amount = calculate_total_amount(events_list)
        super().save_model(request, obj, form, change)

    def events_preview(self, obj):
        return obj.events[:50] + "..." if len(obj.events) > 50 else obj.events
    events_preview.short_description = "Selected Events"

    def payment_preview(self, obj):
        if obj.payment_screenshot:
            return format_html(
                '<a href="{0}" target="_blank">'
                '<img src="{0}" style="max-height: 100px; max-width: 150px; border: 1px solid #ddd; border-radius: 4px; padding: 5px;"/>'
                '</a>'.format(obj.payment_screenshot.url)
            )
        return "No Image Uploaded"
    payment_preview.short_description = "Payment Proof"

admin.site.register(Registration, RegistrationAdmin)