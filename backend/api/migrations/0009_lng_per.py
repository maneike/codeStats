from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_lng'),
    ]

    operations = [
        migrations.AddField(
            model_name='repolanguages',
            name='percentage',
            field=models.FloatField(default=100.0),
            preserve_default=False,
        ),
    ]
