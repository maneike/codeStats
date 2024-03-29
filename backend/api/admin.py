from django.contrib import admin
from .models import Repositories, Authors, Branches, Commits, Changes, Report, RepoLanguages

admin.site.register(Repositories)
admin.site.register(Authors)
admin.site.register(Branches)
admin.site.register(Commits)
admin.site.register(Changes)
admin.site.register(Report)

class RepoLanguagesAdmin(admin.ModelAdmin):
    list_display = ['languages', 'percentage', 'repository']

admin.site.register(RepoLanguages, RepoLanguagesAdmin)