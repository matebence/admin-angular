FROM nginx:latest
RUN mkdir -p /app/manage
COPY /dist/admin-angular /app/manage
COPY nginx.conf /etc/nginx/nginx.conf
