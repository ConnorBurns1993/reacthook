# Step 1: Build the React frontend
FROM node:23.7.0 AS frontend

WORKDIR /app
COPY react-app/package.json react-app/package-lock.json ./
RUN npm install
COPY react-app ./
RUN npm run build

# Step 2: Build the Python backend
FROM python:3.9 AS backend

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

WORKDIR /var/www
COPY --from=frontend /app/build app/static/
COPY . .
RUN pip install greenlet --only-binary :all:
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install six
RUN pip install email_validator

# Expose the port
EXPOSE 5000

# Start the Flask app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
