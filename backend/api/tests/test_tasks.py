from ..tasks import *
from django.test import TestCase
import io
import zipfile
import tempfile

class TestTasks(TestCase):

    def zip_upload_handler(self):
        with open('/code/api/tests/microshell.zip', 'rb') as f:
            data = handle_zip_save(f, receivers=['mateusz.babul@gmail.com'])

            self.assertEqual(type(data), list)
            self.assertEqual(len(data), 1)

    def get_all_users_from_zip(self):
        data = get_all_users_from_zip([['microshell', 'microshell']])

        self.assertEqual(type(data), dict)
        self.assertEqual(type(data.get('data')), list)
        self.assertEqual(type(data.get('data')[0]), dict)
        self.assertEqual(len(data.get('data')), 1)

    def generate_report(self):
        data = generate_basic_report()

    def test_zip_tasks(self):
        self.zip_upload_handler()
        with zipfile.ZipFile('/code/api/tests/microshell.zip', "r") as zip_ref:
            zip_ref.extractall(f"./target/from_zip/microshell")
            self.get_all_users_from_zip()
