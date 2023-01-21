from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestEndpoints(APITestCase):
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
