# Generated by Django 3.2.13 on 2023-01-23 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '001211_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commits',
            name='date',
            field=models.DateField(),
        ),
    ]