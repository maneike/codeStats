FROM postgres:14.1

#copy maintenance filder into bin
COPY ./compose/postgres/maintenance /usr/local/bin/maintenance

#make everything inside maintenance folder executable
RUN chmod +x /usr/local/bin/maintenance/*

#Move everything inside maintenance folder to bin and delete it
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rmdir /usr/local/bin/maintenance