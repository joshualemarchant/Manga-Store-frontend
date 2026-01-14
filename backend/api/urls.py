from django.urls import path
from api import views



urlpatterns = [
    path('mangalist/', views.MangaList.as_view(), name='manga-list'),
    path('featuredlist/', views.FeaturedList.as_view(), name='featured-list')
]