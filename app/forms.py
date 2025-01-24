from django import forms
from .models import Registration
from django.core.exceptions import ValidationError
import os

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = Registration
        fields = ['name', 'college', 'year', 'branch', 'phone', 'email', 'payment_screenshot']
    
    def clean_payment_screenshot(self):
        image = self.cleaned_data.get('payment_screenshot')
        if image:
            ext = os.path.splitext(image.name)[1].lower()
            valid_extensions = ['.png', '.jpg', '.jpeg']
            if ext not in valid_extensions:
                raise ValidationError("Unsupported file format. Only PNG, JPG, and JPEG are allowed.")
            if image.size > 5 * 1024 * 1024:  # 5MB limit
                raise ValidationError("File size too large. Maximum allowed size is 5MB.")
        return image