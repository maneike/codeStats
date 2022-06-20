from rest_framework import views
from rest_framework.parsers import FileUploadParser
from django.http import JsonResponse
from .functions import generate_basic_report


class ZipRepoView(views.APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request):
        file_obj = request.FILES['file']
        # do some stuff with uploaded file
        return JsonResponse({"test": "test"}, status=200)


class UrlRepoView(views.APIView):

    def post(self, request):
        url = self.request.data
        report = generate_basic_report(url['url'])
        # do some stuff with uploaded file
        return JsonResponse(report, status=200)
