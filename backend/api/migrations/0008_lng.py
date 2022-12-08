# Generated by Django 4.1.3 on 2022-11-12 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='RepoLanguages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('languages', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='repolanguages',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.repositories'),
        ),
    ]