from django.utils.html import format_html
from django.contrib import admin
from django.http import HttpResponse
from openpyxl import Workbook
from .models import Registration

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
    )
    actions = [export_to_excel]  # Add the custom action here

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