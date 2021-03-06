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

//DOM Explorer Functions
windmill.ui.domexplorer = new function() {
  var exploreState = false;
  
  //check if click is on a tiny editor
  this.isEditor=false;
  
  ////check if i click on a link with href="#...." (used with Plone's tabs contained in the content "Edit tab")
  this.internal_link=false; 
  
  this.setExploreState = function() {
    if (this.exploreState == true) { this.domExplorerOn(); }
  }
  //Reset the border to what it was before the mouse over
  this.resetBorder = function(e) { 
    e.target.style[windmill.ui.hilightProp] = '';
  }
  
  //Display the id in the remote
  this.setIdInRemote = function(e) {
	  
	windmill.ui.domexplorer.internal_link=false;   
    if ($(windmill.ui.remote.selectedElement) == null){
      windmill.ui.remote.selectedElement = null;
    }
    if (windmill.ui.remote.selectedElement != null) {
      $("domExp").style.display = 'none';
    }
    if (windmill.ui.remote.selectedElementOption != null) {
      $("domExp").style.display = 'none';
    }
    
	 if(this.isEditor==true){
		 $("domExp").innerHTML = "ID: " + e;
		 if (windmill.ui.remote.selectedElement != null) {
		        var id = windmill.ui.remote.selectedElement.replace('locator', '');
		        var a = $("domExp").innerHTML.split(': ');
		          $(id + 'locator').value = e;
		          $(id + 'locator').focus();
		          windmill.ui.recorder.arrEdit[e]=id;
		          windmill.ui.domexplorer.domExplorerOff();
		          window.focus();
		    }
			 
		 return;
	 }
    
    //if absolute xpath is not wanted try our best to get a better locater
    if ($('useXpath').checked == false) {
        $("domExp").innerHTML = "";
        
        if (e.target.id != "") {
          var element = elementslib.Element.ID(e.target.id);
          if (element == e.target){
            $("domExp").innerHTML = "ID: " + e.target.id;
          }
        }
        else if ((e.target.name != "") && (typeof(e.target.name) != "undefined")) {
          var element = elementslib.Element.NAME(e.target.name);
          if (element == e.target){
            $("domExp").innerHTML = "Name: " + e.target.name;
          }
        }
        else if ((e.target.nodeName.toUpperCase() == "A") || (e.target.parentNode.nodeName.toUpperCase() == "A")) {
          var element = elementslib.Element.LINK(removeHTMLTags(e.target.innerHTML));
          if (element == e.target){
        	  if(jQuery(e.target).attr('href').charAt(0)=='#'){ //internal_link
        		  jQuery(e.target).bind('click',function(){windmill.ui.domexplorer.explorerClick(); jQuery(e.target).unbind('click') }) //For internal_link I use bind because dxRecursiveBind isn't able to add onclick handler to it 
        		  windmill.ui.domexplorer.internal_link=true;  
        	  }
        	  $("domExp").innerHTML = "Link: " + removeHTMLTags(e.target.innerHTML).trim();
          }
          else{  // get the right locator when a node (for example a span) is inside a link node which point to an internal_link
        	  
      	  	if(e.target.parentNode.tagName.toUpperCase() == "A" && jQuery(e.target.parentNode).attr('href').charAt(0)=='#'){
      	  	jQuery(e.target).bind('click',function(){windmill.ui.domexplorer.explorerClick(); jQuery(e.target).unbind('click') }) //For internal_link I use bind because dxRecursiveBind isn't able to add onclick handler to it
      	  		$("domExp").innerHTML = "Link: " + removeHTMLTags(e.target.parentNode.innerHTML).trim();
      	  		windmill.ui.domexplorer.internal_link=true;  
      	  	}
          }
          
        }
        else if ((e.target.value != "") && (typeof(e.target.value) != "undefined")) {
          var element = elementslib.Element.VALUE(e.target.value);
          if (element == e.target){
            $("domExp").innerHTML = "Value: " + e.target.value;
          }
        }
        //if not just use the xpath
        if ($("domExp").innerHTML == ""){
          var stringXpath = getXSPath(e.target);
          //test to make sure it actually works
          var element = elementslib.Element.XPATH(stringXpath);
          
          if (element == e.target){
        	  if(stringXpath.indexOf("@id='mce_")!=-1)  //tiny drop-down style list
          		$("domExp").innerHTML = 'Link: ' + element.innerHTML;
          	else
          		$("domExp").innerHTML = 'XPath: ' + stringXpath;
          }
          else{
            $("domExp").innerHTML = "XPath: Error - Could not find a reliable locator for this node.";
          }
        }
      }
      else {
         var stringXpath = getXSPath(e.target);
         var element = elementslib.Element.XPATH(stringXpath);
         if (element == e.target){
        	if(stringXpath.indexOf("@id='mce_")!=-1)   //tiny drop-down style list
        		$("domExp").innerHTML = 'Link: ' + element.innerHTML;
        	else
        		$("domExp").innerHTML = 'XPath: ' + stringXpath;
          }
          else{
            $("domExp").innerHTML = "XPath: Error - Could not find a reliable locator for this node.";
          }
      }
      
      //trying to keep old borders from getting left all over the page
      if (windmill.ui.domexplorer.currElem){
          //sometimes IE doesn't like this
          try{
            windmill.ui.domexplorer.currElem.style[windmill.ui.hilightProp] = "";
          }
          catch(err){}
      }
      
      e.target.style[windmill.ui.hilightProp] = windmill.ui.borderHilight;
      windmill.ui.domexplorer.currElem = e.target;
      
      this.explorerUpdate(e);
  };
  
  //for not lose the previous selected locators in highlight method
  this.prevHighValue=null;

  this.explorerUpdate = function(e) {
    e.cancelBubble = true;
    if (windmill.browser.isIE == false) {
        e.stopPropagation();
        e.preventDefault();
    }
    if (windmill.ui.remote.selectedElementOption != null && e.altKey == false) {
        var id = windmill.ui.remote.selectedElementOption.replace('option', '');
        if($(id+'method').value=='highlight'){
        	if(this.prevHighValue==null)
        		this.prevHighValue=($(id + 'option').value).trim();
        	
        }
        //Incase if that node has been removed somehow
        try {
          var a = $("domExp").innerHTML.split(': ');
          var c;
          var strLoc=a[1];
          for(c=2;c<a.length;c++){
        	  var strLoc=strLoc+': '+a[c];  
          }
        	  
          //If the element is a link, get rid of the all the garbage
          if (a[0] == 'Link') {
              strLoc = strLoc.replace(/(<([^>]+)>)/ig, "");
              strLoc = strLoc.replace(/\n/g, "");
          }
          
          if($(id+'method').value=='highlight'){
        	  
        	  $(id + 'option').value= (a[0].toLowerCase()).trim()+' : '+strLoc.trim();  
          }
          else{
        	  $(id + 'optionType').value = 'opt'+a[0].toLowerCase();
        	  $(id + 'option').value = strLoc;
          	}
          $(id + 'option').focus();
          
        }
        catch(error) {
          windmill.err('Error in dom explorer');
        }
    }
    
    if (windmill.ui.remote.selectedElement != null) {
        var id = windmill.ui.remote.selectedElement.replace('locator', '');
        
        //Incase if that node has been removed somehow
        try {
          var a = $("domExp").innerHTML.split(': ');
          var c;
          var strLoc=a[1];
          for(c=2;c<a.length;c++){
        	  var strLoc=strLoc+': '+a[c];  
          }
          //If the element is a link, get rid of the all the garbage
          if (a[0] == 'Link') {
        	  strLoc = strLoc.replace(/(<([^>]+)>)/ig, "");
        	  strLoc = strLoc.replace(/\n/g, "");
          }
          $(id + 'locatorType').value = a[0].toLowerCase();
          $(id + 'locator').value = strLoc;
          $(id + 'locator').focus();
        }
        catch(error) {
          windmill.err('Error in dom explorer');
        }
    }
    
  };
  
  this.showMouseCoords = function(e){
    $('mouseExp').innerHTML = '('+e.clientX + ',' + e.clientY+')';
  }
  
  this.explorerClick = function(e) {
	  
	  //for internal link
	  if(windmill.ui.domexplorer.internal_link==true){
		  if ($("domExp").style.display == 'none'){
	    	  windmill.ui.domexplorer.domExplorerOff();
	      } else {
	    	  windmill.ui.domexplorer.dxRecursiveUnBind(windmill.testWin());
	      }
	      window.focus();
		  return;  
	  }
	  
	  
    e.cancelBubble = true;
    if (windmill.browser.isIE == false) {
      e.stopPropagation();
      e.preventDefault();
    }
    

    	
    var optId = windmill.ui.remote.selectedElementOption;
    if(optId!=null){
    	if(this.prevHighValue!=null){
    		var a = $("domExp").innerHTML.split(': ');
            var c;
            var strLoc=a[1];
            for(c=2;c<a.length;c++){
          	  var strLoc=strLoc+': '+a[c];  
            }
            
    		if(this.prevHighValue.trim()=='')
    			$(optId).value = a[0].toLowerCase()+' : '+strLoc.trim();
    		else
    			$(optId).value = this.prevHighValue+', '+a[0].toLowerCase()+' : '+strLoc.trim();
    	}
    }
    	
    //if an option section is selected and the altKey is down append the mouse coords
    if ((optId != null) && (e.altKey)){
      if ($(optId).value == ""){
    	  $(optId).value += '('+e.clientX+','+e.clientY+'),';
      }
      else{
    	  $(optId).value += '('+e.clientX+','+e.clientY+')';
      }
    }
    else {
      if ($("domExp").style.display == 'none'){
    	  windmill.ui.domexplorer.domExplorerOff();
      } else {
    	  windmill.ui.domexplorer.dxRecursiveUnBind(windmill.testWin());
      }
      window.focus();
    }
  };
  
  
  //Set the listeners for the dom explorer
  this.domExplorerOn = function() {	  
 	  if(windmill.ui.remote.selectedElement!=null && $(windmill.ui.remote.selectedElement).style.display=='none')
 		 windmill.ui.remote.selectedElement=null;
 	 if(windmill.ui.remote.selectedElementOption!=null && $(windmill.ui.remote.selectedElementOption).style.display=='none')
 		windmill.ui.remote.selectedElementOption=null;
    //Display the mouse coords in the IDE
    fleegix.event.listen(windmill.testWin().document.body, 'onmousemove', windmill.ui.domexplorer, 'showMouseCoords');
    this.exploreState = true;
    this.prevHighValue=null;
    try {
      $('explorer').src = 'img/xoff.png';
      $('domExp').style.display = 'block';
      $('domExp').innerHTML = '';
      
      if(windmill.ui.recorder.same==false || windmill.ui.recorder.primaPag==true){     //if i turn on the DOM Explorer in the current page before of the recorder i must load the tiny editors
    	  windmill.ui.recorder.getTinyEditor();
    	  if(windmill.ui.recorder.primaPag==true)
     		 windmill.ui.recorder.primaPag=false;
      }
      this.dxRecursiveBind(windmill.testWin());
    }
    catch(error) {
      windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
      $('explorer').src = 'img/xon.png';
      this.exploreState = false;
    }
  };

  //Remove the listeners for the dom explorer
  this.domExplorerOff = function() {
	 this.prevHighValue=null;
    fleegix.event.unlisten(windmill.testWin().document.body, 'onmousemove', windmill.ui.domexplorer, 'showMouseCoords');
    //Mouse coords display off
    $('mouseExp').innerHTML = "";
    this.exploreState = false;
    windmill.ui.recorder.same=true;
    try {
      //Reset the selected element
      windmill.ui.remote.selectedElement = null;
      windmill.ui.remote.selectedElementOption = null;
      
      $('explorer').src = 'img/xon.png';
      $('domExp').style.display = 'none';
      $('domExp').innerHTML = '';
      this.dxRecursiveUnBind(windmill.testWin());
    }
    catch(error) {
      windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
      $('explorer').src = 'img/xon.png';
      this.exploreState = false;
    }
  };

  
  //Recursively bind to all the iframes and frames within
  this.dxRecursiveBind = function(frame) {
    var exitEvent = "onclick";
    /*if (!$('domInspectorExit').checked){
      exitEvent = "ondblclick";
    }*/
    
    this.dxRecursiveUnBind(frame);

    fleegix.event.listen(frame.document, 'onmouseover', this, 'setIdInRemote');
    fleegix.event.listen(frame.document, 'onmouseout', this, 'resetBorder');
    fleegix.event.listen(frame.document, exitEvent, this, 'explorerClick');

    var iframeCount = frame.window.frames.length;
    var iframeArray = frame.window.frames;

    for (var i = 0; i < iframeCount; i++){
      try {
        fleegix.event.listen(iframeArray[i].document, 'onmouseover', this, 'setIdInRemote');
        fleegix.event.listen(iframeArray[i].document, 'onmouseout', this, 'resetBorder');
        fleegix.event.listen(iframeArray[i].document, exitEvent, this, 'explorerClick');
        this.dxRecursiveBind(iframeArray[i]);
      }
      catch(error) {
        windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
      }
    }
  };

  this.dxRecursiveUnBind = function(frame) {
    var exitEvent = "onclick";   
    fleegix.event.unlisten(frame.document, 'onmouseover', this, 'setIdInRemote');
    fleegix.event.unlisten(frame.document, 'onmouseout', this, 'resetBorder');
    fleegix.event.unlisten(frame.document, exitEvent, this, 'explorerClick');

    var iframeCount = frame.window.frames.length;
    var iframeArray = frame.window.frames;

    for (var i = 0; i < iframeCount; i++){
      try {
        fleegix.event.unlisten(iframeArray[i].document, 'onmouseover', this, 'setIdInRemote');
        fleegix.event.unlisten(iframeArray[i].document, 'onmouseout', this, 'resetBorder');
        fleegix.event.unlisten(iframeArray[i].document, exitEvent, this, 'explorerClick');
        this.dxRecursiveUnBind(iframeArray[i]);
      }
      catch(error) {
        windmill.err('Binding to windows and iframes, '+error +'.. binding all others.');
      }
    }
  };

};