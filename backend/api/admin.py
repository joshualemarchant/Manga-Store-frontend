from django.contrib import admin
from api.models import *

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    pass


@admin.register(Demographic)
class DemographicAdmin(admin.ModelAdmin):
    pass


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass


@admin.register(MangaItem)
class MangaItemdmin(admin.ModelAdmin):
    pass
