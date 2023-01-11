FROM nginx

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy config nginx
COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Expose ports 3000 and 80
EXPOSE 3000 80

# Set the working directory
WORKDIR /code

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

