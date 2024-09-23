from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BudgetSerializer, FinancialReportSerializer, RegisterSerializer, UserSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expense, Income, Budget, FinancialReport, Profile
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import permissions
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from datetime import datetime

# Create your views here.

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken  # Import for generating JWT tokens
from rest_framework.views import APIView
from .serializers import RegisterSerializer

class RegistrationView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT token for the newly created user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Return both the success message and JWT token
            return Response(
                {
                    'message': 'User created successfully',
                    'access': access_token,   # Access token
                    'refresh': str(refresh)   # Refresh token
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.IsAuthenticated]
  http_method_names = ['get', 'post', 'put', 'patch', 'delete']

class ExpenseViewSet(viewsets.ModelViewSet):
  queryset = Expense.objects.all()
  serializer_class = ExpenseSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Expense.objects.filter(user=self.request.user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  def create(self, request, *args, **kwargs):
    # Ensure amount is converted to a float
    amount = float(request.data.get('amount', 0))
    if amount <= 0:
        return Response({'error': 'Amount must be greater than zero.'}, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)
  

class IncomeViewSet(viewsets.ModelViewSet):
  queryset = Income.objects.all()
  serializer_class = IncomeSerializer
  permission_classes = [IsAuthenticated]

  def get_serializer_context(self):
      """Add user to the serializer context"""
      context = super().get_serializer_context()
      context.update({'request': self.request})
      return context


from rest_framework import status
from rest_framework.response import Response

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)
  
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        amount = request.data.get('amount')

        # Check if start_date or end_date are missing
        if not start_date or not end_date:
            return Response({'error': 'Start date and end date are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert start_date and end_date to datetime objects for comparison
        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=status.HTTP_400_BAD_REQUEST)

        if start_date >= end_date:
            return Response({'error': 'End date should be after start date'}, status=status.HTTP_400_BAD_REQUEST)
    
        if float(amount) <= 0:
            return Response({'error': 'Amount should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
    
        return super().create(request, *args, **kwargs)


class FinancialReportAPIView(APIView):
  permission_classes = [IsAuthenticated]

  @method_decorator(cache_page(60*75, key_prefix=lambda view: view.request.user.id))
  def get(self, request, *args, **kwargs):
    reports = FinancialReport.objects.filter(user=request.user)
    if not reports.exists():
      return Response({'detail': 'No report found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FinancialReportSerializer(reports, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    report, created = FinancialReport.objects.get_or_create(user=request.user)
    report.calculate_report()

    serializer = FinancialReportSerializer(report)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    # Return the user's profile if it exists, otherwise return an empty queryset
    return Profile.objects.filter(user=self.request.user)

