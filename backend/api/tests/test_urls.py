from django.test import TestCase
from django.urls import reverse, resolve
from .. views import *


class TestUrls(TestCase):
    def test_zip_url(self):
        path = reverse('codestats:zip')
        self.assertEqual(resolve(path).func.view_class, ZipRepoView)

    def test_url_url(self):
        path = reverse('codestats:url')
        self.assertEqual(resolve(path).func.view_class, UrlRepoView)

    def test_merged_url(self):
        path = reverse('codestats:merged')
        self.assertEqual(resolve(path).func.view_class, UsersReportView)

    def test_report_url(self):
        path = reverse('codestats:report', kwargs={'repo_name': 'testowe'})
        self.assertEqual(resolve(path).func.view_class, GetReportView)
