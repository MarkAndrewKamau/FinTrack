from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    """A profile form"""
    class Meta:
        model = Profile
        fields = ('bio', 'location', 'birth_date', 'profile_image')
