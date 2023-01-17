from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_iteration'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('repo_name', models.CharField(max_length=200)),
                ('report', models.JSONField()),
            ],
        ),
        migrations.AlterField(
            model_name='repolanguages',
            name='percentage',
            field=models.FloatField(default=100.0),
        ),
    ]
