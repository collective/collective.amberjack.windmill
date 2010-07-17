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

if (typeof windmill.ui == 'undefined') { windmill.ui = {}; }

//Recorder Functionality
//*********************************/
windmill.ui.recorder = new function() {
    this.recordState = false;
    var lastLocValue = null;
    var lastLocator = null;
    
    this.setRecState = function() {
        if (windmill.ui.recorder.recordState == true) {
            this.recordOn();
        }
    }
    
    this.tiny_drop_down=false;  //check if i recorded a click inside tiny drop-down list
    this.internal_link=false;  //check if i click on a link but i must not add a new step (used with Plone's tabs contained in the content "Edit tab")
    
    //write json to the remote from the click events
    this.writeJsonClicks = function(e) {
    	windmill.ui.recorder.tiny_drop_down=false;
    	windmill.ui.recorder.internal_link=false;
    	if (windmill.ui.recorder.recordState == false) { return; }       
        var locator = '';
        var locValue = '';
        var aggAzione=true;
        try {
          if ($('useXpath').checked == false) {
              if (e.target.id != "") {
                  var element = elementslib.Element.ID(e.target.id);
                  if (element == e.target){
                    locator = 'id';
                    locValue = e.target.id;
                  }
              }
              else if ((typeof(e.target.name) != "undefined") && (e.target.name != "")) {
                  var element = elementslib.Element.NAME(e.target.name);
                  if (element == e.target){
                	  locator = 'name';
                	  locValue = e.target.name;
                  }
              }
              else if ((typeof(e.target.value) != "undefined") && (e.target.value != "")) {
                  var element = elementslib.Element.VALUE(e.target.value);
                  if (element == e.target){
                	  locator = 'value';
                	  locValue = e.target.value;
                  }
              }
              else if ((e.target.tagName.toUpperCase() == "A") || (e.target.parentNode.tagName.toUpperCase() == "A")) {
                  var element = elementslib.Element.LINK(removeHTMLTags(e.target.innerHTML));
                  if (element == e.target){
                	  if(jQuery(e.target).attr('href').charAt(0)=='#') //internal_link
                		  windmill.ui.recorder.internal_link=true;
                	  locator = 'link';
                	  locValue = removeHTMLTags(e.target.innerHTML);
                	  locValue=locValue.trim();
                  }
                  else{  // get the right locator when a node (for example a span) is inside a link node which point to an internal_link
                	  
                	  	if(e.target.parentNode.tagName.toUpperCase() == "A" && jQuery(e.target.parentNode).attr('href').charAt(0)=='#'){ 
                		  locator = 'link';
                		  locValue = removeHTMLTags(e.target.parentNode.innerHTML);
                		  locValue=locValue.trim();
                		  windmill.ui.recorder.internal_link=true;
                	  	}
                  }
              }
              if (locator == ''){
            	  var insideElem=e.target.innerHTML;
                  var stringXpath = getXSPath(e.target);
               		
                  if(stringXpath.indexOf("@id='mce_")!=-1){  //tiny drop-down style list
        			if(insideElem.indexOf('Normal paragraph')!=-1){ //for correctly get the entry "Normal paragraph"
        				locator = 'link';
             			locValue= 'Normal paragraph';
             			}
                	  else{
                		  locator = 'link';
             			  locValue= insideElem;
                	  }
        			windmill.ui.recorder.tiny_drop_down=true;
                  }
                  else{
                	  var element = elementslib.Element.XPATH(stringXpath);
                  
                	  if (element == e.target){
                		  locator = 'xpath';
                		  locValue = stringXpath;
                	  }
                	  else{
                		  aggAzione=false;
                		  locator = 'xpath';
                		  locValue = "Error - Could not find a reliable locator for this node.";    
                	  	  }
                  
                  }
              }
          }
          else {
        	var insideElem=e.target.innerHTML;
            var stringXpath = getXSPath(e.target);
            
            if(stringXpath.indexOf("@id='mce_")!=-1){  //tiny drop-down style list
    			if(insideElem.indexOf('Normal paragraph')!=-1){ //for correctly get the entry "Normal paragraph"
    				locator = 'link';
         			locValue= 'Normal paragraph';
         			}
            	  else{
            		  locator = 'link';
         			  locValue= insideElem;
            	  }
    			
    			windmill.ui.recorder.tiny_drop_down=true;
              }
            else{
            	var element = elementslib.Element.XPATH(stringXpath);
            	if (element == e.target){
            		locator = 'xpath';
            		locValue = stringXpath;
            	}
            	else{
            		aggAzione=false;
            		locator = 'xpath';
            		locValue = 'Error - Could not find a reliable locator for this node.';      
            	}
            }
          }
        }
        catch(err){}
       
        
        //to keep from generating multiple actions for the same click
        if ((lastLocValue == locValue) && (lastLocator == locator) && (e.type != 'dblclick')){ return; }
        lastLocValue = locValue;
        lastLocator = locator;

        //allowing the user to click the same link again after 1 second
        //should emulate expected behavior
        windmill.ui.recorder.resetLoc = function(){
          windmill.ui.recorder.lastLocValue = null;
          windmill.ui.recorder.lastLocator = null;
        }
        setTimeout('windmill.ui.recorder.resetLoc()', 1000);
        
        if(aggAzione==true){

        	if (locValue != "") {
        		var editorRestore={}
        		for(var Edi in windmill.ui.recorder.arrEdit){
        			if(windmill.ui.recorder.arrEdit[Edi]!=null)
        				editorRestore[Edi]=windmill.ui.recorder.arrEdit[Edi];
        		}
        		for(var Edi in windmill.ui.recorder.arrEdit){
        			if((locator=='xpath' && (locValue.indexOf('@id=\''+Edi+'_image\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_cell_props\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_table\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_anchor\'')!=-1
        			|| locValue.indexOf('@id=\''+Edi+'_link\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_row_props\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_fullscreen\'')!=-1 || locValue.indexOf('@id=\''+Edi+'_code\'')!=-1)) 
        			||(locator=='id' && (locValue.indexOf(Edi+'_image')!=-1 || locValue.indexOf(Edi+'_cell_props')!=-1 || locValue.indexOf(Edi+'_table')!=-1 || locValue.indexOf(Edi+'_anchor')!=-1
        					|| locValue.indexOf(Edi+'_link')!=-1 || locValue.indexOf(Edi+'_row_props')!=-1 || locValue.indexOf(Edi+'_fullscreen')!=-1 || locValue.indexOf(Edi+'_code')!=-1))){
        			var p={}
        			p[locator]=locValue
        			windmill.ui.remote.addAction(windmill.ui.remote.buildAction('click',p));
        			windmill.ui.recorder.primaPag=false;
        			windmill.unloaded();
        			windmill.loaded();
        			for(var Ed in windmill.ui.recorder.editorRestore)
        				windmill.ui.recorder.arrEdit[Ed]=editorRestore[Ed]; //restore associations with editors
        			return;
        			}
        		}
        	
        		var params = {};
        		params[locator] = locValue;
            
          /*  if (e.type == 'dblclick') {
                windmill.ui.remote.addAction(windmill.ui.remote.buildAction('doubleClick', params));
            }*/
        		
        		if (e.target.type == "checkbox"){
        			windmill.ui.remote.addAction(windmill.ui.remote.buildAction('check', params));
        		}
        		else{
 
        			//if sensative click is on, pick up every click that gets to the window listener
        			if ($("clickOn").checked == true) {
        				//If the previous action is waits for page load
        				//we know that they don't want to access this click
        				//until the element is on the page and ready
        				//so we add a waits.forElement for the element they are clicking
        				//I find myself doing this manually constantly
        				var suiteActions = windmill.ui.remote.getSuite().childNodes;
        				var lastNode = suiteActions[suiteActions.length-1];
        				var method = null;
        				try{ method = $(lastNode.id+'method').value;}
        				catch(err){}
        				if (method == "waits.forPageLoad"){
        					var newParams = {timeout:8000};
        					newParams[locator] = locValue;
        					var wfe = windmill.ui.remote.buildAction("waits.forElement", newParams);
        					windmill.ui.remote.addAction(wfe);
        				}
                    //Add the click action
        				windmill.ui.remote.addAction(windmill.ui.remote.buildAction('click', params));
        				if(locator == 'link' && windmill.ui.recorder.tiny_drop_down==false && windmill.ui.recorder.internal_link==false){
        					this.same=false;
        					windmill.unloaded();
        					windmill.loaded();
        				}
        			}
                //if the sensative click is off, you can click all over but we only pick up things we know are clickable
        			else if ((e.target.onclick != null) || (locator == 'link') || (e.target.tagName.toUpperCase() == 'IMG')) {
        				windmill.ui.remote.addAction(windmill.ui.remote.buildAction('click', params));
        				if(locator == 'link'  && windmill.ui.recorder.tiny_drop_down==false && windmill.ui.recorder.internal_link==false){
        					this.same=false;
        					windmill.unloaded();
        					windmill.loaded();
        				}
        			}
        		}
        	}
        
        }
        //scroll the actions in the ide to the bottom for user convenience
        windmill.ui.remote.scrollRecorderTextArea();
       
    }

    //Writing json to the remote for the change events
    this.writeJsonChange = function(e) {
    	
    	if (windmill.ui.recorder.recordState == false) {
            return;
        }
        var locator = '';
        var locValue = '';
        
        if ($('useXpath').checked == false) {
            if (e.target.id != "") {
                locator = 'id';
                locValue = e.target.id;
            }
            else if ((typeof(e.target.name) != "undefined") && (e.target.name != "")) {
                locator = 'name';
                locValue = e.target.name;
            }
            else {      
                var stringXpath = getXSPath(e.target);
        		locator = 'xpath';
        		locValue = stringXpath;
        		
            }
        }
        else {
  
            var stringXpath = getXSPath(e.target);
      		locator = 'xpath';
    		locValue = stringXpath;
    		
        }

        var params = {};
        if(e.target.type == 'radio'){
        	params['value'] = e.target.value;
        	windmill.ui.remote.addAction(windmill.ui.remote.buildAction('radio', params));
        	return;
        	}
        else
        params[locator] = locValue;
        
        if (e.target.type == 'textarea') {
            params['text'] = e.target.value;
            windmill.ui.remote.addAction(windmill.ui.remote.buildAction('type', params));
        }
        else if (e.target.type == 'text') {
            params['text'] = e.target.value;
            windmill.ui.remote.addAction(windmill.ui.remote.buildAction('type', params));
        }
        else if (e.target.type == 'password') {
            params['text'] = e.target.value;
            windmill.ui.remote.addAction(windmill.ui.remote.buildAction('type', params));
        }
        else if (e.target.type == 'select-one') {
            params['option'] = e.target.options[e.target.selectedIndex].text;
            windmill.ui.remote.addAction(windmill.ui.remote.buildAction('select', params));
        }
        
        windmill.ui.remote.scrollRecorderTextArea();
    }


    //Turn on the recorder
    //Since the click event does things like firing twice when a double click goes also
    //and can be obnoxious im enabling it to be turned off and on with a toggle check box
    this.recordOn = function() {    	
        //Turn off the listeners so that we don't have multiple attached listeners for the same event
    	 try {
             this.recRecursiveUnBind(windmill.testWin());
         } catch(error) {
           windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
         }
        //keep track of the recorder state, for page refreshes
        windmill.ui.recorder.recordState = true;
        $('record').src = 'img/stoprecord.png';

        if(windmill.ui.currentSuite==null)
        	windmill.ui.incRecSuite();
        
        windmill.ui.remote.getSuite();
        
 
        try { this.recRecursiveBind(windmill.testWin()); }
        catch(error) {
            windmill.err('You must not have set your URL correctly when launching Windmill, we are getting cross domain exceptions.');
            $('record').src = 'img/record.png';
            this.recordState = false;
        }
    }

    this.recordOff = function() {
        windmill.ui.recorder.recordState = false;
        windmill.ui.recorder.same=true;
        $('record').src = 'img/record.png';
        try {
            this.recRecursiveUnBind(windmill.testWin());
        } catch(error) {
          windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
        }

    }

    //keep association between editor in the IDE and editor in the page
    this.arrEdit={};
    
    //check if i changed page
	this.same=false;
	
	
    //get the editors in the page and attach them the event handlers
	this.getTinyEditor= function(){
 
     var i=0;
     var idArr=[];
     var editors=null;
     if(windmill.testWin().tinyMCE){
    	 editors=windmill.testWin().tinymce.EditorManager.editors;
    	 for( var edId in editors) {
        	idArr[i]=editors[edId].id;
        	i++;
        	}
    	 if(i!=0){  
    		 var len=idArr.length;
    		 var out=[];
    		 var obj={};
  
    		 //delete duplicates
    		 for (i=0;i<len;i++) {
    			 obj[idArr[i]]=0;
    		 }
    		 for (i in obj) {
    			 out.push(i);
    		 }
    		 for(i=0;i<out.length;i++){
    			 var el=windmill.testWin().tinyMCE.get(out[i]);
    			 if(windmill.ui.recorder.arrEdit[el.id]===undefined){ //three equals exclude null value
    				 windmill.ui.recorder.arrEdit[el.id]=null;
    				 el.onChange.add(function(edit) { //used for update editor in the IDE when you change content in the editor on the page
    					 if(windmill.ui.recorder.recordState==true){
    						 var contenuto=windmill.testWin().tinyMCE.get(edit.id).getContent();
    						 var params = {};
    						 var paramsWait={};
    						 params['id'] = edit.id;
    						 paramsWait['id'] = edit.id;
    						 params['editor']='';
    						 paramsWait['timeout'] = 40000;
    						 var actId;
    						 if(windmill.ui.recorder.arrEdit[edit.id]===null){
    							 windmill.ui.remote.addAction(windmill.ui.remote.buildAction('waits.forElement', paramsWait));
    							 actId=windmill.ui.remote.addAction(windmill.ui.remote.buildAction('editor', params));
    							 windmill.ui.recorder.arrEdit[edit.id]=actId;
    							 eD=function(){tinyMCE.get(actId+'option').setContent(contenuto);}
    							 setTimeout("eD()",100) //for wait tiny editor loading
    						 }
    						 else actId=windmill.ui.recorder.arrEdit[edit.id];
    						 if(windmill.ui.recorder.arrEdit[edit.id]!=null){
    							 tinyMCE.execCommand('mceAddControl', false, actId+'option');
    							 tinyMCE.get(actId+'option').setContent(contenuto);
    						 }
    					 }
    				 });
    				 el.onKeyUp.add(function(edit) {  //used in recording state for update editor in the IDE when i type in the editor in the page
    					 if(windmill.ui.recorder.recordState==true){
    						 var contenuto=windmill.testWin().tinyMCE.get(edit.id).getContent();
    						 var params = {};
    						 var paramsWait={};
    						 params['id'] = edit.id;
    						 paramsWait['id'] = edit.id;
    						 params['editor']='';
    						 paramsWait['timeout'] = 40000;
    						 var actId;
    						 if(windmill.ui.recorder.arrEdit[edit.id]===null){
    							 windmill.ui.remote.addAction(windmill.ui.remote.buildAction('waits.forElement', paramsWait));
    							 actId=windmill.ui.remote.addAction(windmill.ui.remote.buildAction('editor', params));
    							 windmill.ui.recorder.arrEdit[edit.id]=actId;
    							 eD=function(){tinyMCE.get(actId+'option').setContent(contenuto);}
    							 setTimeout("eD()",100) //for wait tiny editor loading
    						 }
    						 else actId=windmill.ui.recorder.arrEdit[edit.id];
    						 if(windmill.ui.recorder.arrEdit[edit.id]!=null){
    							 tinyMCE.execCommand('mceAddControl', false, actId+'option');
    							 tinyMCE.get(actId+'option').setContent(contenuto);
    						 }
    					 }
    				 });
    			     el.onClick.add(function(edit) {   //used in DOM Explorer when click on tiny editor
    			    	 if(windmill.ui.domexplorer.exploreState==true){
    			    		 windmill.ui.domexplorer.isEditor=true;
    			    		 windmill.ui.domexplorer.setIdInRemote(edit.id);
    			    		 windmill.ui.domexplorer.isEditor=false;
    			    	 }
    			     });
    			     el.onMouseUp.add(function(edit) { //used in recording state for add editorSelect method
    			    	 if(windmill.ui.recorder.recordState==true){
    			    		 if(windmill.testWin().tinyMCE.get(edit.id).selection.getContent({format : 'text'})=="")
    			    			 return;
    			    		 var params={};
    			    		 params['id']=edit.id;
    			    		 params['text']=windmill.testWin().tinyMCE.get(edit.id).selection.getContent({format : 'text'});
    			    		 params['bookmark']=JSON.stringify(windmill.testWin().tinyMCE.get(edit.id).selection.getBookmark());
    			    		 if(params['bookmark']=="{\"scrollX\":0,\"scrollY\":0}")
    			    			 return;
    			    		 windmill.ui.remote.addAction(windmill.ui.remote.buildAction('editorSelect', params));
        			
    			    	 }
        		
    			     });
    			 }
        
    		 }
    	 }
      
      }

};

 	//used for check if i'm in the first page of the tutorial or if i went in a page with the recorder turned off 
 	this.primaPag=true;
  
    //Recursively bind to all the iframes and frames within
    this.recRecursiveBind = function(frame) {
    	if(windmill.ui.recorder.same==false || windmill.ui.recorder.primaPag==true){
    	setTimeout("windmill.ui.recorder.getTinyEditor()",800); //for allow tiny loading
    	if(windmill.ui.recorder.primaPag==true)
    		windmill.ui.recorder.primaPag=false;
    	}
        //Make sure we haven't already bound anything to this frame yet
        this.recRecursiveUnBind(frame);
      
        //IE's onChange support doesn't bubble so we have to manually
        //Attach a listener to every select and input in the app
        if (windmill.browser.isIE) {
            var inp = frame.document.getElementsByTagName('input');
            for (var i = 0; i < inp.length; i++) {
                jQuery(inp[i]).bind("change", this.writeJsonChange);
            }
            
            var se = frame.document.getElementsByTagName('select');
            for (var i = 0; i < se.length; i++) {
                jQuery(se[i]).bind("change", this.writeJsonChange);
            }
        }
        else{
        
            //turns out there are cases where people are canceling click on purpose
            //so I am manually going to attach click listeners to all links
            var links = frame.document.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                jQuery(links[i]).bind("click", this.writeJsonClicks);
                for (var z=0; z < links[i].childNodes.length; z++){
                  jQuery(links[i].childNodes[z]).bind("click", this.writeJsonClicks);
                }
            }
        }

        jQuery(frame.document).bind("dblclick", this.writeJsonClicks);
        jQuery(frame.document).bind("change", this.writeJsonChange);
        jQuery(frame.document).bind("click", this.writeJsonClicks); 

        var iframeCount = frame.window.frames.length;
        var iframeArray = frame.window.frames;

        for (var i = 0; i < iframeCount; i++) {
            try {
                jQuery(iframeArray[i].document).bind("dblclick", this.writeJsonClicks);
                jQuery(iframeArray[i].document).bind("change", this.writeJsonChange);
                jQuery(iframeArray[i].document).bind("click", this.writeJsonClicks);
                this.recRecursiveBind(iframeArray[i]);

            } catch(error) {
              windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
            }
        }

    }

    //Recursively bind to all the iframes and frames within
    this.recRecursiveUnBind = function(frame) {
      
      var links = frame.document.getElementsByTagName('a');
       for (var i = 0; i < links.length; i++) {
            jQuery(links[i]).unbind("click", this.writeJsonChange);
           for (var z=0; z < links[i].childNodes.length; z++){
             jQuery(links[i].childNodes[z]).unbind("click", this.writeJsonChange);
           }
       }
        //IE's onChange support doesn't bubble so we have to manually
        //Attach a listener to every select and input in the app
        if (windmill.browser.isIE) {
            var inp = frame.document.getElementsByTagName('input');
            for (var i = 0; i < inp.length; i++) {
                jQuery(inp[i]).unbind("change", this.writeJsonChange);
            }
            var se = frame.document.getElementsByTagName('select');
            for (var i = 0; i < se.length; i++) {
              jQuery(se[i]).unbind("change", this.writeJsonChange);
            }
        }

        jQuery(frame.document).unbind("dblclick", this.writeJsonClicks);
        jQuery(frame.document).unbind("change", this.writeJsonChange);
        jQuery(frame.document).unbind("click", this.writeJsonClicks);
        var iframeCount = frame.window.frames.length;
        var iframeArray = frame.window.frames;

        for (var i = 0; i < iframeCount; i++) {
            try {
                jQuery(iframeArray[i].document).unbind("dblclick", this.writeJsonClicks);
                jQuery(iframeArray[i].document).unbind("change", this.writeJsonChange);
                jQuery(iframeArray[i].document).unbind("click", this.writeJsonClicks);
                this.recRecursiveUnBind(iframeArray[i]);
            } catch(error) {
              windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
            }
        }
    }
};