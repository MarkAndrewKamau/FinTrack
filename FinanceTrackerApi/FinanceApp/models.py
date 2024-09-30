from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from reportlab.pdfgen import canvas
from django.core.files.base import ContentFile
from io import BytesIO

class Expense(models.Model):
    """Model for Expense Tracking"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    category = models.CharField(max_length=50)

    def __str__(self):
        """String representation for the Expenses"""
        return f"{self.user.username} - {self.amount}"

class Income(models.Model):
    """Model for the Income Tracking"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    source = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        """String representation for the Income"""
        return f"{self.user.username} - {self.amount}"

class Budget(models.Model):
    """Model for the Budget Tracking"""
    category_choices = [
        ('Income', 'Income'),
        ('Expense', 'Expense'),
        ('Savings', 'Savings'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=category_choices)
    start_date = models.DateField()
    end_date = models.DateField()
    limit = models.FloatField(default=0)

    def __str__(self):
        """String representation for the Budget"""
        return f"{self.user.username} - {self.category} - {self.amount}"

class FinancialReport(models.Model):
    """Model for the Financial Report Generation"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_income = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    total_expenses = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    budget_status = models.DecimalField(max_digits=15, decimal_places=2, default=0.00, help_text="Budget surplus/deficit")
    report_date = models.DateField(auto_now_add=True)
    file = models.FileField(upload_to='reports/')

    def __str__(self):
        """String representation for the Financial Report"""
        return f"{self.user.username} - {self.report_date} Financial Report"
    
    def generate_report_file(self):
        """Generate a PDF report and save it to the file field."""
        if self.file:
            self.file.delete(save=False)

        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 100, f"Financial Report for {self.user.username}")
        p.drawString(100, 120, f"Total Income: {self.total_income}")
        p.drawString(100, 140, f"Total Expenses: {self.total_expenses}")
        p.drawString(100, 160, f"Budget Status: {self.budget_status}")
        p.drawString(100, 180, f"Report Date: {self.report_date}")
        p.showPage()
        p.save()
        buffer.seek(0)

        self.file.save(f"financial_report_{self.report_date}.pdf", ContentFile(buffer.read()), save=True)

    def calculate_report(self):
        """Method to calculate the Financial Report"""
        budgets = Budget.objects.filter(user=self.user)

        income_budgets = budgets.filter(category='Income')
        expense_budgets = budgets.filter(category='Expense')

        total_income = sum(budget.amount for budget in income_budgets)
        total_expenses = sum(budget.amount for budget in expense_budgets)

        self.total_income = total_income
        self.total_expenses = total_expenses
        self.budget_status = total_income - total_expenses

        self.save()
        self.generate_report_file()

class Profile(models.Model):
    """Model for the profile"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=350, blank=True)
    location = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True)

    def __str__(self):
        """String representation for the profile"""
        return f"{self.user.username}'s Profile"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Creates the user's profile"""
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Saves the user's profile"""
    instance.profile.save()


class Notification(models.Model):
    """Model for Notification"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        """String representation for the Notification"""
        return f"Notifcation for {self.user.username}: {self.message}"
