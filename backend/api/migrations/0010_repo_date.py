from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_lng_per'),
    ]

    operations = [
        migrations.AddField(
            model_name='repositories',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=False,
        ),
    ]
