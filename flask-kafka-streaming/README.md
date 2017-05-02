# Get Started

1. Build Docker Image
```bash
$ docker build -t flask-image .
```

2. Run 
```bash
$ docker run -d -p 5000:5000 flask-image
```

To stop find the container ID using `docker ps` then `docker stop [container_id]`.




