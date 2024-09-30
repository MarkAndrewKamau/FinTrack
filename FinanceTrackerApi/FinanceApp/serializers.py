from rest_framework import serializers
from .models import Expense, Income, Budget, FinancialReport, Profile, Notification
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Override validate method
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'A user with this username already exists.'})

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'A user with this email already exists.'})

        return data

    def create(self, validated_data):
        # Create the user with the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
  
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password']  

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

        extra_kwargs = {
            'user': {'read_only': True}  # Ensure 'user' is read-only and auto-assigned
        }

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['user', 'id', 'amount', 'source', 'date']

        extra_kwargs = {
            'user': {'read_only': True}  # Ensure 'user' is read-only and auto-assigned
        }

    def create(self, validated_data):
        # Assign the authenticated user manually from the request context
        user = self.context['request'].user
        
        # Create and return the Income object
        return Income.objects.create(user=user, **validated_data)
    
    def update(self, instance, validated_data):
        # Update specific fields
        instance.amount = validated_data.get('amount', instance.amount)
        instance.source = validated_data.get('source', instance.source)
        instance.date = validated_data.get('date', instance.date)
        instance.save()
        return instance
    

class BudgetSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Budget
        fields = ['user', 'id', 'amount', 'category', 'start_date', 'end_date', 'limit']

        extra_kwargs = {
            'user': {'read_only': True}  # Ensures 'user' is read-only and auto-assigned
        }

class FinancialReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialReport
        fields = ['user', 'id', 'total_income', 'total_expenses', 'budget_status', 'report_date', 'file']

        extra_kwargs = {
            'user': {'read_only': True},
            'file': {'read_only': False}
        }

    def create(self, validated_data):
        # Create FinancialReport object without saving it
        report = FinancialReport(**validated_data)

        # Call calculate_report method to calculate the report
        report.calculate_report()

        # Save and Return the report
        report.save()
        return report

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'id', 'bio', 'location', 'birth_date', 'profile_pic']

        extra_kwargs = {
            'user': {'read_only': True},
            'profile_pic': {'read_only': False}
        }


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['user', 'id', 'message', 'created_at', 'is_read']

        extra_kwargs = {
            'user': {'read_only': True}  # Ensure 'user' is read-only and auto-assigned
        }
