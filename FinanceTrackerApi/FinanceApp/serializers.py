from rest_framework import serializers
from .models import Expense, Income, Budget, FinancialReport, Profile
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
            raise serializers.ValidationError({'username': 'A user with this username already exists.'})

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'A user with this email already exists.'})

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

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['user', 'id', 'amount', 'source', 'date']

    def create(self, validated_data):
        # Remove 'user' from validated_data if it's there
        validated_data.pop('user', None)

        # Assign the authenticated user manually
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
        fields = '__all__'

class FinancialReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialReport
        fields = '__all__'

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
        fields = ['user', 'id', 'bio', 'location', 'birth_date']
