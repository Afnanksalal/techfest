# Generated by Django 5.1.5 on 2025-01-25 08:50

import app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Full Name')),
                ('college', models.CharField(max_length=100, verbose_name='College')),
                ('year', models.CharField(max_length=10, verbose_name='Year of Study')),
                ('branch', models.CharField(max_length=50, verbose_name='Branch')),
                ('phone', models.CharField(max_length=15, verbose_name='Phone Number')),
                ('email', models.EmailField(max_length=254, verbose_name='Email Address')),
                ('events', models.TextField(verbose_name='Selected Events')),
                ('payment_screenshot', models.ImageField(upload_to=app.models.custom_filename, verbose_name='Payment Screenshot')),
                ('total_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10, verbose_name='Total Amount (₹)')),
            ],
            options={
                'verbose_name': 'Event Registration',
                'verbose_name_plural': 'Event Registrations',
            },
        ),
    ]
