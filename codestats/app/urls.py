from django.urls import path
from .views import ReportView

urlpatterns = [
    path('', ReportView.as_view(), name="report"),
]
