from django.contrib import admin
from api.models import *

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Demographic)
class DemographicAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(MangaItem)
class MangaItemdmin(admin.ModelAdmin):
   pass


 