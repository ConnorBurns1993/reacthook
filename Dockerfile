# Frontend build stage
FROM node:18 AS frontend
WORKDIR /react-app
COPY react-app/package.json react-app/package-lock.json ./
# Fix for Webpack OpenSSL issue
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN npm install
COPY react-app ./
RUN npm run build

# Backend build stage
FROM python:3.10 AS backend
WORKDIR /var/www

COPY . .
# Copy frontend build into backend
COPY --from=frontend react-app/build app/static

RUN pip install greenlet --only-binary :all:
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install six
RUN pip install email_validator

# Define environment variables
ENV REACT_APP_BASE_URL=https://reacthook-548f4de40617.herokuapp.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

# Expose necessary ports
EXPOSE 5000

# Command to start the Flask app
CMD gunicorn -b 0.0.0.0:$PORT app:app
