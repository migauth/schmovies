

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Unknown Title', max_length=255)),
                ('description', models.TextField(default='No description available.')),
                ('genre', models.CharField(default='Unknown Genre', max_length=100)),
                ('release_year', models.CharField(default='none', max_length=4)),
                ('poster_url', models.URLField(default='https://example.com/default_poster.jpg')),
            ],
        ),
    ]
