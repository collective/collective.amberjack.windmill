/*
Copyright 2006-2007, Open Source Applications Foundation

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

//Functionality that works for every browser
//Mozilla specific functionality abstracted to mozcontroller.js
//Safari specific functionality abstracted to safcontroller.js
//IE specific functionality abstracted to iecontroller.js
//The reason for this is that the start page only includes the one corresponding
//to the current browser, this means that the functionality in the controller
//object is only for the current browser, and there is only one copy of the code being
//loaded into the browser for performance.

windmill.ui = new function() {
    var _this = this;
    //global settings for highlight color for explorers
    this.borderHilight = '1px solid #003366';
    
    //variable to decide whether to use outline or border
     if (windmill.browser.isIE){
       this.hilightProp = "border";
     }
     else {
       this.hilightProp = "outline";
     }
     
    //keeping track of the recorder state when a new page is loaded and wipes the document
    this.recordSuiteNum = 0;
    this.currentSuite = null;
    
    //Setter, incremeneting the recordSuiteNum
    this.incRecSuite = function() {
        this.recordSuiteNum++;
    }

    
    this.toggleCollapse = function(id) {
        if ($(id).style.height == '22px') {
            $(id).style.height = '';
            $(id).style.borderBottom = "";
            $(id+"Toggle").innerHTML = "hide"
        }
        else {
            $(id).style.height = '22px';
            $(id).style.borderBottom = "1px solid #aaa";
            $(id+"Toggle").innerHTML = "show"
        }
    };

    //Allowing the stopOnFailure switch to be controlled from the UI
    this.toggleBreak = function() {
        var breakCheckBox = $('toggleBreak');
        if (breakCheckBox.checked) {
            windmill.stopOnFailure = true;
        }
        else {
            windmill.stopOnFailure = false;
        }
    }
    
    
    this.updateAlerts = function(){
      if ($('jsAlerts').checked){
        windmill.alerts = true;
      }
      else {
        windmill.alerts = false;
        try {
          windmill.testWin().alert = windmill.testWin().oldAlert;
        } catch(err){ windmill.err(err); }
      }
    }
    
    
    this.getContMethodsUI = function() {
        var str = '';
        for (var i in windmill.controller) {
            if (i.indexOf('_') == -1) {
                str += "," + i;
            }
        }
        for (var i in windmill.controller.extensions) {
            if (str) {
                str += ','
            }
            str += 'extensions.' + i;
        }
        for (var i in windmill.controller.commands) {
            if (str) {
                str += ','
            }
            str += 'commands.' + i;
        }

        //Clean up
        var ca = new Array();
        ca = str.split(",");
        ca = ca.reverse();
        ca.pop();
        ca.pop();
        ca.pop();
        ca.pop();
        ca = ca.sort();
        return ca;
    }
};

//Playback Functionality
//*********************************
windmill.ui.playback = new function() {

  //Keep track of the status of the playback
  this.running = false;
  this.resetPlayBack = function() {
	 if (($('runningStatus').innerHTML.indexOf('Waiting for tutorials...') != -1) && 
		($('playback').src.indexOf("img/playbackstop.png") != -1) && windmill.ui.playback.running) {
		 		$('playback').src = 'img/playback.png';
		 		windmill.ui.playback.running = false;
    }
  };
  
  this.setPlaying = function() {
    $('playback').src = 'img/playbackstop.png';
    windmill.ui.playback.running = true;
  };

  
  //Send the step or microstep to be played back
  this.sendPlayBack = function(uuid, suiteOnly) {
	  
   //Turn off domexplorer and recorder
   windmill.ui.recorder.recordOff();
   windmill.ui.domexplorer.domExplorerOff();
   //windmill.ui.assertexplorer.assertExplorerOff();
   windmill.runTests = true;
      
   var appending = false;
   var testArray = [];
   var plOpStep=0
   if (uuid && uuid.indexOf('Url')!=-1 || uuid!=null && uuid.indexOf('Url')!=-1)
    	  plOpStep=1
   
   if(plOpStep==1){ //play button for go to step's url
        	  var actionObj = {};
        	  actionObj.suite_name = suiteOnly;
              actionObj.version = "0.1"; 
    		  actionObj.method='open';
    		  var paramsObj = {};
    		  paramsObj.uuid = uuid;
    		  if($("Sandbox").checked==true){
    			  if($(suiteOnly+"Header").style.backgroundColor.trim() =="rgb(238, 0, 0)") //url out of sandbox
    				  paramsObj['url']=$("PloneSiteUrl").value+$(uuid).value;
    			  else{
    				  if($("SandboxBase").value.trim()!="")
    					  paramsObj['url']=$("SandboxBase").value+$(uuid).value;
    				  else return;
    			  }
    		  }
    		  else
    			  paramsObj['url']=$("PloneSiteUrl").value+$(uuid).value;
              actionObj.params=paramsObj;
              testArray.push(actionObj);
              actionObj = {};
              paramsObj = {};
              actionObj.suite_name = suiteOnly;
              actionObj.version = "0.1"; 
    		  actionObj.method='waits.forPageLoad';
              paramsObj.uuid = uuid;
              paramsObj['timeout']=20000;
              actionObj.params=paramsObj;
              testArray.push(actionObj);
   }
   else{	  
      var only=0; //if it's 0 we want to play only a suite or the entire tutorial
      
      //if they just passed a suite
      if (!uuid || uuid == null) { //if we don't pass a microstep to start at just play them all
    	  appending = true; 
      }
      else only=1; 
      
      //if we want to play them all in a provided step
      if (!uuid && suiteOnly) {
        appending = true;
        var suites = new Array();
        suites.push('\n   ');
        suites.push($(suiteOnly));
        $(suiteOnly).style.border = "0px";
      }

      //else play every step in the IDE
      else { var suites = $('ideForm').childNodes; }

      //default the nodeType to 1 (firefox)
      var s = 1;
      //In IE we start our iteration at 0, else 1 for the first step
      try {
        if (suites[0].nodeType == 1) { var s = 0; }
      }catch(err){ return;}

     

      //Iterate through the entire IDE starting playback
      for (var i = s; i < suites.length; i++) {
    	  
    	  var actionObj = {};
    	  
    	  if(i==s && only==0){ //play the open method for the step
    		  actionObj.suite_name = suites[i].id;
              actionObj.version = "0.1"; 
    		  actionObj.method='open';
    		  var paramsObj = {};
    		  paramsObj.uuid = suites[i].id+'Url';
    		  if($("Sandbox").checked==true){
    			  if($(suiteOnly+"Header").style.backgroundColor.trim() =="rgb(238, 0, 0)") //url out of sandbox
    				  paramsObj['url']=$("PloneSiteUrl").value+$(suites[i].id+'Url').value;
    			  else{
    				  if($("SandboxBase").value.trim()!="")
    					  paramsObj['url']=$("SandboxBase").value+$(suites[i].id+'Url').value;
    				  else return;
    			  }
    		  }
    		  else
    			  paramsObj['url']=$("PloneSiteUrl").value+$(suites[i].id+'Url').value;
    		  
              actionObj.params=paramsObj;
              testArray.push(actionObj);
              actionObj = {};
              paramsObj = {};
              actionObj.suite_name = suites[i].id;
              actionObj.version = "0.1"; 
    		  actionObj.method='waits.forPageLoad';
              paramsObj.uuid = suites[i].id+'Url';
              paramsObj['timeout']=20000;
              actionObj.params=paramsObj;
              testArray.push(actionObj);
    	  }
    	  
    	  
          if (suites[i].hasChildNodes()) {
              for (var j = 1; j < suites[i].childNodes.length; j++) {
                  //if we hit the microstep id, turn on appending
                  if (suites[i].childNodes[j].id == uuid) {
                      appending = true;
                  }
                  //if the playback starts at a specific microstep, check if we hit that point
                  if(appending == true) {
                	  actionObj = {};
                      actionObj.suite_name = suites[i].id;
                      actionObj.version = "0.1";                     
                      //If it wasn't a standard UI element
                      if ($(suites[i].childNodes[j].id + 'params') != null) {
                          actionObj.method = $(suites[i].childNodes[j].id + 'method').value;
                          actionObj.params = eval('(' + $(suites[i].childNodes[j].id + 'params').value + ')');
                      }
                      //if its a standard UI element build the params
                      else {
                    	  var tmp=suites[i].childNodes[j].id + 'method';
                          var si = $(suites[i].childNodes[j].id + 'method').selectedIndex;
                          actionObj.method = $(suites[i].childNodes[j].id + 'method')[si].value;
                          var paramsObj = {};
                          paramsObj.uuid = suites[i].childNodes[j].id;

                          if (windmill.registry.methods[actionObj.method].locator) {
                        	 var si = $(suites[i].childNodes[j].id + 'locatorType').selectedIndex;
                              paramsObj[$(suites[i].childNodes[j].id + 'locatorType')[si].value] = $(suites[i].childNodes[j].id + 'locator').value;
                              
                              //make radio method value absolute
                              if(actionObj.method=='radio' && $(suites[i].childNodes[j].id + 'locatorType')[si].value=='value'){
                            	  if(($("PloneSiteUrl").value.trim()!='') && ($("Sandbox").checked==false))
                            	  	paramsObj[$(suites[i].childNodes[j].id + 'locatorType')[si].value]=$("PloneSiteUrl").value.trim()+(paramsObj[$(suites[i].childNodes[j].id + 'locatorType')[si].value]);
                            	  else
                            		  if(($("Sandbox").checked==true) && ($("SandboxBase").value.trim()!=""))
                            			  paramsObj[$(suites[i].childNodes[j].id + 'locatorType')[si].value]=$("SandboxBase").value.trim()+(paramsObj[$(suites[i].childNodes[j].id + 'locatorType')[si].value]);
                              }
                          }
                          if(actionObj.method=='editorSelect') {
                      		paramsObj['bookmark']=$(suites[i].childNodes[j].id + 'bookmark').value;
                      	  }
                          if (windmill.registry.methods[actionObj.method].option) {
                        	 var optionNode = $(suites[i].childNodes[j].id + 'optionType');
                              //if we have a drop down, get the selected element
                             if (optionNode.tagName.toLowerCase() == "select"){
                                var si = optionNode.selectedIndex;
                                paramsObj[$(suites[i].childNodes[j].id + 'optionType')[si].value] = $(suites[i].childNodes[j].id + 'option').value; 
                              }
                              //if there is only one option, it's a span, get the innerHTML
                              else{
                            	 if(actionObj.method=='editor') {
                            		paramsObj['editor']=tinyMCE.get(suites[i].childNodes[j].id + 'option').getContent();
                            	}
                            	else
                            		paramsObj[$(suites[i].childNodes[j].id + 'optionType').innerHTML] = $(suites[i].childNodes[j].id + 'option').value;
                              }
                           }
                           actionObj.params = paramsObj;
                      	}
              
                      	$(suites[i].childNodes[j].id).style.background = '#CCFFFF';
                      	testArray.push(actionObj);
                  	}

                  	//if they don't want the play button for each microstep to cascade
                  	//Just play that particular microstep, unless the big play button was hit
                  	if (($('playCascade').checked == false) && (uuid != undefined) && (uuid != null)) {
                      appending = false;
                  	}
              }
          }
      }
   }
      
   windmill.ui.recorder.recordOff();

   var respRun = function(str) {
	   
	   windmill.ui.playback.running = true;
	   //If one of the action playback buttons is clicked
       //and the action playback cascading is enabled
       //we need the user to be able to stop the playback while it's
       //cascading, so I check if thats the state and set change the image accordingly
       if ($('playCascade').checked) {
           $('playback').src = "img/playbackstop.png";
       }
       return true;
   }

   var jsonObject = new jsonCall('1.1', 'restart_test_run');
   var params_obj = {};
   params_obj.tests = testArray;
   jsonObject.params = params_obj;
   var jsonString = JSON.stringify(jsonObject);
   
   doCall = function() {
        var z = fleegix.xhr.doPost(respRun, '/windmill-jsonrpc/', jsonString);
   }

   setTimeout('doCall()', 100);
 }
};