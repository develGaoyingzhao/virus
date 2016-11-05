#!/usr/bin/env python
import os
from virus import db, create_app
from virus.models import User, Virus, News, Paper
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand

app = create_app(os.getenv('FLASK_CONFIG') or 'dev')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(
            app=app, db=db, User=User, News=News, Virus=Virus,
            Paper=Paper
            )

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def test():
    """Run the unit tests."""
#    import unittest
#    tests = unittest.TestLoader().discover('tests')
#    unittest.TextTestRunner(verbosity=2).run(tests)
    pass

if __name__ == '__main__':
    manager.run()
