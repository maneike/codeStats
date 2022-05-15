from django.shortcuts import render
from django.views import View
from .forms import RepoUrlForm, RepoZipForm


class ReportView(View):

    def get(self, request):
        context = {'urlform': RepoUrlForm, 'zipform': RepoZipForm}
        return render(request, 'app/index.html', context)

    def post(self, request):
        pass
