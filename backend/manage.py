#!/usr/bin/env python
import os # pragma: no cover
import sys # pragma: no cover


if __name__ == "__main__": # pragma: no cover
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codestatsapi.settings') # pragma: no cover
    try: # pragma: no cover
        from django.core.management import execute_from_command_line # pragma: no cover
    except ImportError: # pragma: no cover
        try: # pragma: no cover
            import django # pragma: no cover
        except ImportError: # pragma: no cover
            raise ImportError( # pragma: no cover
                "Couldn't import Django. Are you sure it's installed and " # pragma: no cover
                "available on your PYTHONPATH environment variable? Did you " # pragma: no cover
                "forget to activate a virtual environment?" # pragma: no cover
            ) # pragma: no cover
        raise # pragma: no cover
    execute_from_command_line(sys.argv) # pragma: no cover
