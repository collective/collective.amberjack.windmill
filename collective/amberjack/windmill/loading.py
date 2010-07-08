#loading tutorial from the IDE

import windmill
import os
import ConfigParser
#import Tkinter as tk
#import tkFileDialog


def load_tutorial(self,suite_name,filename):
    """
    "root = tk.Tk()
    root.withdraw()
    options={}
    options['filetypes'] = [('all files', '.*'), ('text files', '.txt')]
    options['initialdir'] = 'C:\\'
    options['initialfile'] = 'myfile.txt'
    options['parent'] = root
    options['title'] = 'This is a title'
    tkFileDialog.askopenfilename()"
    root.destroy()"
    """
    ext=filename.split('.')[-1]
    if ext=='py':    #python file
        windmill.bin.shell_objects.do_test(filename, load=True)
    elif ext=='cfg': #amberjack file
        filecfg='#Generated by amberjack transformer\n'
        filecfg+='from windmill.authoring import WindmillTestClient\n\n'
        filecfg+='def test_'+suite_name+'():\n'
        filecfg+='\tclient = WindmillTestClient(__name__)\n\n'
        config = ConfigParser.ConfigParser()
        config.read(filename)
        steps=[]
        step={}
        microsteps={}
        microstep={}
        descStep={}
        urlStep={}
        stepNameMic={}
        title=''
        i=0
        steps=config.get("amberjack","steps")
        title=config.get("amberjack","title")
        st=''
        for ch in steps:
            if(ch=='\n'):
                if(st==''):
                    continue
                step[str(i)]=st
                i+=1
                st=''
                continue
            st+=ch
        step[str(i)]=st
        noMic={}
        micr=''
        num=0
        for k in range(0, i+1):
            nomicro=0
            try:
                microsteps=config.get(step[str(k)],"microsteps")
                for n in range(0, len(microsteps.split())):
                    stepNameMic[microsteps.split()[n]]=step[str(k)]      
            except:
                nomicro=1
                noMic[str(num)]=step[str(k)]
                num+=1
            try:
                descStep[str(k)]=config.get(step[str(k)],"text")
            except:
                descStep[str(k)]=''
            try:
                urlStep[str(k)]=config.get(step[str(k)],"url")
            except:
                urlStep[str(k)]=''
            if nomicro==0:
                for ch in microsteps:
                    if(ch=='\n'):
                        if(micr==''):
                            continue
                        microstep[str(num)]=micr
                        num+=1
                        micr=''
                        continue
                    micr+=ch
                microstep[str(num)]=micr
                num+=1
                micr=''
        param={}
        h=0
        oldNamestep='' 
        for j in range(0, num):
            old_style=False
            selector=None
            text=None
            if(noMic.has_key(str(j))):
                filecfg+='\tclient.highlight(nameStep=u\''+noMic[str(j)].split('_',1)[-1]+'\', url='+repr(urlStep[str(h)])+', descStep='+repr(descStep[str(h)])+', locators=u\'\', description=u\'\')\n'
                oldNamestep=noMic[str(j)].split('_',1)[-1]
                h+=1
                continue
            try:
                metodo=config.get(microstep[str(j)], "method")
                
                # This control is only for load amberjack old-style tutorials
                if(metodo!='click' and metodo!='waits.forPageLoad' and metodo!='waits.forElement' and  metodo!='waits.sleep' and  metodo!='select' and  metodo!='check' and metodo!='radio' and
                    metodo!='type' and  metodo!='highlight' and  metodo!='editor' and  metodo!='editorSelect'):
                        old_style=True   
                        metodo='click';
                        
            except:
                metodo="highlight"
            filecfg+='\tclient.'+metodo+'('
            k=0
            if(j==0):
                filecfg+="titleTut=u\""+title+"\""
                k=1
            add=0
            
            try:
                selector = eval(config.get(microstep[str(j)], "selector"))
            except:
                pass
            try:
                text = eval(config.get(microstep[str(j)], "text"))
            except:
                pass
            if k==0:
                    if(stepNameMic[microstep[str(j)]].split('_',1)[-1]==oldNamestep):
                        filecfg+="nameStep"+"=u\""+stepNameMic[microstep[str(j)]].split('_',1)[-1]+"\""
                    else:
                        filecfg+="nameStep"+"=u\""+stepNameMic[microstep[str(j)]].split('_',1)[-1]+"\""+", descStep=u"+repr(descStep[str(h)])+", url=u"+repr(urlStep[str(h)])
                        oldNamestep=stepNameMic[microstep[str(j)]].split('_',1)[-1]
                        h+=1
                    k=1
            else:
                     if(stepNameMic[microstep[str(j)]].split('_',1)[-1]==oldNamestep):
                        filecfg+=", nameStep"+"=u\""+stepNameMic[microstep[str(j)]].split('_',1)[-1]+"\""
                     else:
                        filecfg+=", nameStep"+"=u\""+stepNameMic[microstep[str(j)]].split('_',1)[-1]+"\""+", descStep=u"+repr(descStep[str(h)])+", url=u"+repr(urlStep[str(h)])
                        oldNamestep=stepNameMic[microstep[str(j)]].split('_',1)[-1]
                        h+=1
            if old_style==True :
                    filecfg+=", id=u\""+config.get(microstep[str(j)], "method")+"\""
           
            description=''            
            try:
                description=config.get(microstep[str(j)], "description")
            except:
                pass
            filecfg+=", description=u"+repr(description)
            if selector != None:
                 if metodo=='highlight':
                     strloc=''
                     cont=0;
                     for s,v in selector.items():
                         if cont!=0:
                             strloc+=', '
                         strloc+=v+" : "+s
                         cont+=1
                     filecfg+=', locators=u'+repr(strloc)
                 else:
                     for s,v in selector.items():
                         filecfg+=', '+v+"=u"+repr(s)
            if text != None:            
                for s,v in text.items():
                   filecfg+=', '+s+"=u"+repr(v)    
            filecfg+=')\n'
                      
        windmill.authoring.transforms.create_saves_path()
        location = os.path.join(windmill.settings['SAVES_PATH'], suite_name+'.py')
        f = open(location, 'w')
        f.write(filecfg)
        f.flush()
        f.close()
        windmill.bin.shell_objects.do_test(location, load=True)        
       # microsteps[step]=config.get(step,"microsteps")
       # for microstep in microsteps[step]:
       #     pass

    elif ext=='js': #javascript files
        
        filecfg='#Generated by javascript transformer\n'
        filecfg+='from windmill.authoring import WindmillTestClient\n\n'
        filecfg+='def test_'+suite_name+'():\n'
        filecfg+='\tclient = WindmillTestClient(__name__)\n\n'
        f=open(filename,"r");
        for line in f:
            if line.lstrip()[0]=='{':
                first=True
                line=line.rstrip().rstrip(',')
                microstep=eval(line)                    
                filecfg+='\tclient.'+microstep['method']+'('
                for k in microstep['params']:
                    v=microstep['params'][k]
                    if first==True:
                       first=False
                    else:
                        filecfg+=', '
                    filecfg+=k+'=u'+repr(v)      
                filecfg+=')\n'
        
        windmill.authoring.transforms.create_saves_path()
        location = os.path.join(windmill.settings['SAVES_PATH'], suite_name+'.py')
        f = open(location, 'w')
        f.write(filecfg)
        f.flush()
        f.close()
        windmill.bin.shell_objects.do_test(location, load=True) 
    else:
        print 'error in file extension' 
        pass
    return filename
      