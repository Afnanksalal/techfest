from django.db import models
from django.utils import timezone
import re
import os

def custom_filename(instance, filename):
    """
    Generates a custom filename for uploaded payment screenshots.
    Format: name_college_branch_timestamp.extension
    """
    # Clean and format fields
    name = re.sub(r'[^a-zA-Z0-9_]', '', instance.name.replace(' ', '_'))
    college = re.sub(r'[^a-zA-Z00-9_]', '', instance.college.replace(' ', '_'))
    branch = re.sub(r'[^a-zA-Z0-9_]', '', instance.branch.replace(' ', '_'))
    timestamp = timezone.now().strftime("%Y%m%d_%H%M%S")
    ext = os.path.splitext(filename)[1]  # Get the file extension
    return f'payment_screenshots/{name}_{college}_{branch}_{timestamp}{ext}'

class Registration(models.Model):
    """
    Model for event registration.
    """
    name = models.CharField(max_length=100, verbose_name="Full Name")
    college = models.CharField(max_length=100, verbose_name="College")
    year = models.CharField(max_length=10, verbose_name="Year of Study")
    branch = models.CharField(max_length=50, verbose_name="Branch")
    phone = models.CharField(max_length=15, verbose_name="Phone Number")
    email = models.EmailField(verbose_name="Email Address")
    events = models.TextField(verbose_name="Selected Events")
    payment_screenshot = models.ImageField(
        upload_to=custom_filename,
        verbose_name="Payment Screenshot"
    )

    def __str__(self):
        """
        String representation of the model.
        """
        return f"{self.name} - {self.college} ({self.year} Year)"

    class Meta:
        verbose_name = "Event Registration"
        verbose_name_plural = "Event Registrations"