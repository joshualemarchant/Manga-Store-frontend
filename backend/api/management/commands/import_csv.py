import random
import re  # For regular expressions
from django.core.management.base import BaseCommand
from api.models import *
import csv
import ast


class Command(BaseCommand):
    help = "Import CSV data from Kaggle to models"

    def add_arguments(self, parser):
        parser.add_argument("filepath", type=str)

    def safe_list(self, value):
        """
        Safely parse list-like or comma-separated string values
        """
        if not value or value.strip() == "":
            return []

        value = value.strip()

        # Try Python list literal first (e.g. "['A', 'B']")
        if value.startswith("["):
            try:
                return [v.strip() for v in ast.literal_eval(value)]
            except Exception:
                pass

        # Fallback: treat as comma-separated string
        return [v.strip() for v in value.split(",") if v.strip()]

    def clean_author_name(self, author_name):
        """
        Clean up author names by removing '(Story & Art)', '(Art)', and '(Story)'
        """
        # Remove (Story & Art), (Art), (Story) from author name
        author_name = re.sub(r"\s?\((Story & Art|Art|Story)\)", "", author_name)
        return author_name.strip()

    def handle(self, *args, **options):
        filepath = options["filepath"]
        self.stdout.write(f"Importing from: {filepath}")

        with open(filepath, "r", newline="", encoding="utf-8") as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader, None)  # Skip header

            for idx, row in enumerate(csv_reader, start=1):

                (
                    title, score, votes, ranked, popularity, members, favorites,
                    volumes, chapters, status, published, genres, themes,
                    demographics, serialization, authors,isbn
                ) = row

                # Parse lists safely
                genres = self.safe_list(genres)
                themes = self.safe_list(themes)
                demographics = self.safe_list(demographics)
                authors = self.safe_list(authors)

                # Clean each author name
                authors = [self.clean_author_name(a) for a in authors]

                # Parse numeric fields
                members = int(members.replace(",", "")) if members else None
                favorites = int(favorites.replace(",", "")) if favorites else None

                # ---- Related objects ----
                genre_objs = [
                    Genre.objects.get_or_create(name=g)[0]
                    for g in genres
                ]

                theme_objs = [
                    Theme.objects.get_or_create(name=t)[0]
                    for t in themes
                ]

                demographic_objs = [
                    Demographic.objects.get_or_create(name=d)[0]
                    for d in demographics
                ]

                author_objs = [
                    Author.objects.get_or_create(name=a)[0]
                    for a in authors
                ]

                # ---- Random price assignment ----
                price_options = [9.99, 19.99, 29.99]
                price = random.choice(price_options)

                # ---- Create Manga ----
                manga, created = MangaItem.objects.get_or_create(
                    title=title.strip(),
                    defaults={
                        "score": score or None,
                        "votes": votes or None,
                        "ranked": ranked or None,
                        "popularity": popularity or None,
                        "members": members,
                        "favorites": favorites,
                        "volumes": volumes if volumes != "Unknown" else None,
                        "chapters": chapters if chapters != "Unknown" else None,
                        "status": status,
                        "published": published,
                        "serialization": serialization,
                        "price": price, 
                        "isbn": isbn,
                    }
                )

                # ---- M2M relations ----
                if created:
                    manga.genres.set(genre_objs)
                    manga.themes.set(theme_objs)
                    manga.demographics.set(demographic_objs)
                    manga.authors.set(author_objs)

                self.stdout.write(f"Imported: {title} with price {price} and authors: {authors}")

                # Early stop for testing
                if idx == 10:
                    self.stdout.write("Stopping early test after 5 rows...")
                    break
