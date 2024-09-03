from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BudgetSerializer, FinancialReportSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Expense, Income, Budget, FinancialReport
from rest_framework.views import APIView

# Create your views here.
class ExpenseViewSet(viewsets.ModelViewSet):
  serializer_class = ExpenseSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Expense.objects.filter(user=self.request.user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  def create(self, request, *args, **kwargs):
    if request.data.get('amount') and float(request.data.get('amount')) >= 0:
      return Response({'error': 'Amount should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)
  

class IncomeViewSet(viewsets.ModelViewSet):
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
  