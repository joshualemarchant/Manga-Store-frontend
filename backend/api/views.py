from django.contrib.auth.models import User
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class MangaList(generics.ListCreateAPIView):
    queryset = MangaItem.objects.all()
    serializer_class = MangaItemSerializer
    permission_classes = [AllowAny]