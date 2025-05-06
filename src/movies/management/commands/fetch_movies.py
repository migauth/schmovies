from django.core.management.base import BaseCommand
from movies.services import fetch_and_save_all_movies, clear_all_movies
from movies.models.movie import Movie

class Command(BaseCommand):
    help = 'Fetch movies from TMDB API and save to database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear all existing movies before fetching new ones',
        )
        parser.add_argument(
            '--count',
            action='store_true',
            help='Just count movies in database, without fetching',
        )

    def handle(self, *args, **options):
        if options['count']:
            movie_count = Movie.objects.count()
            self.stdout.write(self.style.SUCCESS(f'Total movies in database: {movie_count}'))
            
            if movie_count > 0:
                self.stdout.write('\nSample movies:')
                for movie in Movie.objects.all()[:5]:
                    self.stdout.write(f'- {movie.title} ({movie.release_year}) - {movie.genre}')
            return
            
        if options['clear']:
            count = clear_all_movies()
            self.stdout.write(self.style.SUCCESS(f'Successfully cleared {count} movies from database'))
        
        self.stdout.write('Fetching movies from TMDB API...')
        saved_count = fetch_and_save_all_movies()
        
        if saved_count > 0:
            self.stdout.write(self.style.SUCCESS(f'Successfully saved/updated {saved_count} movies'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch or save any movies'))