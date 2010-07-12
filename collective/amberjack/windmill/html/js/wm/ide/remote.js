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

//Functions for interacting with the remote
/***************************************/
windmill.ui.remote = new function() {
    this.selectedElement = null;
    this.selectedElementOption = null;

    this.scrollRecorderTextArea = function() {
        var obj = $("ideForm");
        obj.scrollTop = obj.scrollHeight;
    };
    
    //variable for keep the state of IDE interface
    this.simple=true;
    
    //change the IDE interface o only a microstep's interface
    this.toggleSimAdv= function(idAc){
    	
    if(idAc==undefined){	
      if(this.simple==false){  //if now is advanced
       	  
    	  $("addAction").style.display='none';
    	  $("Firebug").style.display='none';
    	  var tutorial = $('ideForm');
          if (tutorial.hasChildNodes()){ //if tutorial has Steps
              for (var j = 0; j < tutorial.childNodes.length; j++) {
              	    var name=''+tutorial.childNodes[j].id;
              		var suite=$(name);
              		if(suite.hasChildNodes()){ 
              				for (var k = 1; k < suite.childNodes.length; k++) {
    
              						var metNode = $(suite.childNodes[k].id + 'method').value;																		
              						$(suite.childNodes[k].id + 'method').style.visibility='hidden';
              						$(suite.childNodes[k].id + 'aggSotto').style.display='none';
              						$(suite.childNodes[k].id + 'aggSopra').style.display='none';
              						if(metNode=='editorSelect'){
              							$(suite.childNodes[k].id + 'bookmark').style.display='none';
              							$(suite.childNodes[k].id + 'bookMtext').style.display='none';
              						}
              						var action=[];
            						action['id']=suite.childNodes[k].id;
            						var stato = {method: metNode, params: {}, action: action};
            						$(suite.childNodes[k].id + 'inst').innerHTML='<br/>'+this.getInst(stato);
              						$(suite.childNodes[k].id + 'inst').style.display='inline';
              						$(suite.childNodes[k].id + 'vuoto').style.display='block';
              						$(suite.childNodes[k].id + 'interface').innerHTML='&nbsp;Edit&nbsp;';
              						
          							if (windmill.registry.methods[metNode].locator) {
              							$(suite.childNodes[k].id + 'locatorType').style.display='none';
              							$(suite.childNodes[k].id + 'locator').style.display='none';
              						}
          							if (windmill.registry.methods[metNode].option) {
                                          if(metNode!='editor'){
                                        	  if(metNode=='highlight'){
                                        		  $(suite.childNodes[k].id + 'locHighlight' ).style.display='none';
                                        	  }
                                        	  $(suite.childNodes[k].id + 'optionType').style.display='none';
                                        	  if($(suite.childNodes[k].id + 'colon'))
                								 $(suite.childNodes[k].id + 'colon').style.display='none';                			
                                        	  $(suite.childNodes[k].id + 'option').style.display='none';
                						   }
                                          else{
                                        	  $(suite.childNodes[k].id + 'colon').style.display='none';
                                        	  $(suite.childNodes[k].id + 'optionType').style.display='none';
                                        	  
                                          }
              						}
          							
    
              				}
              	}
              	     
              		    
              }

          }
    	  this.simple=true;
      }
      else{  //if now is simple
    	  
    	  $("addAction").style.display='inline';
    	  $("Firebug").style.display='inline';
    	  var tutorial = $('ideForm');
          if (tutorial.hasChildNodes()){ //if tutorial has Steps
          	
              for (var j = 0; j < tutorial.childNodes.length; j++) {
              	    var name=''+tutorial.childNodes[j].id;
              		var suite=$(name);
              		if(suite.hasChildNodes()){ 
              				for (var k = 1; k < suite.childNodes.length; k++) {
              					 	var metNode = $(suite.childNodes[k].id + 'method').value;																		
              						$(suite.childNodes[k].id + 'method').style.visibility='visible';
              						$(suite.childNodes[k].id + 'aggSotto').style.display='inline';
              						$(suite.childNodes[k].id + 'aggSopra').style.display='inline';
              						if(metNode=='editorSelect'){
              							$(suite.childNodes[k].id + 'bookmark').style.display='inline';
              							$(suite.childNodes[k].id + 'bookMtext').style.display='inline';
              						}
              						$(suite.childNodes[k].id + 'inst').style.display='none';
              						$(suite.childNodes[k].id + 'vuoto').style.display='none';
              						$(suite.childNodes[k].id + 'interface').innerHTML='&nbsp;Close&nbsp;';
          							if (windmill.registry.methods[metNode].locator) {
              							$(suite.childNodes[k].id + 'locatorType').style.display='inline';
              							$(suite.childNodes[k].id + 'locator').style.display='inline';
              							
              						}
          							if (windmill.registry.methods[metNode].option) {
                                          if(metNode!='editor'){
                                        	  if(metNode=='highlight'){
                                        		  $(suite.childNodes[k].id + 'locHighlight' ).style.display='inline';
                                        	  }
                                        	  $(suite.childNodes[k].id + 'optionType').style.display='inline';
                                        	  if($(suite.childNodes[k].id + 'colon'))
                                        		  $(suite.childNodes[k].id + 'colon').style.display='inline';
                                        	  $(suite.childNodes[k].id + 'option').style.display='inline';
                						   }
                                          else{
                                        	  $(suite.childNodes[k].id + 'colon').style.display='inline';
                                        	  $(suite.childNodes[k].id + 'optionType').style.display='inline';
                                          }
              						}
              				}
              	   }        	        
              }
        }
    	this.simple=false;  
      }
      
    }
    else{
        
    	if($(idAc + 'method').style.visibility!='hidden'){  // if now is advanced

                						var metNode = $(idAc + 'method').value;																		
                						$(idAc + 'method').style.visibility='hidden';
                						$(idAc + 'aggSotto').style.display='none';
                						$(idAc + 'aggSopra').style.display='none';
                						if(metNode=='editorSelect'){
                							$(idAc + 'bookmark').style.display='none';
                							$(idAc + 'bookMtext').style.display='none';
                						}
                						var action=[];
                						action['id']=idAc;
                						var stato = {method: metNode, params: {}, action: action};
                						$(idAc + 'inst').innerHTML='<br/>'+this.getInst(stato);
                						$(idAc + 'inst').style.display='inline';
                						$(idAc + 'vuoto').style.display='block';
            							if (windmill.registry.methods[metNode].locator) {
                							$(idAc + 'locatorType').style.display='none';
                							$(idAc + 'locator').style.display='none';
                						}
            							if (windmill.registry.methods[metNode].option) {
                                            if(metNode!='editor'){  
                                            	if(metNode=='highlight'){
                                          		  $(idAc + 'locHighlight' ).style.display='none';
                                            	}
                                            	$(idAc + 'optionType').style.display='none';
                                            	if($(idAc + 'colon'))
                                            		$(idAc + 'colon').style.display='none';                			
                                            	$(idAc + 'option').style.display='none';
                                             }
                                             else{
                                            	 $(idAc + 'colon').style.display='none';
                                            	 $( idAc+ 'optionType').style.display='none';
                  						   	}
                						}
            							$(idAc+ 'interface').innerHTML='&nbsp;Edit&nbsp;';


        }
        else{  //if now is simple
   
                						var metNode = $(idAc + 'method').value;																		
                						 $(idAc + 'method').style.visibility='visible';
                						
                						$(idAc + 'aggSotto').style.display='inline';
                						$(idAc + 'aggSopra').style.display='inline';
                					
                						
                						if(metNode=='editorSelect'){
                    						$(idAc + 'bookmark').style.display='inline';
                    						$(idAc + 'bookMtext').style.display='inline';
                						}
                						$(idAc + 'inst').style.display='none';
                						$(idAc + 'vuoto').style.display='none';
                						
            							if (windmill.registry.methods[metNode].locator) {
                							$(idAc + 'locatorType').style.display='inline';
                							$(idAc + 'locator').style.display='inline';
                						}
            							if (windmill.registry.methods[metNode].option) {
                                            if(metNode!='editor'){  
                                            	if(metNode=='highlight'){
                                            		  $(idAc + 'locHighlight' ).style.display='inline';
                                            	  }
                  							 $(idAc + 'optionType').style.display='inline';
                  							 if($(idAc + 'colon'))
                  							 $(idAc + 'colon').style.display='inline';
                  							 $(idAc + 'option').style.display='inline';
             
                  						   }
                                            else{
                                                $(idAc + 'colon').style.display='inline';
                                          	    $( idAc+ 'optionType').style.display='inline';
                      						   }
                						}
            							$(idAc + 'interface').innerHTML='&nbsp;Close&nbsp;';
 
        }
        
      }
    	
    }
    
    
    //get the descriptive writing (or warning) showed within the microstep in simple interface
    this.getInst=function(stato){

    	var metodo=stato.method;
    	var parametri=stato.params;
    	var id=stato.action.id;
    	var re=/ /g;
    	var strIn='';
    	var locType=null;
    	var exit=0;
    	for(i=0;i<windmill.registry.locator.length;i++){
    		for(var j in parametri){
    		  if(windmill.registry.locator[i]==j){
    			  locType=j;
    			  exit=1;
    			  break; 			  
    		  }
    		}
    		if(exit==1)
    			  break;
    	  }
    	  
    	
    	if(metodo=='click'){
        	  
    		if(parametri['link']){
        	  	if((parametri['link']+'')=='' || ((parametri['link']+'').replace(re,''))==''){ 
        	  		strIn='This microstep is incomplete. Edit it!';
        	  		$(id+'inst').style.color='red';
        	  	}
        	  	else{
        	  		 strIn="Clicked on link '"+parametri['link']+"'";
        	  		 $(id+'inst').style.color='#666';
        	  	}
        	 }
    		else if(parametri[locType]){
    			 if((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))==''){ 
         	  		    strIn='This microstep is incomplete. Edit it!';
         	  			$(id+'inst').style.color='red';
         	  	 }
        	  	 else{
        	  		 strIn="Clicked on '"+parametri[locType]+"'";	   
        	  		 $(id+'inst').style.color='#666';
        	  	 }	
        	 }       	 
        	else if($(id+'locatorType')){
        		 if($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))==''){ 
        	  			strIn='This microstep is incomplete. Edit it!';
        	  			$(id+'inst').style.color='red';
        	  	 }
        	  	 else if($(id+'locatorType').value=='link'){
 	  				   strIn="Clicked on link '"+ $(id+'locator').value+"'";
 	  				   $(id+'inst').style.color='#666';
 	  			 }else{
 	  				  strIn="Clicked on '"+ $(id+'locator').value+"'";
 	  				  $(id+'inst').style.color='#666';
        	  		 }
        	 }
        	else{
        	  	   strIn="Clicked on page's element";
        	  	   $(id+'inst').style.color='#666';
        	  	}
         }
         
    	else if(metodo=='radio'){
        	  if(parametri[locType] && ((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'locator') &&($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))=='')){
      		 	  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
         	  }
        	  else{ 
        		  if($(id+'locator')){
        			  strIn="Selected radio option";
        			  $(id+'inst').style.color='#666';
        		  } 
        		  else strIn="Selected radio option";
        	  }
        }
    	else if(metodo=='check'){
        	  if(parametri[locType] && ((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'locator') &&($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))=='')){
         		 strIn='This microstep is incomplete. Edit it!';
     	  		 $(id+'inst').style.color='red'; 
         	 }
        	  else{
        		  if($(id+'locator')){
        			  strIn= "Clicked on checkbox";
        			  $(id+'inst').style.color='#666';
        		  }else 
        			  strIn= "Clicked on checkbox";
        	  }
          }
    	 else if(metodo=='select'){
        	  if(parametri[locType] && ((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'locator') &&($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))=='')){
      		 	  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
         	 }
        	  else if(parametri['option'] && ((parametri['option']+'')=='' || ((parametri['option']+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if(parametri['val'] && ((parametri['val']+'')=='' || ((parametri['val']+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if(parametri['index'] && ((parametri['index']+'')=='' || ((parametri['index']+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'option') &&($(id+'option').value=='' || ($(id+'option').value.replace(re,''))=='')){
         		 strIn='This microstep is incomplete. Edit it!';
     	  		 $(id+'inst').style.color='red'; 
         	 }
        	  else{
        		  if($(id+'locator')){
        			  strIn="Selected entry in drop-down list";
        			  $(id+'inst').style.color='#666';
        		  }else 
        			  strIn="Selected entry in drop-down list";
        	  }
        	  
          }
    	 else if(metodo=='type'){
    		 	if(parametri[locType] && ((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))=='')){
    		 		strIn='This microstep is incomplete. Edit it!';
     	  			$(id+'inst').style.color='red'; 
    		 	}
    		 	else if($(id+'locator') &&($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))=='')){      		 	
    		 		strIn='This microstep is incomplete. Edit it!';
    		 		$(id+'inst').style.color='red'; 
    		 	}
    		 	else if(parametri['text']) {
    		 		strIn="Typed '"+parametri['text']+"'";
    		 		$(id+'inst').style.color='#666';
    		 	}
    		 	else{
        		  if($(id+'option')){
        			  strIn="Typed '"+ $(id+'option').value+"'";
        			  $(id+'inst').style.color='#666';
        		  }
    		 	}
          }
          else if (metodo=='highlight'){
        	  if(parametri['locators'] && ((parametri['locators']+'')=='' || ((parametri['locators']+'').replace(re,''))=='')){
        		  strIn='No locators selected. This microstep is used only for description';
        	  }
        	  else if($(id+'option') &&($(id+'option').value=='' || ($(id+'option').value.replace(re,''))=='')){
        		  strIn='No locators selected. Descriptive microstep';
         	  }
        	  else if (parametri['locators']  || $(id+'option')){
        		  strIn="Locators selected for amberjack highlighting";
        	  }
          }
          else if(metodo=='editorSelect'){
        	  if(parametri[locType] && ((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'locator') &&($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))=='')){
         		 strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
         	  }
        	  else if(parametri['bookmark'] && ((parametri['bookmark']+'')=='' || ((parametri['bookmark']+'').replace(re,''))=='')){
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  }
        	  else if($(id+'bookmark') &&($(id+'bookmark').value=='' || ($(id+'bookmark').value.replace(re,''))=='')){ 
        		  strIn='This microstep is incomplete. Edit it!';
     	  		  $(id+'inst').style.color='red'; 
        	  
        	  } 
        	  else if(parametri['text']) {
        		  strIn="Selected text '"+parametri['text']+"' in tiny editor";
        		  $(id+'inst').style.color='#666';
        	  }
        	  else{
        		  if($(id+'option')){
        			  strIn="Selected text '"+ $(id+'option').value+"' in tiny editor";
        			  $(id+'inst').style.color='#666';
        		  }
        	  }
        	  
          
           }
          /* else if(metodo=='open'){
         	  if(parametri['url']){
        		  if((parametri['url']+'')=='' || ((parametri['url']+'').replace(re,''))==''){ 
        			  strIn='This microstep is incomplete. Edit it!';
      	  			  $(id+'inst').style.color='red';
      	  		  }else{
                   strIn='Go to the url --> ' + parametri['url'];
                   $(id+'inst').style.color='#666';
      	  		  }
        	   }else{
        		  if($(id+'option')){
        			  if($(id+'option').value=='' || ($(id+'option').value.replace(re,''))==''){ 
          	  			strIn='This microstep is incomplete. Edit it!';
          	  			$(id+'inst').style.color='red';
          	  		  }
                  	  else{
                  		  strIn='Go to the url --> ' + $(id+'option').value;
                  		  $(id+'inst').style.color='#666';
                  	  }
        		   }
        	    }
           }*/
           else if(metodo=='waits.sleep'){
        	  if(parametri['milliseconds']){
        		  if((parametri['milliseconds']+'')=='' || ((parametri['milliseconds']+'').replace(re,''))==''){ 
        			  strIn='This microstep is incomplete. Edit it!';
      	  			  $(id+'inst').style.color='red';
      	  		  }else{
                   strIn='Do nothing for ' + parametri['milliseconds']+' milliseconds';
                   $(id+'inst').style.color='#666';
      	  		  }
        	  }else{
        		  if($(id+'option')){
        			  if($(id+'option').value=='' || ($(id+'option').value.replace(re,''))==''){ 
          	  			strIn='This microstep is incomplete. Edit it!';
          	  			$(id+'inst').style.color='red';
          	  		  }
                  	  else{
                  		  strIn='Do nothing for ' + $(id+'option').value+' milliseconds';
                  		  $(id+'inst').style.color='#666';
                  	  }
        		  }
        	  }
          }
          else if(metodo=='waits.forElement'){
        	 if(parametri['timeout'] && ((parametri['timeout']+'')=='' || ((parametri['timeout']+'').replace(re,''))=='')){
        		 strIn='This microstep is incomplete. Edit it!';
   	  			 $(id+'inst').style.color='red'; 
        	 }
        	 else if($(id+'option') &&($(id+'option').value=='' || ($(id+'option').value.replace(re,''))=='')){ 	
        		 strIn='This microstep is incomplete. Edit it!';
    	  		 $(id+'inst').style.color='red'; 
        	 }
        	 else if(parametri['link']){
        		  if((parametri['link']+'')=='' || ((parametri['link']+'').replace(re,''))==''){ 
        			  strIn='This microstep is incomplete. Edit it!';
      	  			  $(id+'inst').style.color='red';
      	  		  }else{
       	  	            strIn="Waiting for link '"+parametri['link']+"'";
       	  	            $(id+'inst').style.color='#666';
      	  		  }
        	 }
        	 else if(parametri[locType]){
        		  	if((parametri[locType]+'')=='' || ((parametri[locType]+'').replace(re,''))==''){ 
        		  		strIn='This microstep is incomplete. Edit it!';
      	  			  	$(id+'inst').style.color='red';
      	  		  	}else{
      	  			  	strIn="Waiting for '"+parametri[locType]+"'";
      	  			  	$(id+'inst').style.color='#666';
      	  		  	}
       	  	 }       	 
       	  	 else if($(id+'locatorType')){
       	  	     	if($(id+'locator').value=='' || ($(id+'locator').value.replace(re,''))==''){ 
       	  	     		strIn='This microstep is incomplete. Edit it!';
       	  	     		$(id+'inst').style.color='red';
       	  	     	}
       	  	     	else{
       	  	     		if($(id+'locatorType').value=='link')
       	  	     			strIn="Waiting for link '"+ $(id+'locator').value+"'";
       	  	     		else
       	  	     			strIn="Waiting for '"+ $(id+'locator').value+"'";
       	  	     		$(id+'inst').style.color='#666';
       	  	     		}
       	  	 }
       	  	 else{
       	  		strIn="Wait element loading";
        	    $(id+'inst').style.color='#666';
       	  	 }
          
    	   }
          else if(metodo=='waits.forPageLoad'){
        	  	if(parametri['timeout']){
        	  		if((parametri['timeout']+'')=='' || ((parametri['timeout']+'').replace(re,''))==''){
        	  			strIn='This microstep is incomplete. Edit it!';
       	  			 	$(id+'inst').style.color='red';
        	  		}
        	  		else{
        	  			strIn="Wait page loading";
        	  			$(id+'inst').style.color='#666';
        	  		} 
        	  	}
        	  	else if($(id+'option')){
        	  		if($(id+'option').value=='' || ($(id+'option').value.replace(re,''))==''){ 
        	  			strIn='This microstep is incomplete. Edit it!';
        	  			$(id+'inst').style.color='red';
        	  		}
        	  		else{
        	  			strIn="Wait page loading";
        	  			$(id+'inst').style.color='#666';
        	  		}
           
        	  	}
        	  	else{
        	  		if($(id+'option')){
        	  			strIn="Wait page loading";
        	  			$(id+'inst').style.color='#666';
        	  		}else 
        	  			strIn="Wait page loading";
        	  	}
          	}  
    	
           if (strIn.length > 50){
              strIn = strIn.substr(0, 47) + "..."
           }
          
           return strIn;
    	
    }
    
    
    
    //delete all in the IDE
    this.clearIDE = function() {
        input_box = confirm("Are you sure you want to delete all the data in the IDE?");
        if (input_box == true) {
        	$("titTut").value=''; //reset title's value
            fleegix.fx.fadeOut($('ideForm'));  //form IDE
            d = function() {
                $('ideForm').innerHTML = '';
                windmill.ui.recorder.recordOff();
                fleegix.fx.fadeIn($('ideForm'));
            };
            
            setTimeout("d()", 800);
            windmill.ui.currentSuite=null;
        }
    };

    //Change view if method changed
    this.methodChange = function(id) {		
        var selected = $(id + 'method').selectedIndex; //obtain selected method
        var methodObj = $(id + 'method');
        var method = methodObj[selected].value;
   
        if (method.indexOf('--') != -1){ //if it's a separator do nothing
          $(id + 'method').selectedIndex = 0;
          return;
        }       
        if(method=='waits.forPageLoad'){
        	if(methodObj[0].value!='waits.forPageLoad' && $(id).nextSibling==null){ //if i set method waits.forPageLoad in the last microstep...
        		if($(id).parentNode.nextSibling==null){ //.....and there isn't a step after the current one....
        			windmill.ui.incRecSuite();
        			this.getSuite(null, true, false);   //....new step is added
        			}
        	}
        }
        
        //Preserve the value that was in there
        try {
          var oldDesc=$(id + "DescId").value;
          var oldLocator = $(id + "locator").value; // locator input field
          var oldLocatorType = $(id + "locatorType").value; //locator type (id,link,name,ecc ..)
        }
        catch(err) { }
        
        var newAction = this.buildAction(method, {
            'uuid': id
        });
        
        //Ugly hack caused by bug in jquery
        if (windmill.browser.isIE){
          $(id).innerHTML = newAction.innerHTML;
        }
        else {
          jQuery($(id)).replaceWith(newAction);
        }
        
        //only try to replace them if this particular action had a locator to begin with
        try {
          if (typeof(oldLocator) != 'undefined') {
            $(id + "locator").value = oldLocator;
            if(method!="editor")
            	$(id + "locatorType").value = oldLocatorType;
            else
            	$(id + "locatorType").value = 'id';
          }
        }
        catch(err) {}
        
        if (typeof(oldDesc) != 'undefined')
        	 $(id + "DescId").value = oldDesc;
        
        //safari hack for resizing the suite div to accomodate the new action
        $(id).style.height = '';
        
     /* var nextMicro = $(id).nextSibling;
        var nextMethod = null;
        if (nextMicro){
          nextMethod = $(nextMicro.id+"method").value;
        } */
        
        
      //if the method selected is "open" add a microstep with method "waits.forPageLoad" below the current one (if there isn't one yet)
       /* if (method == "open" && nextMethod != "waits.forPageLoad") 
          		this.addActionBelow(id,this.buildAction("waits.forPageLoad", {timeout:8000}));*/

        
        
       if($(id+'method').style.visibility=='hidden')
    	   this.toggleSimAdv(id);
        
        if(method=='editor'){   //if method is 'editor' get the tiny editor
        	tinyMCE.execCommand('mceAddControl', false, id+'option');
            }
    };

    
    this.setRemoteElem = function(id) {
      this.selectedElementOption = null;
      this.selectedElement = id;
    };
    
    this.setRemoteElemOption = function(id) {
      this.selectedElement = null;
      this.selectedElementOption = id;
    };
    
    
    //This is because the google chrome rendering engine sucks
    //and makes drop down boxes with background images black
    this.addCSSBG = function(){
      var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );  //navigator.userAgent--> identify browser
      if (!is_chrome){
       var smallopts = jQuery(".smalloption") ;
       for (i=0; i < smallopts.length; i++){
         smallopts[i].style.background = 'transparent url("/windmill-serv/img/text_elem_gradient.gif")';
       }
      }
    };
    
    
    //add  a microstep above the current one
    this.addActionAbove = function(uuid) {
        var newAction = this.buildAction(null, {});
        jQuery($(uuid)).before(jQuery(newAction));
        if(this.simple==true)  //i want edit the new microstep..so i want it in advanced interface
        	this.toggleSimAdv(newAction.id);
        $(newAction.id + "locator").focus();
        fleegix.fx.fadeIn($(newAction.id));
    };

    
   //add a microstep below the current one
    this.addActionBelow = function(uuid, action) {
        if (!action){ var action = this.buildAction(null, {}); }
        jQuery($(uuid)).after(action);
        if(this.simple==true)//i want edit the new microstep..so i want it in advanced interface
        	this.toggleSimAdv(action.id);
        var loc = $(action.id + "locator");
        if (loc){ loc.focus(); }
        fleegix.fx.fadeIn($(action.id));
    };

//delete step or microstep
    this.deleteAction = function(uuid) {
    	
    	var k=0;
    	if(windmill.ui.recorder.arrEdit){	
    		for(var i in windmill.ui.recorder.arrEdit){
    			if(windmill.ui.recorder.arrEdit[i]!=null)
    				k++;
    		}	
    	}
    	
    	if(k>0){	
    		for(var i in windmill.ui.recorder.arrEdit){
    			if(windmill.ui.recorder.arrEdit[i]==uuid){
    				windmill.ui.recorder.arrEdit[i]=null;
    				break;	
    			}
    		}	
    	}
    	var allSuite = $('ideForm').childNodes;
    	if(allSuite.length>0){
    		var n=allSuite.length-1;
    		var lastSuite = allSuite[allSuite.length-1].id
    		while(n>0){
    			if(uuid==allSuite[n].id){
    				tinyMCE.execCommand('mceRemoveControl', false, uuid+'descStep');
    				break;
    			}
    			n--;	
    		}
    		if(uuid==lastSuite) {	
        	windmill.ui.currentSuite=null;
    		}
    	}
        fleegix.fx.fadeOut($(uuid));
        d = function() {
          var pElement = $(uuid).parentNode; //point to parent of the current node
          jQuery($(uuid)).remove();
          //So that we don't leave the selected element
          if (pElement.id == 'ideForm') {  //variable turned off when there are no steps and microsteps in the IDE   
        	  windmill.ui.remote.selectedElement = null;
          }
        };
        setTimeout("d()", 800); 
    };


    this.addAction = function(action) {
        var suite = this.getSuite();  //return current step or new if there aren't steps
        suite.style.height = '';
        if (typeof(action) == 'undefined') {  
          var action = this.buildAction(null, {});
        }
        //A hack to make it draw the UI correctly in IE
        suite.appendChild(action);
        if (windmill.browser.isIE) {
          $(action.id).innerHTML = action.innerHTML;
        }
        else {
          try { $(action.id + "locator").focus(); }
          catch(err){}
        }
        
        var stato = {method: $(action.id+'method').value, params: {}, action: action};
		$(action.id + 'inst').innerHTML='<br/>'+this.getInst(stato);
        
        if(this.simple==true){ //if interface is simple hide microstep's advanced button
        	$(action.id+"aggSopra").style.display='none';
        	$(action.id+"aggSotto").style.display='none';
        }
        
        //this.addCSSBG();
        return action.id;
    };
    
    
    //Update all the required DOM to rename the step
    this.updateSuite = function(suiteName){
      var newSN = prompt("New Step Name?",suiteName);
      if ((!newSN) || (newSN == "")){
        return;
      }

      //make sure it's a legit step's name
      newSN=newSN.trim();
      newSN = newSN.replace(/ /g, "_");
      newSN = newSN.replace(/\./g, "_");
      newSN=newSN.replace(/\:/g,"_");
      newSN=newSN.replace(/,/g,"_");
      var l=newSN.length;
      var temp=newSN.substr(0);
      for (i=1; i<l; i++){
    	if(newSN[i-1]=='_' && newSN[i]=='_')
    		 	temp=temp.substr(0,i-1)+temp.substr(i);
      }
      newSN = temp.substr(0);
      var oldSuite = $(suiteName);  
      var olddesc=tinyMCE.get(suiteName+'descStep').getContent();
      var cut=0;
      var oldUrl=$(oldSuite.id+'Url').value;
      var newSuiteNameCrop='';
      if (newSN.length > 18){
          newSuiteNameCrop = newSN.substr(0, 18) + "...";
          cut=1;
        }
      else if(oldSuite.id.length > 18){
    	  newSuiteNameCrop = newSN;
    	  cut=1;
      }
      tinyMCE.execCommand('mceRemoveControl', false, suiteName+'descStep');
      oldSuite.id = newSN;
      //change all of the old step names
      var re = new RegExp(suiteName, "g"); 
      var header = jQuery("#"+oldSuite.id+" > .suiteHeader"); //access to the element of suiteHeader class, children of the element with old suite id
      jQuery(header).html(header.html().replace(re, newSN));
      if(cut==1) //if the suite name is too long
    	  $(oldSuite.id+'Title').innerHTML=newSuiteNameCrop;
      
      $(oldSuite.id+'Url').value=oldUrl; //restore url of the renamed suite
      tinyMCE.execCommand('mceAddControl', false, newSN+'descStep');
      h=function(){
    	  tinyMCE.get(newSN+'descStep').setContent(olddesc); //restore step's description
      }
      setTimeout("h()",10) //wait loading of the tiny editor which contain step's description
      windmill.ui.currentSuite = newSN;
    };
    
    
    //obtain current step or create new one
    this.getSuite = function(suiteName, newFlag,load) {
    	
        if (typeof(newFlag) == "undefined"){   
          var newFlag = false;
        }
        if (typeof(load) == "undefined"){
            var load = false;
          }
        //If what we really want is a new step, the newFlag was passed
        if (newFlag){
        	if(suiteName==null){ //if name step == null--> default name
        		var suiteName = 'recStep' + windmill.ui.recordSuiteNum;
            }
        	else{ //otherwise new suite with passed name
        		var suiteName = suiteName;
        	}
            windmill.ui.currentSuite = suiteName;
         }
        //if not newFlag
        else {
          //if there's a step selected
          if (windmill.ui.currentSuite){
        	  var suiteName = windmill.ui.currentSuite;
          }
          //default to a new one
          else {
            var suiteName = 'recStep' + windmill.ui.recordSuiteNum;
            windmill.ui.currentSuite=suiteName;
          }
        } 
        var suite = $(suiteName);
        if (suite == null) { //create new step
            var ide = $('ideForm');
            suite = document.createElement('div');
           /* if($('ideForm').hasChildNodes())
            suite.style.borderTop='2px solid black'; */
            suite.className = "suite";
            suite.id = suiteName;
            var templ = new fleegix.ejs.Template({ node: $('suiteHeaderTemplate') });
            //display some of the name
            var suiteNameCrop = suiteName;
            if (suiteNameCrop.length > 18){
              suiteNameCrop = suiteName.substr(0, 18) + "..."
            }
            var suiteHead = templ.process({ data: { suiteName: suiteName, suiteNameCrop: suiteNameCrop} });
            jQuery(suite).html(suiteHead);
            var primasuite=false;
            if(!($('ideForm').hasChildNodes()))
            	primasuite=true;
            //Append the new step to the IDE
            $('ideForm').appendChild(suite);
            if(load==false) //if you are loading a tutorial loads the step's url
            	$(suite.id+'Url').value=windmill.testWin().location.href.replace("/windmill-serv/start.html","");
            	
            var catchEnter = function(e){
            		if (e.keyCode == 13){
            			var index = e.target.id.lastIndexOf("Url"); 
            			var idSuite=e.target.id.substring(0,index); //get suite id
            			windmill.ui.playback.sendPlayBack(idSuite+'Url',idSuite);
                    }
                };
                
            fleegix.event.listen($(suite.id+'Url'), 'onkeypress', catchEnter); //go to the step url if i press enter in its url field
            
            //add editor for step's description
            tinyMCE.execCommand('mceAddControl', false, suiteName+'descStep');
            if(primasuite==false){
            	var allSuite = $('ideForm').childNodes;
            	if(allSuite.length>0){
            		var lastSuite = $(allSuite[allSuite.length-2].id);
            		if(lastSuite.hasChildNodes()){
            			var lastAct = lastSuite.childNodes.length-1;
            			if($(lastSuite.childNodes[lastAct].id+'method')){
            				var metodo = $(lastSuite.childNodes[lastAct].id+'method').value;
            				if(metodo!="waits.forPageLoad"){
            					var wfpl = this.buildAction("waits.forPageLoad", {timeout:20000});
            					lastSuite.appendChild(wfpl);
            					var stato = {method: $(wfpl.id+'method').value, params: {}, action: wfpl};
            					$(wfpl.id + 'inst').innerHTML='<br/>'+this.getInst(stato);
            					if(this.simple==true){
            						$(wfpl.id+"aggSopra").style.display='none';
            						$(wfpl.id+"aggSotto").style.display='none';
            					}
                    
            				 }
            			}
            			else{
            				var wfpl = this.buildAction("waits.forPageLoad", {timeout:20000});
            				lastSuite.appendChild(wfpl);
            				var stato = {method: $(wfpl.id+'method').value, params: {}, action: wfpl};
            				$(wfpl.id + 'inst').innerHTML='<br/>'+this.getInst(stato);
            				if(this.simple==true){
            					$(wfpl.id+"aggSopra").style.display='none';
            					$(wfpl.id+"aggSotto").style.display='none';
            				}
            		
            			}
            		}
                }
             }
            
            //Make the steps and microsteps draggable
            
            jQuery(suite).sortable({items: ".action", axis: "y",
            	start: function(){ for( edId in tinyMCE.editors ) {
            		var id=tinyMCE.editors[edId].id; if(windmill.ui.remote.editorInIDE[id]==undefined || windmill.ui.remote.editorInIDE[id]==null) { if(tinyMCE.get(id)) windmill.ui.remote.editorInIDE[id]=0; else windmill.ui.remote.editorInIDE[id]=1; toggleEditor(id); }}}, stop: function(){
            			for(i in windmill.ui.remote.editorInIDE){
            				if(windmill.ui.remote.editorInIDE[i]==0)
            				toggleEditor(i);
            				windmill.ui.remote.editorInIDE[i]=null;
            			}
            }});
            
            jQuery($('ideForm')).sortable({items:".suite", axis: "y", cancel: '.descStep,.action,.suiteTitleDiv,input,select,option,a,img',
            	start: function(){ for( edId in tinyMCE.editors ) {
            		var id=tinyMCE.editors[edId].id; if(windmill.ui.remote.editorInIDE[id]==undefined || windmill.ui.remote.editorInIDE[id]==null) {if(tinyMCE.get(id)) windmill.ui.remote.editorInIDE[id]=0; else windmill.ui.remote.editorInIDE[id]=1; toggleEditor(id); }}}, stop: function(){
            			for(i in windmill.ui.remote.editorInIDE){
            				if(windmill.ui.remote.editorInIDE[i]==0)
            				toggleEditor(i);
            				windmill.ui.remote.editorInIDE[i]=null;
            			}
            }});  
 
            //minimize the last step
            try {
              var h = $(suite.id).previousSibling.style.height;
              //If the last step is expanded, collapse it
              if (h != '22px') { 
                windmill.ui.toggleCollapse($(suite.id).previousSibling.id); 
              }
            } catch(err) { }
            
        }
        return suite;
    };
    
    
    //used during drag&drop for hide the tinymce editors of the IDE
    this.editorInIDE={};

    //Send the step to save to the backend and receive an url for the user to save
    this.saveSuite = function(id) {
    	
    	var langSI = $('suiteSaveFormat').selectedIndex; 
        var lang = $('suiteSaveFormat')[langSI].value; //get the format to save the step
    	var suite = $(id);
        var testArray = [];
        if (suite.hasChildNodes()){
        	if(suite.childNodes.length==1){ 	//if the step is empty add microstep with method 'highlight' 
        		var oldcurSuite=windmill.ui.currentSuite;
				windmill.ui.currentSuite=suite.id;
        		this.addAction(this.buildAction('highlight', {locators:''}));
        		windmill.ui.currentSuite=oldcurSuite; 		//restore previous current suite
        	}
            for (var j = 1; j < suite.childNodes.length; j++) { 
                var actionObj = {};
                actionObj.suite_name = suite.id;
                actionObj.version = "0.1";

                if ($(suite.childNodes[j].id + 'params') != null) {
                  actionObj.method = $(suite.childNodes[j].id + 'method').value;
                  actionObj.params = eval('(' + $(suite.childNodes[j].id + 'params').value + ')');  //convert a JSON text into an object
                }
                else {
                	var paramsObj = {};
                	var metNode = $(suite.childNodes[j].id + 'method');
					//if we have a select vs a span (1 option)
					if (metNode.tagName.toLowerCase() == "select"){
						var si = $(suite.childNodes[j].id + 'method').selectedIndex;
						actionObj.method = $(suite.childNodes[j].id + 'method')[si].value;
					}																	
					else {														
						actionObj.method = $(suite.childNodes[j].id + 'method').innerHTML;  
						}																			
					paramsObj.uuid = suite.childNodes[j].id;
                    if (windmill.registry.methods[actionObj.method].locator) {
                    	var si = $(suite.childNodes[j].id + 'locatorType').selectedIndex;
                    	paramsObj[$(suite.childNodes[j].id + 'locatorType')[si].value] = $(suite.childNodes[j].id + 'locator').value;
                    }
                    if(actionObj.method=='editorSelect'){
                    	paramsObj['bookmark']=$(suite.childNodes[j].id + 'bookmark').value; 
                	  
                    }
                    if (windmill.registry.methods[actionObj.method].option) {
                    	if(actionObj.method=='editor'){
                    		if(tinyMCE.get(suite.childNodes[j].id + 'option'))
                    			paramsObj['editor']=tinyMCE.get(suite.childNodes[j].id + 'option').getContent();
                    		else
                    			paramsObj['editor']=$(suite.childNodes[j].id + 'option').value; 
                    	}
                    	else{
                    		var optNode = $(suite.childNodes[j].id + 'optionType');
                    		//if we have a select vs a span (1 option)
                    		if (optNode.tagName.toLowerCase() == "select"){
                    			var si = $(suite.childNodes[j].id + 'optionType').selectedIndex;
                    			paramsObj[$(suite.childNodes[j].id + 'optionType')[si].value] = $(suite.childNodes[j].id + 'option').value;
                    		}
                    		else {  //span
                    			paramsObj[$(suite.childNodes[j].id + 'optionType').innerHTML] = $(suite.childNodes[j].id + 'option').value; 
                    		}
                    	}
                    }
                    if(j==1){
  							paramsObj['url']=$(suite.id+'Url').value;
  							paramsObj['descStep']=tinyMCE.get(suite.id+'descStep').getContent();
  							paramsObj['titleTut']=id;
  					}
                    paramsObj['nameStep']=id;
                    paramsObj['description'] = $(suite.childNodes[j].id + 'DescId').value;
                    actionObj.params = paramsObj;
                }
                testArray.push(actionObj);
            }
        	var respRun = function(str){  //open window for save step
        		response = eval('(' + str + ')');
        		window.open(response.result, null, "height=500,width=600,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=1"); 
        		return true;
        	};
        	
        	var jsonObject = new jsonCall('1.1', 'create_save_file');  
            var params_obj = {};
            params_obj.transformer = lang;
            params_obj.suite_name = id;
            params_obj.tests = testArray;
            jsonObject.params = params_obj;
            var jsonString = JSON.stringify(jsonObject); //convert jsonObject in JSON text
            fleegix.xhr.doPost(respRun, '/windmill-jsonrpc/', jsonString);
        }
        else {
          alert('You need microstep to save!');
        }
    };
    
    
    //save entire Tutorial
    this.saveTutorial = function() {  
    	
    	var langSI = $('suiteSaveFormat').selectedIndex;
        var lang = $('suiteSaveFormat')[langSI].value; //get the format to save the step
    	var tutorial = $('ideForm');
        var testArray = [];
        var notCompatible=0;
        if (tutorial.hasChildNodes()){ //if tutorial has Steps
        	for (var j = 0; j < tutorial.childNodes.length; j++) {
            	if(j==tutorial.childNodes.length-1 && lang=='amberjack'){ //I'm in the last step and i want to save in cfg format
            		var namest=''+tutorial.childNodes[j].id;
            		var lastst=$(namest);
            		if(lastst.childNodes.length>1){ //step has one or more microsteps
            			for (var ns = 1; ns < lastst.childNodes.length; ns++){
            			    var metst=$(lastst.childNodes[ns].id + 'method').value;
            				if(metst != 'highlight' && metst.indexOf('waits.')==-1 ) //check if microsteps needs user-interaction in amberjack
            					notCompatible=1;
            			}
            			if(notCompatible==1){
            				var input_box = confirm("For amberjack compatibility the last step can contain only waits and highlight methods.\nIt should be the \'All done!\' step.\n\nDo you want add it automatically?\n  ");
            				if (input_box == true) {
            					var s = windmill.ui.remote.getSuite('All_done',true,false);
            					$(s.id+'Url').value=$(lastst.id+'Url').value
    		        			}
            				else return;
            			}
            		  }
            	   }
        	  }
        	  tutorial = $('ideForm');
              for (var j = 0; j < tutorial.childNodes.length; j++) {
            	    var name=''+tutorial.childNodes[j].id;
            		var suite=$(name);
            		if(suite.hasChildNodes()){ 
            			if(suite.childNodes.length==1){
            				var oldcurSuite=windmill.ui.currentSuite;
            				windmill.ui.currentSuite=suite.id;
                    		this.addAction(this.buildAction('highlight', {locators:''}));
                    		windmill.ui.currentSuite=oldcurSuite;
                    	 }
            			 for (var k = 1; k < suite.childNodes.length; k++) { 
            					var actionObj = {};
            					actionObj.suite_name = suite.id;
            					actionObj.version = "0.1";
            					if ($(suite.childNodes[k].id + 'params') != null) {
            						actionObj.method = $(suite.childNodes[k].id + 'method').value;
            						actionObj.params = eval('(' + $(suite.childNodes[k].id + 'params').value + ')');  //convert a JSON text into an object
            					}
            					else {
            						var paramsObj={};
            						var metNode = $(suite.childNodes[k].id + 'method');
        							//if we have a select vs a span (1 option)
        							if (metNode.tagName.toLowerCase() == "select"){
        								var si = $(suite.childNodes[k].id + 'method').selectedIndex;
        								actionObj.method = $(suite.childNodes[k].id + 'method')[si].value;
        							}																	
            						else {  //span														
    									actionObj.method = $(suite.childNodes[k].id + 'method').innerHTML;	
            						}																			
        							paramsObj.uuid = suite.childNodes[k].id;
        							if (windmill.registry.methods[actionObj.method].locator) {
            							var si = $(suite.childNodes[k].id + 'locatorType').selectedIndex;
            							paramsObj[$(suite.childNodes[k].id + 'locatorType')[si].value] = $(suite.childNodes[k].id + 'locator').value;
            						}
        							
        							if(actionObj.method=='editorSelect')
        								 paramsObj['bookmark']=$(suite.childNodes[k].id + 'bookmark').value;
        							if (windmill.registry.methods[actionObj.method].option) {
                                        if(actionObj.method=='editor'){   
                                        	if(tinyMCE.get(suite.childNodes[k].id + 'option'))
                                        		paramsObj['editor']=tinyMCE.get(suite.childNodes[k].id + 'option').getContent();
                                        	else
                                        		 paramsObj['editor']=$(suite.childNodes[k].id + 'option').value; 
                                         }
                                        else{
                                        	var optNode = $(suite.childNodes[k].id + 'optionType');
                                        	//if we have a select vs a span (1 option)
                                        	if (optNode.tagName.toLowerCase() == "select"){
                                        		var si = $(suite.childNodes[k].id + 'optionType').selectedIndex;
                                        		paramsObj[$(suite.childNodes[k].id + 'optionType')[si].value] = $(suite.childNodes[k].id + 'option').value;
                                        	}
                                        	else {  //span
              									paramsObj[$(suite.childNodes[k].id + 'optionType').innerHTML] = $(suite.childNodes[k].id + 'option').value; 
                                        	}
              						    }
            						  }
        								
        							  if(k==1){
        								  paramsObj['url']=$(suite.id+'Url').value;
        								  paramsObj['descStep']=tinyMCE.get(suite.id+'descStep').getContent();
        								  if($("titTut").value.trim()=='' && lang=='amberjack')  //amberjack tutorial must have a title
        									  paramsObj['titleTut']="Tutorial";
        								  else
        									  paramsObj['titleTut']=$("titTut").value.trim();
        							  }
        							  paramsObj['nameStep']=name;
        							  paramsObj['description'] = $(suite.childNodes[k].id + 'DescId').value;
        							  actionObj.params=paramsObj;
            					 }
            					 testArray.push(actionObj);	
            				}
            		}
 	    
            }
            var respRun = function(str){  //open window for save tutorial
            	response = eval('(' + str + ')');
            	window.open(response.result, null, "height=500,width=600,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=1"); 
            	return true;
            };

            var jsonObject = new jsonCall('1.1', 'create_save_file');  
            var params_obj = {};
            params_obj.transformer = lang;
            if($("titTut").value.trim()!='' && lang=="amberjack")
            	params_obj.suite_name = $("titTut").value.trim();    //for save file using its title (only if saving format is amberjack)
            else
            	params_obj.suite_name = "Tutorial";   //default tutorial name if saving format is javascript or python for forbid error in the names of js functions or py classes.
            params_obj.tests = testArray;
            jsonObject.params = params_obj;
            var jsonString = JSON.stringify(jsonObject); //convert jsonObject in JSON text
            fleegix.xhr.doPost(respRun, '/windmill-jsonrpc/', jsonString);  
        }
       
    };
    
    
    
    // function called when you press load button
    this.loadTutorial = function(filename){
    	windmill.ui.recorder.recordOff();
        windmill.ui.domexplorer.domExplorerOff();
       // windmill.ui.assertexplorer.assertExplorerOff();
        var empty=false
        if($('ideForm').hasChildNodes()==false)
        	empty=true
        var input_box=null
        if(empty==false)
        	input_box = confirm("Are you sure you want to delete all the data in the IDE?");
        if (input_box == true || empty==true) {
        	for( edId in tinyMCE.editors ) { //correctly remove tiny editors from the IDE
                 var id=tinyMCE.editors[edId].id;
                 tinyMCE.execCommand('mceRemoveControl', false, id);
                 }
        	fleegix.fx.fadeOut($('ideForm'));  //form IDE
        	$("titTut").value=''; //reset title's value
        	d = function() {
                $('ideForm').innerHTML = '';
                fleegix.fx.fadeIn($('ideForm'));
        	};
            setTimeout("d()", 800);
            windmill.ui.currentSuite=null;
            var jsonObject = new jsonCall('1.1', 'load_tutorial');  
            var params_obj = {};
            params_obj.suite_name = "Tutorial";
            params_obj.filename = filename;
            jsonObject.params = params_obj;
            
            var respRun = function(str){
            	response = eval('(' + str + ')'); //response.result contain the url of the loaded file
            	return true;
            };

            var jsonString = JSON.stringify(jsonObject); //convert jsonObject in JSON text
            fleegix.xhr.doPost(respRun, '/windmill-jsonrpc/', jsonString);
        }
  };
    
 
  //open the save window and warn if the tutorial is empty
    this.savTutorial = function(){
    	var tutorial = $('ideForm');
    	if (!tutorial.hasChildNodes()){
    	  alert('You need at least a step for save!');
    	return;
    	}
    	windmill.ui.recorder.recordOff();
        windmill.ui.domexplorer.domExplorerOff();
       // windmill.ui.assertexplorer.assertExplorerOff();
        jQuery("#saveTut").dialog('open');
    };
   
    
    
    //add to the microstep the drop-down list with all methods available
    this.getMethods = function(state){
 	
      var reg = windmill.registry;
      var select = document.createElement('select');
      select.className = 'smalloption';
      select.id = state.action.id + 'method';
      if(this.simple==true) 
    	  select.style.visibility='hidden';
      //Setup default method
      var option = document.createElement('option');
      option.value = state.method;
      option.selected = 'selected';
      option.innerHTML += state.method;
      select.appendChild(option);

      //Setup methods option  
      for (var m in reg.methods) {
        var option = document.createElement('option');
        option.value = m;
        option.innerHTML += m;
        var mObj = reg.methods[m];

        if (mObj.section != undefined){ 
        	option.disabled = true; 
        }
        select.appendChild(option);
      }
      var strch=state.action.id+'option';
      select.setAttribute("onchange", "if(tinyMCE.get('"+strch+"')) tinyMCE.execCommand('mceRemoveControl', false, '"+strch+"'); windmill.ui.remote.methodChange('" + state.action.id + "');");
      jQuery(select).tooltip({showURL: false});
      return select;  
    };
    
    
    
    //add to the microstep its options (depends on the method)
    this.getOptions = function(state){
      var reg = windmill.registry;
      var select = document.createElement('select');
      select.className = 'smalloption';
      select.id = state.action.id + 'optionType';
      if(this.simple==true) 
    	  select.style.display='none';
     /* if (reg.methods[state.method].optionIsLocator){
        for (var loc = 0; loc < reg.locator.length;loc++){
          newOpt = document.createElement('option');
          newOpt.value = 'opt'+reg.locator[loc];
          newOpt.innerHTML =  reg.locator[loc];
          if (state.params[newOpt.value]){
            newOpt.selected = 'selected';
            windmill.ui.remote.optionValue = state.params[newOpt.value];
          }
          select.appendChild(newOpt);
        }
      }*/
      if (reg.methods[state.method].option){  //if the options are a comma delimited list, build the drop down
        var optArr = reg.methods[state.method].option.split(',');
        if (optArr.length == 1){ //if there is only one option available
          var spanNode = jQuery(document.createElement('span')).html(optArr[0]);
          spanNode[0].className = "textSpan";
          spanNode[0].id = state.action.id + 'optionType';
          if(this.simple==true) 
        	  spanNode[0].style.display='none';
          return spanNode[0];
        }
        for (var opt = 0; opt < optArr.length; opt++){
          var newOpt = document.createElement('option');
          if (state.params[optArr[opt]]){
            newOpt.selected = true;
          }
          newOpt.value = optArr[opt];
          newOpt.innerHTML = optArr[opt];
          select.appendChild(newOpt);
        }
      }
      else {
        if (reg.methods[state.method].option == false){
          return false;
        }
        var option = document.createElement('option');
        if (typeof(reg.methods[state.method].option) != 'undefined') {
          option.value = reg.methods[state.method].option;
        }
        option.selected = 'selected';
        option.innerHTML += reg.methods[state.method].option;
        select.appendChild(option);
      }
      select.title = "Optional parameters.";
      jQuery(select).tooltip({showURL: false});
      return select;
    };
    
    
    //restore the microstep's locator (used when you load a tutorial)
    this.getLocatorType = function(params){
      var reg = windmill.registry;
      var locator = null;
      //Get the locator from all available
      for (var loc = 0; loc < reg.locator.length; loc++){
       if (params[reg.locator[loc]]){
         locator = reg.locator[loc];
       }
      }
      return locator;
    };
    
    
    // if microstep's method needs locator/s than add the drop-down list with all locators available
    this.getLocators = function(state){
      var _this = windmill.ui.remote;
      var reg = windmill.registry;
      if (!reg.methods[state.method].locator){
        return false;
      }
      
      var locator = _this.getLocatorType(state.params);

      //Setup second select
      var select = document.createElement('select');
      select.className = 'smalloption';
      select.id = state.action.id + 'locatorType';
      if(this.simple==true) 
    	  select.style.display='none';

      var option = document.createElement('option');
      option.selected = 'selected';
      if (locator && state.method!="editor") {
         option.value = locator;
         option.innerHTML += locator;
         select.appendChild(option);
      }
      else if(state.method=="editor" || state.method=="editorSelect"){ //if method is 'editor' or 'editorSelect' the only locator available is 'id'
    	  option.value = "id";
          option.innerHTML +="id&nbsp;&nbsp;&nbsp;&nbsp;";
          select.appendChild(option);
      }

      if(state.method!="editor" && state.method!="editorSelect"){
    	  for (var i = 0; i < reg.locator.length; i++) {
    		  if(locator && reg.locator[i]==locator)
    			  continue
    			  var option = document.createElement('option');
    		  option.value = reg.locator[i];
    		  option.innerHTML += reg.locator[i];
    		  select.appendChild(option);
    	  }
      }
      
      select.title = "Locator used to lookup node.";
      jQuery(select).tooltip({showURL: false});
      return select;
    };
    
    
    //add to the microstep the locator field and if you are loading a tutorial get its value
    this.getLocatorInput = function(state){
      var reg = windmill.registry;
      var _this = windmill.ui.remote;
      var locator = _this.getLocatorType(state.params);
      //Add the text box
      var input = document.createElement('input');
      input.name = 'locValue';
      input.className = 'texta';
      
      //Dont know why I have to do this.. but it wont work if its not setattrib
      if (state.params[locator]) { 
        input.setAttribute('value', state.params[locator]); 
      }
      input.id = state.action.id + 'locator';
      if(this.simple==true) 
    	  input.style.display='none';
      
      //in firefox there was a bug moving the focus to the element we clicked, not sure why
      //but this seems to fix it. 
      if (!windmill.browser.isIE6x) {
        input.setAttribute('onFocus', 'windmill.ui.remote.setRemoteElem(\'' + input.id + '\')');
      }
      
      return input;
    };
    
    
    //add to the microstep the description field and if you are loading a tutorial get its value
    this.getDescriptionInput = function(state){
  
      //Add the text box
      var input = document.createElement('input');
      input.name = 'ValueDesc';
      input.className = 'texta';
      input.title='microstep description'
      
      if (state.params['description']) {
          input.setAttribute('value', state.params['description']); 
        }
      
      input.id = state.action.id + 'DescId';
 
      return input;
    };
    
 
    //add to the microstep the bookmark field and if you are loading a tutorial get its value   
    this.getBookmark = function(state){
    	  
        //Add the text box
        var input = document.createElement('input');
        input.name = 'editBookmark';
        input.className = 'texta';
        input.title='selection bookmark';
        
        if (state.params['bookmark']) {
            input.setAttribute('value', state.params['bookmark']); 
          }
        
        input.id = state.action.id + 'bookmark';
        if(this.simple==true) 
        	input.style.display='none';

        return input;
      };

   
   //add to the microstep the option field and if you are loading a tutorial get its value      
    this.getOptionInput = function(state){
      var reg = windmill.registry;
      if(state.method=='editor'){   
  		var input = document.createElement('textarea');
  		input.style.width='100%';
  	  }else{ 
  		  var input = document.createElement('input');
  		  }
      input.name = 'optValue';
      input.className = 'texta';
            
      //if the action had a special flag, dragDropElemToElem
      /*if (windmill.ui.remote.optionValue != undefined){
        input.setAttribute("value", windmill.ui.remote.optionValue);
        delete windmill.ui.remote.optionValue;
      }*/
      
      //for the command delimited list of options case
      try{ //this was breaking when option is a bool instead of a string
        if(reg.methods[state.method].option.indexOf(',') != -1) { //select
          var opts = reg.methods[state.method].option.split(',');
            for (i=0; i<opts.length; i++){
            	if (state.params[opts[i]]){
            		input.setAttribute("value", state.params[opts[i]]);
            	}
            }
        }
      }
      catch(err){}
      //for the single option case
      if (typeof(state.params[reg.methods[state.method].option]) != 'undefined' && state.method!='editor') {
        input.setAttribute("value", state.params[reg.methods[state.method].option]);
      }

      //give the value input an id
      input.id = state.action.id + 'option';
      if(this.simple==true && state.method!='editor') 
    	  input.style.display='none';
      if (!windmill.browser.isIE6x) {
        input.setAttribute('onFocus', 'windmill.ui.remote.setRemoteElemOption(\'' + input.id + '\')');
      }

      return input;
    };
    
    
    //create the div which represents the microstep
    this.getBaseAction = function(method, params){
      var action = document.createElement('div');
      action.className = "ui-corner-all action";
      action.style.background = "#CCFFFF";
      if (typeof(params) == 'undefined') {
        var params = {};
      }
      if (typeof(params.uuid) == 'undefined') {
        var date = new Date();
        action.id = date.getTime();
      }
      else { 
    	  action.id = params.uuid; 
    	  }
      
      //if the user turns on the option to run actions by hitting enter
      var catchEnter = function(e){
       if (e.keyCode == 13){
         var aid = e.target.id.replace("locator","");
         aid = aid.replace("option", "");
         aid = aid.replace("DescId","");
         aid = aid.replace("bookmark","");
         windmill.ui.playback.sendPlayBack(aid);
       }
      };
      fleegix.event.listen(action, 'onkeypress', catchEnter);
      action.style.border = "3px solid #0099FF";
      return action;
    };
    	  
    
    //This function takes a method and it's params and returns a DOM
    //Element representing that microstep for the UI
    this.buildAction = function(method, params) {
        var _this = windmill.ui.remote;
        var reg = windmill.registry;
        
        //if we just want a blank action
        if (method == null) {
            method = 'click';
            params.id = '';
        }
        
        var action = _this.getBaseAction(method, params);
        
        
      //if i'm loading a tutorial and the last microstep added to the IDE had method 'editor' set its content 
	 // (i do it now because i need to wait the loading of the editor)
        if(windmill.xhr.tempMethod=='editor'){ 
        	if(tinyMCE.getInstanceById(windmill.xhr.tempActId)){
        		h= function(){
        			tinyMCE.get(windmill.xhr.tempActId).setContent(windmill.xhr.tempHtml); 
        		};
        		setTimeout('h()',20);
         		}
        }
        
        //Build the microstep's buttons
        var templ=null;
        var itf=null;
        
        if(this.simple==true) 
        	itf='&nbsp;Edit&nbsp;';
        else 
        	itf='&nbsp;Close&nbsp;';
        templ = new fleegix.ejs.Template({ node: $('actionButtonsTemplate') });
        var buttons = templ.process({ data: { id: action.id, interf: itf } });
        var buttonNode = $elem('span', {className:'buttons'});
        jQuery(buttonNode).html(buttons);
        var state = {method: method, params: params, action: action};
        
        //Get all the form elements for microstep
        var methods = _this.getMethods(state);
        var locators = _this.getLocators(state);
        var options = _this.getOptions(state);
        var locatorInput = _this.getLocatorInput(state);
        var optionInput = _this.getOptionInput(state);
        var description = _this.getDescriptionInput(state);
        var bm=_this.getBookmark(state);
        
        //add methods and buttons
        jQuery(action).append(jQuery(methods));
        jQuery(action).append(jQuery(buttonNode));
        
       //add span for microstep descriptive writing          	
        var inst=jQuery(document.createElement('span')).addClass("textSpan").attr('id',action.id+'inst');
        if(this.simple==false || state.method=="editor")
    		inst.hide();
        jQuery(action).append(inst);
        
        //add empty paragraph (only aesthetics)
        var spazio=jQuery(document.createElement('p')).addClass("textSpan").attr('id',action.id+'vuoto');
        if(this.simple==false || state.method=="editor")
        	spazio.hide();
        jQuery(action).append(spazio);
         
        //if this microstep has locators, add them in a container
        if (locators){
          var locCont = document.createElement('div');
          locCont.appendChild(locators)
          locCont.appendChild(locatorInput);
          jQuery(action).append(jQuery(locCont));
        }
        
        //if method is 'highlight' add explanation writing showed in advanced interface
        if(method=="highlight"){
            var highloc = document.createElement('div');
            var highloctext=jQuery(document.createElement('span')).html('Use the DOM Explorer for select the amberjack highlighted locators').addClass("textSpan").attr('id',action.id+'locHighlight');
            if(this.simple==true)
            	highloctext.hide();
            jQuery(highloc).append(highloctext)
            jQuery(action).append(jQuery(highloc));
            }
        
        
        //if this action has options, add them in a container
        if (options){
          var optCont = document.createElement('div');
          optCont.appendChild(options);
         
          //if its a string not a drop down: only one option
          if (options.tagName.toLowerCase() != "select"){
        	var colon=jQuery(document.createElement('span')).html(': ').addClass("textSpan").attr('id',action.id+'colon');
        	if(this.simple==true)
        		colon.hide();
            jQuery(optCont).append(colon);
          }
          jQuery(optCont).append(jQuery(optionInput));
          
          if(method=='editor'){ //link for hide/show editor (if you hide editor you can see the html code of its content)
              var myLink = document.createElement('a');
              myLink.setAttribute('href',"javascript:toggleEditor('"+action.id+"option');");
              myLink.innerHTML ="Hide/Show editor";
              optCont.appendChild(myLink);
              }
          //append options
          jQuery(action).append(jQuery(optCont));
        } 
        
        
        //if method is 'editorSelect' than add bookmark
        if(method=="editorSelect"){
        	var ebookmark = document.createElement('div');
        	var editortext=jQuery(document.createElement('span')).html('bookmark: ').addClass("textSpan").attr('id',action.id+'bookMtext');
        	if(this.simple==true)
        		editortext.hide();
        	jQuery(ebookmark).append(editortext)
        	ebookmark.appendChild(bm);
        	jQuery(action).append(jQuery(ebookmark));
        }
        
        
        //add description field
         var descCont = document.createElement('div');
         jQuery(descCont).append(jQuery(document.createElement('span')).html('description: ').addClass("textSpan"));
         descCont.appendChild(description);
         jQuery(action).append(jQuery(descCont));
          
    
         return action;
    };
};