from django.db import models


class Repositories(models.Model):
    repo_name = models.CharField(max_length=200)
    receivers = models.CharField(max_length=1000)

    def __str__(self):
        return self.repo_name


class Authors(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    old_name = models.CharField(max_length=200, default="def")
    old_email = models.EmailField(default="def@def.com")
    repository = models.ForeignKey(Repositories, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Branches(models.Model):
    name = models.CharField(max_length=200)
    commits_count = models.IntegerField()
    repository = models.ForeignKey(Repositories, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Commits(models.Model):
    author = models.ForeignKey(Authors, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branches, on_delete=models.CASCADE)
    date = models.DateTimeField()
    message = models.CharField(max_length=500)
    edited_files = models.CharField(max_length=1000)

    def __str__(self):
        return self.message


class Changes(models.Model):
    commit = models.ForeignKey(Commits, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=200)
    insertions = models.IntegerField()
    deletions = models.IntegerField()
    lines = models.IntegerField()


class Report(models.Model):
    repo_name = models.CharField(max_length=200)
    report = models.JSONField()
