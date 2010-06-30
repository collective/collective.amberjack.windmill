from setuptools import setup, find_packages
import os

version = '0.1'

setup(name='collective.amberjack.windmill',
      version=version,
      description="windmill integration in collective.amberjack",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Programming Language :: Python",
        ],
      keywords='',
      author='Andrea Benetti',
      author_email='',
      url='http://svn.plone.org/svn/collective/',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective', 'collective.amberjack'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'windmill'
          # -*- Extra requirements: -*-
      ],
      entry_points = {
        'console_scripts': [
          'cawind = collective.amberjack.windmill.main:main'
          ]
        },
      )
