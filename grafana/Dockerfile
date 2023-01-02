FROM grafana/grafana-oss

# Add provisioning and configuration files
ADD ./provisioning /etc/grafana/provisioning
ADD ./config.ini /etc/grafana/config.ini

# Add dashboards
ADD ./dashboards /var/lib/grafana/dashboards
