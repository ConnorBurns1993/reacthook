# Frontend build stage
FROM node:18 AS frontend
WORKDIR /app/react-app
COPY react-app/package.json react-app/package-lock.json ./
# Fix for Webpack OpenSSL issue
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN npm install
COPY react-app ./
RUN npm run build

# Backend build stage
FROM python:3.10 AS backend
WORKDIR /app
COPY app/requirements.txt ./
RUN pip install -r requirements.txt
COPY app ./

# Copy frontend build into backend
COPY --from=frontend /app/react-app/build /app/static

# Define environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# Expose necessary ports
EXPOSE 5000

# Command to start the Flask app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
