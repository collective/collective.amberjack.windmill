
collective.amberjack.windmill
-----------------------------

collective.amberjack.windmill is a TTW tool for creating tutorials obtained by extending windmill testing framework.


Useful links
============

- issue tracker: https://bugs.launchpad.net/collective.amberjack.windmill
- svn repository: http://svn.plone.org/svn/collective/collective.amberjack.windmill

Installation
============

- Launching cawind with firefox without overwrite your browser's preferences:

First you need to create a folder for your firefox-cawind profile and put into it a copy of the file prefs.js  (in Mac this should be in ~/Library/Application Support/Firefox/Profiles/FOLDER.default).

Now you need to edit your local cawind prefs.py, on Mac this should be in ~/Library/Application Support/windmill/prefs.py
On PC this should be in C:\Documents and Settings\USERNAME\Application Data\windmill\prefs.py

MOZILLA_CREATE_NEW_PROFILE = False
MOZILLA_DEFAULT_PROFILE = '~/place/you/put/your/profile'

From now on, cawind will always launch that profile.


Usage
=====


Starting the IDE:
----------------
From the command line  

./cawind firefox http://www.whereStartTutorial.com


Create tutorial:
---------------
Press the "record button" in top of the IDE and navigate through the page. Everything will be recorded creating the appropriate steps and microsteps for the tutorial.


Play tutorial:
-------------
Use the "play button" in top of the IDE for execute the entire tutorial.
If you want play only a step or only a single microstep use their play buttons.


Save tutorial:
-------------
Use the "save buttton" in top of the IDE for save the tutorial.
If you want only save a single step use its save button.
The tutorial can be saved in amberjack cfg format or in javascript (.js) or in python (.py).
You can select your favorite format pressing on "settings button" and select it in drop-down list next to "tutorial save formatting".

Load tutorial:
-------------
Press the "load button" in top of the IDE and type the absolute url of the file.
You can load tutorials saved in .py or .cfg or .js.


Arrange steps and microsteps:
----------------------------
You can arrange step and microstep using the drag and drop functionality.
press on the step name or on the microstep you want to move and drag it in the new position.
You can't move a microstep into another step.


Simple/advanced interface:
-------------------------
The default IDE interface is simple. if you want an advanced interface, press the "settings button" and select it in interface's drop-down list.
In Advanced interface you can add microstep manually, change microstep's method, selector and options and use the microsteps advanced buttons for add new microstep above or below of the current one.
For get advanced interface for a single microstep press its "Edit button". 


DOM Explorer:
------------
It's used for get the selector for a microstep. 
If you use the simple interface it's useless otherwise you can get the selector for the new microsteps added manually or change the selector of a microstep.
You can use the DOM Explorer clicking on the locator input field of the microstep, pressing the button in top of the IDE and selecting an element on the page.




	