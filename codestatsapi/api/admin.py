from django.contrib import admin
from .models import Repositories, Authors, Branches, Commits, Changes

admin.site.register(Repositories)
admin.site.register(Authors)
admin.site.register(Branches)
admin.site.register(Commits)
admin.site.register(Changes)
