from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import RegistrationForm

def index(request):
    return render(request, 'index.html')

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST, request.FILES)
        selected_events = request.POST.getlist('events[]')
        
        if not selected_events:
            messages.error(request, "Please select at least one event.")
        elif form.is_valid():
            registration = form.save(commit=False)
            registration.events = ', '.join(selected_events)
            registration.save()
            messages.success(request, "Registration successful!")
            return redirect('register')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = RegistrationForm()
    
    return render(request, 'register.html', {'form': form})