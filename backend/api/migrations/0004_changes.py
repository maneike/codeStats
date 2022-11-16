# Generated by Django 4.0.5 on 2022-06-08 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_authors_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Changes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=200)),
                ('insertions', models.IntegerField()),
                ('deletions', models.IntegerField()),
                ('lines', models.IntegerField()),
                ('commit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.commits')),
            ],
        ),
    ]