FROM grafana/grafana-oss

# Add provisioning and configuration files
ADD ./provisioning /etc/grafana/provisioning
ADD ./grafana.ini /etc/grafana/grafana.ini

# Add dashboards
ADD ./dashboards /var/lib/grafana/dashboards

EXPOSE 3001