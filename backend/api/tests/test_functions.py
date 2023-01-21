from ..functions import *
from django.test import TestCase


class TestFunctions(TestCase):
    def setUp(self):
        self.receivers = ['test@test.com']
        self.test_urls = [
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

    def test_get_all_users_two_url(self):
        data = get_all_users(self.test_urls, self.receivers)

        self.assertEqual(type(data), dict)
        self.assertTrue("data" in data)
        self.assertTrue(len(data.get("data")), 2)
