from django.core.management.base import BaseCommand
from api.models import *
import csv
import ast


class Command(BaseCommand):
    help = "Import CSV data from Kaggle to models"

    def add_arguments(self, parser):
        parser.add_argument("filepath", type=str)

    def safe_list(self, value):
        """Safely parse list-like string values"""
        if not value or value.strip() == "":
            return []
        try:
            return ast.literal_eval(value)
        except:
            return []

    def handle(self, *args, **options):
        filepath = options["filepath"]
        print("Importing from:", filepath)

        with open(filepath, "r", newline="", encoding="utf-8") as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader, None)  # Skip header

            for idx, row in enumerate(csv_reader, start=1):

                # unpack row
                (
                    title, score, votes, ranked, popularity, members, favorites,
                    volumes, chapters, status, published, genres, themes,
                    demographics, serialization, authors
                ) = row

                # parse lists safely
                genres = self.safe_list(genres)
                themes = self.safe_list(themes)
                demographics = self.safe_list(demographics)
                authors = self.safe_list(authors)

                # parse members as int
                members = int(members.replace(',',''))
                favorites = int(favorites.replace(',',''))

                # Create/get related objects
                genre_objs = [
                    Genre.objects.get_or_create(name=g.strip())[0]
                    for g in genres
                ]

                theme_objs = [
                    Theme.objects.get_or_create(name=t.strip())[0]
                    for t in themes
                ]

                demographic_objs = [
                    Demographic.objects.get_or_create(name=d.strip())[0]
                    for d in demographics
                ]

                author_objs = [
                    Author.objects.get_or_create(name=a.strip())[0]
                    for a in authors
                ]

                # ---- Create Main Model Instance ----
                manga, created = MangaItem.objects.get_or_create(
                    title=title.strip(),
                    defaults={
                        "score": score or None,
                        "votes": votes or None,
                        "ranked": ranked or None,
                        "popularity": popularity or None,
                        "members": members or None,
                        "favorites": favorites or None,
                        "volumes": volumes if volumes != 'Unknown' else None,
                        "chapters": chapters if chapters != 'Unknown' else None,
                        "status": status,
                        "published": published,
                        "serialization": serialization,
                    }
                )

                # Add M2M fields
                manga.genres.set(genre_objs)
                manga.themes.set(theme_objs)
                manga.demographics.set(demographic_objs)
                manga.authors.set(author_objs)

                manga.save()

                print(f"Imported: {title}")

                if idx == 5:
                    print("Stopping early test after 5 rows...")
                    break
