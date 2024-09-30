from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .serializers import ExpenseSerializer, IncomeSerializer, BudgetSerializer, FinancialReportSerializer, RegisterSerializer, UserSerializer, ProfileSerializer, NotificationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expense, Income, Budget, FinancialReport, Profile, Notification
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import permissions
from datetime import datetime
from django.http import FileResponse, Http404

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
        limit = request.data.get('limit')  # New field for budget limit

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

        # Check if the limit is provided and valid
        if limit is None:
            return Response({'error': 'Budget limit is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            limit = float(limit)
            if limit <= 0:
                return Response({'error': 'Budget limit should be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid limit format. Must be a number.'}, status=status.HTTP_400_BAD_REQUEST)

        # Call the super method to create the budget after validation
        response = super().create(request, *args, **kwargs)

        # Check the budget limit after creation
        budget = Budget.objects.get(id=response.data['id'])  # Get the created budget
        self.check_budget_limit(request.user, budget)  # Check if the budget exceeds the limit

        return response
    
    def update_budget(self, request, budget_id):
        budget = Budget.objects.get(id=budget_id, user=request.user)

        # Update the budget with the new amount and other fields
        budget.amount = request.data.get('amount', budget.amount)  # Ensure this is being passed in the request
        budget.save()

        # Check if the updated amount exceeds the budget limit
        self.check_budget_limit(request.user, budget)

        return Response({"status": "Budget updated successfully."}, status=status.HTTP_200_OK)
    
    def check_budget_limit(self, user, budget):
        if budget.amount > budget.limit:  
            Notification.objects.create(
                user=user,
                message=f"Budget limit reached for {budget.category}: ${budget.amount} exceeds ${budget.limit}.",
            )


class FinancialReportListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reports = FinancialReport.objects.all()
        serializer = FinancialReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user  # Get the currently authenticated user
        report = FinancialReport(user=user)  # Create a new report instance for the user
        report.calculate_report()  # Call the method to calculate totals
        
        # Save the report without a file if not uploading
        report.save()  # This saves the report with calculated totals

        return Response(FinancialReportSerializer(report).data, status=status.HTTP_201_CREATED)

class FinancialReportDetailAPIView(APIView):
    def get(self, request, report_id):
        try:
            report = FinancialReport.objects.get(id=report_id)
            file_path = report.file.path  # Assuming your model has a FileField for the report
            response = FileResponse(open(file_path, 'rb'), as_attachment=True)
            return response
        except FinancialReport.DoesNotExist:
            raise Http404("Report not found.")
      
    def delete(self, request, report_id):
        try:
            report = FinancialReport.objects.get(id=report_id)
            report.delete()  # Delete the report
            return Response(status=status.HTTP_204_NO_CONTENT)  # Return no content status
        except FinancialReport.DoesNotExist:
            return Response({'detail': 'Report not found.'}, status=status.HTTP_404_NOT_FOUND)

class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    # Return the user's profile if it exists, otherwise return an empty queryset
    return Profile.objects.filter(user=self.request.user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class NotificationListView(generics.ListAPIView):
    """View to list user notifications."""
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return notifications for the authenticated user."""
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')
    