#!/bin/sh
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."
    
    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done
    
    echo "PostgreSQL started"
fi

python3 manage.py collectstatic --noinput
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput
echo "from django.contrib.auth.models import User;
User.objects.filter(username='$DB_USER').delete();
User.objects.create_superuser('$DB_USER', '', '$DB_PASSWORD')" | python3 manage.py shell

exec "$@"