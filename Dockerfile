FROM python:stretch

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy Python dependencies
COPY requirements.txt /usr/src/app/
RUN pip install -r /usr/src/app/requirements.txt

# Copy source project
COPY . /usr/src/app/

CMD python -m server --port 80 --static-dir ./src/