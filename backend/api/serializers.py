from rest_framework import serializers
from api.models import MangaItem, Genre, Theme, Demographic, Author


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name"]


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ["id", "name"]


class DemographicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographic
        fields = ["id", "name"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "name"]


class MangaItemSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    themes = ThemeSerializer(many=True, read_only=True)
    demographics = DemographicSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

    # IDs for write operations
    genre_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(),
        many=True,
        write_only=True,
        source="genres"
    )
    theme_ids = serializers.PrimaryKeyRelatedField(
        queryset=Theme.objects.all(),
        many=True,
        write_only=True,
        source="themes"
    )
    demographic_ids = serializers.PrimaryKeyRelatedField(
        queryset=Demographic.objects.all(),
        many=True,
        write_only=True,
        source="demographics"
    )
    author_ids = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        many=True,
        write_only=True,
        source="authors"
    )

    class Meta:
        model = MangaItem
        fields = [
            "id",
            "title",
            "score",
            "votes",
            "ranked",
            "popularity",
            "members",
            "favorites",
            "volumes",
            "chapters",
            "status",
            "published",
            "serialization",
            "genres",
            "themes",
            "demographics",
            "authors",
            "genre_ids",
            "theme_ids",
            "demographic_ids",
            "author_ids",
        ]
