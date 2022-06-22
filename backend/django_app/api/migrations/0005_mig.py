from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_changes'),
    ]

    operations = [
        migrations.AddField(
            model_name='authors',
            name='old_email',
            field=models.EmailField(default='def@def.com', max_length=254),
        ),
        migrations.AddField(
            model_name='authors',
            name='old_name',
            field=models.CharField(default='def', max_length=200),
        ),
        migrations.AlterField(
            model_name='authors',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
