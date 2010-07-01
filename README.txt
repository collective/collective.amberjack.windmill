
collective.amberjack.windmill
-----------------------------

collective.amberjack.windmill is a TTW tool for creating tutorials obtained by extending windmill testing framework.


Useful links
============

- issue tracker: https://bugs.launchpad.net/collective.amberjack.windmill
- svn repository: http://svn.plone.org/svn/collective/collective.amberjack.windmill

Installation
============

**Requirements:** 

	       - python 2.5 or 2.6 (http://www.python.org)
	       - an Subversion client

**Installation steps:** 

1. Using the shell go into the path where you want to place collective.amberjack.windmill and type::

	svn co http://svn.plone.org/svn/collective/collective.amberjack.windmill/trunk/ collective.amberjack.windmill
 
2. now you can install it::

	python ./collective.amberjack.windmill/setup.py install

3. Make sure that the browser allows pop-up windows and then run cawind with::
	
	cawind firefox http://www.plone.org

   If you see the cawind IDE you're ready to create your first tutorial.

**Launching cawind with firefox using your own profile:**

You must have run cawind IDE at least one time.
	
1. First you need to create a folder for your firefox-windmill profile and put into it a copy of the your current firefox profile ``prefs.js`` 
  
   on Mac this should be in " ``~/Library/Application Support/Firefox/Profiles/FOLDER.default`` "
	
   on PC this should be in " ``C:\Documents and Settings\USERNAME\Application Data\Mozilla\Firefox\Profiles\FOLDER.default`` "

   I suggest you to create the new folder in the same location where is the folder of prefs.js

2. Now you need to edit your local windmill ``prefs.py``::

		MOZILLA_CREATE_NEW_PROFILE = False

		MOZILLA_DEFAULT_PROFILE = '/your/firefox-windmill/profile/folder'

   on Mac this should be in " ``~/Library/Application Support/windmill/prefs.py`` "

   on PC this should be in " ``C:\Documents and Settings\USERNAME\Application Data\windmill\prefs.py`` " 

From now on, cawind will always launch that profile and any plugins you installed will be available.

Usage
=====


**Starting the IDE:**

From the command line  

``cawind firefox http://www.whereStartTutorial.com``


**Create tutorial:**

Press the "``record button``" in top of the IDE and navigate through the page. Everything will be recorded creating the appropriate steps and microsteps for the tutorial.


**Play tutorial:**

Use the "``play button``" in top of the IDE for execute the entire tutorial.

If you want play only a step or only a single microstep use their play buttons.


**Save tutorial:**

Use the "``save buttton``" in top of the IDE for save the tutorial.

If you want only save a single step use its save button.

The tutorial can be saved in amberjack cfg format or in javascript (.js) or in python (.py).

You can select your favorite format pressing on "``settings button``" and select it in drop-down list next to "tutorial save formatting".

**Load tutorial:**

Press the "``load button``" in top of the IDE and type the absolute url of the file.

You can load tutorials saved in .py or .cfg or .js.


**Arrange steps and microsteps:**

You can arrange step and microstep using the drag and drop functionality.

press on the step name or on the microstep you want to move and drag it in the new position.

You can't move a microstep into another step.


**Simple/advanced interface:**

The default IDE interface is simple. if you want an advanced interface, press the "``settings button``" and select it in interface's drop-down list.

In Advanced interface you can add microstep manually, change microstep's method, selector and options and use the microsteps advanced buttons for add new microstep above or below of the current one.

For get advanced interface for a single microstep press its "``Edit button``". 


**DOM Explorer:**

It's used for get the selector for a microstep. 

If you use only the simple interface it's useless otherwise you can get the selector for the new microsteps added manually or change the selector of a microstep.

You can use the DOM Explorer clicking on the locator input field of the microstep, pressing the ``button with hand lens`` in top of the IDE and selecting an element on the page.




	