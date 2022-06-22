import os
from rest_framework import views
from rest_framework.parsers import MultiPartParser
from django.http import JsonResponse
from .functions import generate_basic_report, get_all_users, get_all_users_from_zip, handle_zip_save


class ZipRepoView(views.APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        file_obj = request.FILES['file']
        name = handle_zip_save(file_obj)
        users = get_all_users_from_zip(name)
        os.system("rm -rf *zip")
        return JsonResponse(users, status=200)


class UrlRepoView(views.APIView):

    def post(self, request):
        url = self.request.data
        users = get_all_users(url['url'])
        return JsonResponse(users, status=200)


class UsersReportView(views.APIView):

    def post(self, request):
        merged_users = self.request.data
        report = generate_basic_report(merged_users['repo_name'], merged_users['merged_users'])
        return JsonResponse(report, status=200)
