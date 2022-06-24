from django.urls import path

from . import views

urlpatterns = [
    path('zip/', views.ZipRepoView.as_view(), name='zip'),
    path('url/', views.UrlRepoView.as_view(), name='url'),
    path('merged/', views.UsersReportView.as_view(), name='merged'),
    path('report/<str:repo_name>/', views.GetReportView.as_view(), name='report'),
]
