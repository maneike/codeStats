import os
from rest_framework import views
from rest_framework.parsers import MultiPartParser
from django.http import JsonResponse
from .functions import get_all_users
from .tasks import generate_basic_report, get_all_users_from_zip, handle_zip_save
from .models import Report
import json


class ZipRepoView(views.APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        os.system("rm -rf ./target/from_zip")
        file_obj = request.FILES['file']
        receivers = self.request.data['receivers']
        name = handle_zip_save(file_obj, receivers)
        users = get_all_users_from_zip(name)
        return JsonResponse(users, status=200)


class UrlRepoView(views.APIView):

    def post(self, request):
        urls = self.request.data['mergedUrls']
        receivers = self.request.data['receivers']
        users = get_all_users(urls, receivers)
        return JsonResponse(users, status=200)


class UsersReportView(views.APIView):

    def post(self, request):
        merged_users = self.request.data
        generate_basic_report.delay(
            merged_users['repo_name'], merged_users['merged_users'], merged_users['languages'])
        return JsonResponse({"ok": "Raport jest w trakcie tworzenia"}, status=200)


class GetReportView(views.APIView):

    def get(self, request, repo_name):
        report = Report.objects.filter(repo_name=repo_name).values("report").order_by('-id')[0]["report"]
        return JsonResponse(json.loads(report), status=200)
