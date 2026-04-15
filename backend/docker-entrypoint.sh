#!/bin/sh
set -e
# Named volume hides image layers under /app/staticfiles — populate on each start.
python manage.py collectstatic --noinput
python manage.py migrate --noinput
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --access-logfile - --error-logfile - --capture-output
