FROM nginx

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy build artifacts from the builder stage
COPY --from=build /code/build /usr/share/nginx/html

# Expose ports 3000 and 80
EXPOSE 3000 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]