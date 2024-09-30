"""
URL configuration for FinanceTrackerApi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from FinanceApp.views import ExpenseViewSet, IncomeViewSet, BudgetViewSet, FinancialReportListCreateAPIView, FinancialReportDetailAPIView, RegistrationView, UserViewSet, ProfileViewSet, NotificationListView
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'incomes', IncomeViewSet, basename='income')
router.register(r'budgets', BudgetViewSet, basename='budget')
router.register(r'profiles', ProfileViewSet, basename='profile')

schema_view = get_schema_view(
   openapi.Info(
      title="FinTrack API",
      default_version='v1',
      description="API documentation for the FinTrack application",
      terms_of_service="https://www.yourapp.com/terms/",
      contact=openapi.Contact(email="support@yourapp.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('financial-report/', FinancialReportListCreateAPIView.as_view(), name='financial_report-list'),
    path('financial-report/<int:report_id>/', FinancialReportDetailAPIView.as_view(), name='financial-report-detail'),
    path('api/register/', RegistrationView.as_view(), name='register'),
    path('api/', include(router.urls)),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/social/', include('allauth.socialaccount.urls')),
    path('accounts/', include('allauth.urls')),
    path('api/notifications/', NotificationListView.as_view(), name='notification-list'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)