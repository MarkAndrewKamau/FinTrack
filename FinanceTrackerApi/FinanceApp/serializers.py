from rest_framework import serializers
from .models import Expense, Income, Budget, FinancialReport, Profile
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
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

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
