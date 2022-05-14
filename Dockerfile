FROM python:3.10
LABEL "mainteiner"="Mateusz Babul"
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /codestats
WORKDIR /codestats
COPY requirements.txt /codestats/

RUN apt-get update \
&& apt-get install apt-utils -y \
&& apt-get install unixodbc -y \
&& apt-get install unixodbc-dev -y \
&& apt-get install freetds-dev -y \
&& apt-get install freetds-bin -y \
&& apt-get install tdsodbc -y \
&& apt-get install --reinstall build-essential -y

RUN apt-get update
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt --use-deprecated=html5lib --use-deprecated=legacy-resolver
COPY . /codestats/

WORKDIR /codestats

RUN adduser user
USER user