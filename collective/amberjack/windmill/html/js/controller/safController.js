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

//Safari specific controller functions
windmill.controller.what = function() {
  alert('Safari');
} 

//there is a problem with checking via click in safari
windmill.controller.check = function(paramObject){
  return windmill.controller.click(paramObject);    
};

//Radio buttons are even WIERDER in safari
windmill.controller.radio = function(paramObject){
  var element = lookupNode(paramObject);
  element.checked = true;
};

//Safari Click function
windmill.controller.click = function(paramObject){
  var element = lookupNode(paramObject);
  
  if(windmill.testWin().jQuery(element).attr('class')=='context'){ //used for click on particular plone button(for example "Preview" button in tinymce popup when you want to add external link)
  		windmill.testWin().jQuery(element).click();	
		return;
	}
  
 //check if i clicked on a multiple selection option
  if(paramObject.value){
  	var parent=windmill.testWin().jQuery(element).parent().get(0);
  	if(parent.tagName.toLowerCase()=='select')
  		if(windmill.testWin().jQuery(element).parent().attr("multiple")){
  				if(windmill.testWin().jQuery(element).attr("selected")==true)
  					windmill.testWin().jQuery(element).removeAttr("selected");
  				else
  					windmill.testWin().jQuery(element).attr("selected","selected");
  				
  				return;
  		}
  		
  }
  
  
  windmill.events.triggerEvent(element, 'focus', false);
  
    // For form element it is simple.
    if (element['click']) {
      element['click']();
    }
    else {
      // And since the DOM order that these actually happen is as follows when a user clicks, we replicate.
      if (element.nodeName != 'SELECT'){
        windmill.events.triggerMouseEvent(element, 'mousedown', true);
        windmill.events.triggerMouseEvent(element, 'mouseup', true);
      }
      //if option keys are provided
      if (paramObject.options){
        var arr = paramObject.options.split(',');
        arr.unshift(element, 'click', true, null, null);
        windmill.events.triggerMouseEvent.apply(this, arr);
      }
      else { windmill.events.triggerMouseEvent(element, 'click', true); }
    }

  return true;
};

//Double click for Safari
windmill.controller.doubleClick = function(paramObject) {
  var element = lookupNode(paramObject);
  windmill.events.triggerEvent(element, 'focus', false);
  windmill.events.triggerMouseEvent(element, 'dblclick', true);
  windmill.events.triggerEvent(element, 'blur', false);
};

//Type Function
windmill.controller.type = function (paramObject){

  var element = lookupNode(paramObject);
  //clear the box
  element.value = '';
  //Get the focus on to the item to be typed in, or selected
  windmill.events.triggerEvent(element, 'focus', false);
  windmill.events.triggerEvent(element, 'select', true);

  //Make sure text fits in the textbox
  var maxLengthAttr = element.getAttribute("maxLength");
  var actualValue = paramObject.text;
  var stringValue = paramObject.text;
   
  if (maxLengthAttr != null) {
    var maxLength = parseInt(maxLengthAttr);
    if (stringValue.length > maxLength) {
      //truncate it to fit
      actualValue = stringValue.substr(0, maxLength);
    }
  }
  
  var s = actualValue;
  for (var c = 0; c < s.length; c++){
     element.value += s.charAt(c);
     windmill.events.triggerKeyEvent(element, 'keydown', s.charAt(c), true, false,false, false,false);
     windmill.events.triggerKeyEvent(element, 'keypress', s.charAt(c), true, false,false, false,false); 
     windmill.events.triggerKeyEvent(element, 'keyup', s.charAt(c), true, false,false, false,false);
  }
  
  //if for some reason the key events don't do the typing
  if (element.value != s){
    element.value = s;
  }
  
  // DGF this used to be skipped in chrome URLs, but no longer.  Is xpcnativewrappers to blame?
  //Another wierd chrome thing?
  windmill.events.triggerEvent(element, 'change', true);
};

windmill.controller.editor = function (paramObject){
	 
	windmill.testWin().tinyMCE.get(paramObject.id).setContent(paramObject.editor); 
	
};
windmill.controller.editorSelect = function (paramObject){
	 windmill.testWin().tinyMCE.get(paramObject.id).selection.moveToBookmark( eval("(" + paramObject.bookmark + ")"));
	//solution for show the tiny buttons that appear only when onMouseUp  
	 windmill.events.triggerMouseEvent(windmill.testWin().tinyMCE.get(paramObject.id).selection.getNode(), 'mouseup', true);
};


windmill.controller.highlight = function (paramObject){
	 
	 if(windmill.testWin().jQuery('head')){
	
		 var children=windmill.testWin().jQuery('head').children();
		 var found=false;
		 var i;
		 for(i=0;i<children.size();i++) 
			 if (children[i].tagName.toLowerCase()=='link'){
				 if(windmill.testWin().jQuery(children[i]).attr('href')=='/windmill-serv/css/amberjack-utility.css'){ //check if the page contain the amberjack-utility.css
					 found=true;
					 break;
				 }
			 }
		
		 if(found==false) //add the amberjack-utility.css if there isn't yet
					 windmill.testWin().jQuery('head').append('<link rel="stylesheet" href="/windmill-serv/css/amberjack-utility.css" type="text/css" />'); //make available css for class 'ajHighlight'
	
	 }
	 
	 // when we play the method 'highlight' remove the previous highlighting
	 windmill.testWin().jQuery("*").removeClass('ajHighlight'); 
	 if (paramObject.locators.trim()!=''){
		 var allLoc=(paramObject.locators).split(',');
		 var lung=allLoc.length;
		 var cont=1;
		 var selector = '';
		 var loctype;
		 for(l=0;l<lung;l++){
			 loctype=(allLoc[l].split(':')[0]+'').trim();
			 selector+='"'+(allLoc[l].substring(allLoc[l].indexOf(':')+1)).trim()+'" : '+"'"+loctype+"'";
			 if (cont==lung)
				 break;
			 else{
				 selector+=', ';
				 cont+=1;
			 }
		 }
		 var locators=eval('({'+selector+'})')
		 for(var loc in locators){
			 paramObject[locators[loc]]=loc
			 var element = lookupNode(paramObject);
			 windmill.testWin().jQuery(element).addClass('ajHighlight');
			 paramObject[locators[loc]]=undefined;
		 }
	 }
		 
};

