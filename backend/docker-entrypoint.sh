#!/bin/sh
set -e
# One-off commands bypass migrate/gunicorn, e.g.:
#   docker compose run --rm --no-deps backend env
#   docker compose run --rm --no-deps backend python manage.py shell
if [ "$#" -gt 0 ]; then
  exec "$@"
fi
# Named volume hides image layers under /app/staticfiles — populate on each start.
python manage.py collectstatic --noinput
python manage.py migrate --noinput
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --access-logfile - --error-logfile - --capture-output
