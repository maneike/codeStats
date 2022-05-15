from django import forms


class RepoUrlForm(forms.Form):
    repo_url = forms.CharField(max_length=250, label="Url do repozytorium")


class RepoZipForm(forms.Form):
    repo_url = forms.FileField(label="Zip z repozytorium")
