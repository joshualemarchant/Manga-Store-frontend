from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Theme(models.Model):
    name = models.CharField(max_length=255)


class Demographic(models.Model):
    name = models.CharField(max_length=255)


class Author(models.Model):
    name = models.CharField(max_length=255)

    
class MangaItem(models.Model):
    title = models.CharField(max_length=255) 
    score = models.DecimalField(max_digits=4, decimal_places=2)
    votes = models.IntegerField()
    ranked = models.IntegerField()
    popularity = models.IntegerField()
    members = models.IntegerField()
    favorites = models.IntegerField() 
    volumes = models.IntegerField(null=True)
    chapters = models.IntegerField(null=True)
    status = models.CharField(max_length=50)
    published = models.CharField(max_length=50)
    genres = models.ManyToManyField(to=Genre)
    themes = models.ManyToManyField(to=Theme)
    demographics = models.ManyToManyField(to=Demographic)
    serialization = models.CharField(max_length=255)
    authors = models.ManyToManyField(to=Author)
    price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    isbn = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title
