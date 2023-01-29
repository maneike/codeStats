from django.test import TestCase
from ..models import *
from datetime import datetime


class TestModels(TestCase):
    def setUp(self):
        self.repo_obj = Repositories.objects.create(repo_name='test', receivers='test@test.com',
                                                    url='test_url', iteration=1)
        self.author_obj = Authors.objects.create(name='test_name', email='test_email', old_name='test_old',
                                                 old_email='test_old_email', repository=self.repo_obj)
        self.branch_obj = Branches.objects.create(name='test_branch', commits_count=1, repository=self.repo_obj)
        self.commit_obj = Commits.objects.create(author=self.author_obj, branch=self.branch_obj, date=datetime.now(),
                                                 message='test_message', edited_files='test_edited_files')
        self.changes_obj = Changes.objects.create(commit=self.commit_obj, file_name='test_file_name', insertions=1,
                                                  deletions=0, lines=10)
        self.report_obj = Report.objects.create(repo_name='test', report={'test': 'test'})
        self.lng_obj = RepoLanguages.objects.create(languages='Python', percentage=100.0, repository=self.repo_obj)

    def test_models_str(self):
        self.assertEqual(str(self.repo_obj), self.repo_obj.repo_name)
        self.assertEqual(str(self.author_obj), self.author_obj.name)
        self.assertEqual(str(self.branch_obj), self.branch_obj.name)
        self.assertEqual(str(self.commit_obj), self.commit_obj.message)
        self.assertEqual(str(self.changes_obj), self.changes_obj.file_name)
        self.assertEqual(str(self.report_obj), self.report_obj.repo_name)
        self.assertEqual(str(self.lng_obj), self.lng_obj.languages)
