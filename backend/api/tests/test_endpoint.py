from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Report
import json
from django.core.files.uploadedfile import SimpleUploadedFile
import zipfile


class TestEndpoints(APITestCase):
    def setUp(self):
        Report.objects.create(repo_name='test', report=json.dumps({'test': 'test'}))

    def test_url_ok_one_url(self):
        url = reverse('codestats:url')
        data = {
            "receivers": [
                "123"
            ],
            "mergedUrls": [
                {
                    "old": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    },
                    "new": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    }
                }
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_url_ok_two_url(self):
        url = reverse('codestats:url')
        data = {
            "receivers": [
                "123"
            ],
            "mergedUrls": [
                {
                    "old": {
                        "name": "ZINO2021",
                        "url": "https://github.com/bikol/ZINO2021.git"
                    },
                    "new": {
                        "name": "ZINO2021",
                        "url": "https://github.com/bikol/ZINO2021.git"
                    }
                },
                {
                    "old": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    },
                    "new": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    }
                }
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_url_ok_two_merged_url(self):
        url = reverse('codestats:url')
        data = {
            "receivers": [
                "123"
            ],
            "mergedUrls": [
                {
                    "old": {
                        "name": "ZINO2021",
                        "url": "https://github.com/bikol/ZINO2021.git"
                    },
                    "new": {
                        "name": "aniBASE",
                        "url": "https://github.com/bikol/ZINO2021.git"
                    }
                },
                {
                    "old": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    },
                    "new": {
                        "name": "aniBASE",
                        "url": "https://github.com/Nikkoro/aniBASE.git"
                    }
                }
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_report_url(self):
        url = reverse('codestats:report', kwargs={'repo_name': 'test'})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_merged(self):
        url = reverse('codestats:merged')
        data = {"repo_name": "aniBASE", "merged_users": [
            {"old_name": "Nikodem", "old_email": "nikodemyo@gmail.com", "new_name": "Nikodem",
             "new_email": "nikodemyo@gmail.com"},
            {"old_name": "Nikodem Domaracki", "old_email": "56053287+Nikkoro@users.noreply.github.com",
             "new_name": "Nikodem Domaracki", "new_email": "56053287+Nikkoro@users.noreply.github.com"}],
                "languages": ["JavaScript", "CSS", "HTML"]}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # TODO: ZIP test
    """def test_zip_post(self):
        url = reverse('codestats:zip')
        with zipfile.ZipFile("/code/api/tests/microshell.zip", "r") as myzip:
            file = SimpleUploadedFile("/code/api/tests/microshell.zip", myzip)
            data = {'file': file, 'receivers': 'test@test.com'}
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)"""
