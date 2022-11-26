from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_mig'),
    ]

    operations = [
        migrations.AddField(
            model_name='repositories',
            name='receivers',
            field=models.CharField(default='test', max_length=1000),
            preserve_default=False,
        ),
    ]
