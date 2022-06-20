from django.urls import path

from . import views

urlpatterns = [
    path('zip/', views.ZipRepoView.as_view(), name='zip'),
    path('url/', views.UrlRepoView.as_view(), name='url'),
]
