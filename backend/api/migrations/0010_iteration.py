from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_lng_per'),
    ]

    operations = [
        migrations.AddField(
            model_name='repositories',
            name='iteration',
            field=models.IntegerField(),
            preserve_default=False,
        ),
    ]
