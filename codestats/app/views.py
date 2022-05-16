from django.shortcuts import render
from django.views import View
from django.http import FileResponse
from .forms import RepoUrlForm, RepoZipForm
from .functions import generate_basic_report


class ReportView(View):

    def get(self, *args, **kwargs):
        context = {'urlform': RepoUrlForm, 'zipform': RepoZipForm}
        return render(self.request, 'app/index.html', context)

    def post(self, *args, **kwargs):
        repo_name = generate_basic_report(self.request.POST['repo_url'])
        return FileResponse(open(f"{repo_name}.txt", "rb"), as_attachment=True, filename=f"{repo_name}.txt")
