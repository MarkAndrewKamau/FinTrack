from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BudgetSerializer, FinancialReportSerializer, RegisterSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expense, Income, Budget, FinancialReport
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import permissions

# Create your views here.

class RegistrationView(APIView):
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]
  def post(self, request):
    serializer = self.serializer_class(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
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
    if request.data.get('amount') <= 0: 
      return Response({'error': 'Amount should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)
  

class IncomeViewSet(viewsets.ModelViewSet):
  queryset = Income.objects.all()
  serializer_class = IncomeSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Income.objects.filter(user=self.request.user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  def create(self, request, *args, **kwargs):
    if request.data.get('amount') and float(request.data.get('amount')) <= 0:
      return Response({'error': 'Amount should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)
  

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

    if start_date >= end_date:
      return Response({'error': 'End date should be after start date'}, status=status.HTTP_400_BAD_REQUEST)
    
    if float(amount) <= 0:
      return Response({'error': 'Amount should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
    
    return super().create(request, *args, **kwargs)


class FinancialReportAPIView(APIView):
  permission_classes = [IsAuthenticated]

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
  