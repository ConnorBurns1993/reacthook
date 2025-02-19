# Start with the python:3.9 image
FROM python:3.9

# Set the following environment variables
ENV REACT_APP_BASE_URL=https://reacthook-548f4de40617.herokuapp.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .

# Build the React app (if not already built)
# Make sure to change to the react-app directory and run the build command
RUN cd react-app && npm install && npm run build

# Copy the built react app from the react-app/build/ directory to the flask app static folder
COPY react-app/build/ app/static/

# Run the next two python install commands with PIP
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install email_validator

# Expose the port for the Flask app
EXPOSE 5000

# Start the flask environment using gunicorn
CMD gunicorn -b 0.0.0.0:$PORT app:app
