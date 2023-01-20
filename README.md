<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/maneike/codeStats">
    <img src="icon-512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">codeStats</h3>

  <p align="center">
    <br />
    <a href="https://github.com/maneike/codeStats"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/maneike/codeStats">View Demo</a>
    ·
    <a href="https://github.com/maneike/codeStats/issues">Report Bug</a>
    ·
    <a href="https://github.com/maneike/codeStats/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#known-issues-and-basic-troubleshooting">Known issues and basic troubleshooting</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Code stats is a project that allows you to make reports of git repositories. With these reports you can see the how someone contributes to a project and many more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Preact][preact]][preact-url][![Django][django]][django-url][![nginx][nginx]][nginx-url][![Redis][redis]][redis-url][![PostgreSQL][postgresql]][postgresql-url][![Docker][docker]][docker-url][![Grafana][grafana]][grafana-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- docker & docker-compose

```sh
sudo apt install docker docker-compose
```

- /backend/.env

```sh
check .env.example
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/maneike/codeStats.git
```

2. Add .env to /backend/

```sh
check .env.example
```

3. Build with docker compose

```sh
docker compose up --build

```

4. In new terminal

```sh
docker compose run backend python3 manage.py makemigrations
docker compose run backend python3 manage.py migrate
```

5. Optional

```sh
docker compose run backend python3 manage.py createsuperuser
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## App

  <a href="https://github.com/maneike/codeStats">
    <img src="scheme.png" alt="Logo" >
  </a>

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API

### Request

`POST /api/url/`

```json
{
  "receivers": ["email@example.com"],
  "mergedUrls": [
    {
      "old": {
        "name": "PRA2021-PRA2022",
        "url": "https://github.com/WitMar/PRA2021-PRA2022.git"
      },
      "new": {
        "name": "PRA2021-PRA2022",
        "url": "https://github.com/WitMar/PRA2021-PRA2022.git"
      }
    }
  ]
}
```

### Response (partial)

```json
{
  "data": [
    {
      "repo_name": "PRA2021-PRA2022",
      "users": [
        {
          "name": "marcin witkowski",
          "email": "marcin.witkowski@e-qsg.com"
        },
        {
          "name": "THINK",
          "email": "witkowski.mar@gmail.com"
        }
      ],
      "languages": ["Java"]
    }
  ]
}
```

### Request

`POST /api/merged/`

```json
{
  "repo_name": "PRA2021-PRA2022",
  "merged_users": [
    {
      "old_name": "marcin witkowski",
      "old_email": "marcin.witkowski@e-qsg.com",
      "new_name": "marcin witkowski",
      "new_email": "marcin.witkowski@e-qsg.com"
    },
    {
      "old_name": "THINK",
      "old_email": "witkowski.mar@gmail.com",
      "new_name": "THINK",
      "new_email": "witkowski.mar@gmail.com"
    },
    {
      "old_name": "Tomasz Zietkiewicz",
      "old_email": "tomek.zietkiewicz@gmail.com",
      "new_name": "Tomasz Zietkiewicz",
      "new_email": "tomek.zietkiewicz@gmail.com"
    }
  ],
  "languages": ["Java"]
}
```

### Response

```json
{
  "ok": "Raport jest w trakcie tworzenia"
}
```

### Request

`GET /api/report/:{repo_name}/`

### Response (partial)

```json
{
  "branches": [
    {
      "branch_name": "HEAD",
      "commits": [
        {
          "author": "marcin witkowski",
          "branch": "HEAD",
          "date": "2020-10-18 16:24:11+02:00",
          "message": "Initial commit",
          "changed_files": [
            {
              "file_name": "pom.xml",
              "changes": {
                "insertions": 11,
                "deletions": 0,
                "lines": 11
              }
            },
            {
              "file_name": "src/main/java/introduction/HelloWorld.java",
              "changes": {
                "insertions": 8,
                "deletions": 0,
                "lines": 8
              }
            }
          ]
        }
      ]
    }
  ]
}
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/maneike/codeStats](https://github.com/maneike/codeStats)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Known issues and basic troubleshooting

- Depending on your system, you might need to change CLRF to LF in the .env and Dockerfile/compose files. This can be done easily in VSCode by right clicking on the file and selecting "Change End of Line Sequence" and then selecting LF.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/maneike/codeStats.svg?style=for-the-badge
[contributors-url]: https://github.com/maneike/codeStats/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/maneike/codeStats.svg?style=for-the-badge
[forks-url]: https://github.com/maneike/codeStats/network/members
[stars-shield]: https://img.shields.io/github/stars/maneike/codeStats.svg?style=for-the-badge
[stars-url]: https://github.com/maneike/codeStats/stargazers
[issues-shield]: https://img.shields.io/github/issues/maneike/codeStats.svg?style=for-the-badge
[issues-url]: https://github.com/maneike/codeStats/issues
[license-shield]: https://img.shields.io/github/license/maneike/codeStats.svg?style=for-the-badge
[license-url]: https://github.com/maneike/codeStats/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[preact]: https://img.shields.io/static/v1?style=for-the-badge&message=Preact&color=673AB8&logo=Preact&logoColor=FFFFFF&label=
[preact-url]: https://preactjs.com/
[django]: https://img.shields.io/static/v1?style=for-the-badge&message=Django&color=092E20&logo=Django&logoColor=FFFFFF&label=
[django-url]: https://www.djangoproject.com/
[nginx]: https://img.shields.io/static/v1?style=for-the-badge&message=NGINX&color=269539&logo=NGINX&logoColor=FFFFFF&label=
[nginx-url]: https://www.nginx.com/
[postgresql]: https://img.shields.io/static/v1?style=for-the-badge&message=PostgreSQL&color=336791&logo=PostgreSQL&logoColor=FFFFFF&label=
[postgresql-url]: https://www.postgresql.org/
[redis]: https://img.shields.io/static/v1?style=for-the-badge&message=Redis&color=DC382D&logo=Redis&logoColor=FFFFFF&label=
[redis-url]: https://redis.io/
[docker]: https://img.shields.io/static/v1?style=for-the-badge&message=Docker&color=2496ED&logo=Docker&logoColor=FFFFFF&label=
[docker-url]: https://www.docker.com/
[grafana]: https://img.shields.io/static/v1?style=for-the-badge&message=Grafana&color=F46800&logo=Grafana&logoColor=FFFFFF&label=
[grafana-url]: https://grafana.com/
