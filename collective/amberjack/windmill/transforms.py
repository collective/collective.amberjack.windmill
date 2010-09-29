import os
import windmill
import ConfigParser

class OrderedConfigParser(ConfigParser.RawConfigParser):

    def _ajcmp(self, x, y):
        
        if(x=='amberjack' or (x.split('_',2)[1][0]).isdigit()):
            x2=x.split('_')
        else:
            x2=x.split('_',1)
        if(y=='amberjack' or (y.split('_',2)[1][0]).isdigit()):
            y2=y.split('_')
        else:
            y2=y.split('_',1)
        xlen = len(x2)
        ylen = len(y2)
        if xlen > ylen:
            for i in range(xlen-ylen):
                y2.insert(-1, '')
        else:
            for i in range(ylen-xlen):
                x2.insert(-1, '')
        return cmp(x2, y2)

    def write(self):
        """Write an .ini-format representation of the configuration state."""
        stri="";
        if self._defaults:
            stri+="[%s]\n" % DEFAULTSECT
            for (key, value) in self._defaults.items():
                stri+="%s = %s\n" % (key, str(value).replace('\n', '\n\t'))
            stri+="\n"
        keys = self._sections.keys()
        keys.sort(self._ajcmp)
        for section in keys:
            stri+="[%s]\n" % section
            for (key, value) in self._sections[section].items(): 
                if key != "__name__":
                    if key!='steps' and key!='microsteps' and key!='validators':     #insert editor formatting on the same line
                        stri+="%s = %s\n" % (key, str(value).replace('\n', ''))
                    else:
                        stri+="%s = %s\n" % (key, str(value).replace('\n', '\n\t'))
            stri+="\n"
        return stri

class Converter:

    def __init__(self, tourId, tour):
        self.tourId = tourId
        self.tour = tour
        self.config = OrderedConfigParser()
        
    def convertTour(self):
        if not self.tour:
            return
        count=1
        assoc={}
        title=''
        sandboxUrl=''
        ploneSite=''
        validators=''
        strName=None
        for step in self.tour:
            for k, v in step.items():
                if (k=='params'):
                    for key,val in step['params'].items():
                        if(key=='titleTut'):
                            title=val  #tutorial title
                        elif(key=='SandboxBase'):
                            sandboxUrl=val
                        elif(key=='PloneSiteUrl'):
                            ploneSite=val
                        elif(key=='validators'):
                            validators=val
            if(step['params']['nameStep']!=strName):
                assoc[step['params']['nameStep']]=count
                strName=step['params']['nameStep']
            count+=1 #microstep number
                        
        dec=1 
        c=0                                            
        self.config.add_section('amberjack')
        self.config.set('amberjack', 'title', title)
        if(ploneSite!=''):
            self.config.set('amberjack', 'starturl', ploneSite)
        if(sandboxUrl!=''):
            self.config.set('amberjack', 'sandboxurl', sandboxUrl)
        if(validators!=''):
            section_validators = ['']
            arr_validators=validators.split(';');
            for vt in arr_validators:
                section_validators.append(vt.strip())
            self.set('amberjack', 'validators', section_validators)
        section_steps = ['']
        for step in self.tour:
            if(assoc[step['params']['nameStep']]==dec):
                step_name = self._step_name(step, c)
                section_steps.append(step_name)
                self.convert_step(step, c)
                c+=1
            dec+=1

        self.set('amberjack', 'steps', section_steps)
        return self.config.write()
     

    def _step_name(self, step, step_no):
        return '%s_%s' % (step_no, step['params']['nameStep'])

    def _microstep_name(self, step_no, i):
        return '%s_%s_microstep' % (step_no, i)

    def convert_step(self, step, step_no):
        step_name = self._step_name(step, step_no)
        self.config.add_section(step_name)
        self.config.set(step_name, 'blueprint', 'collective.amberjack.blueprints.step')
        nomeSt=step['params']['nameStep'];
        i=0
        section_microsteps = ['']
        for st in self.tour:
            if(st['params']['nameStep']==nomeSt):
                try:
                    stringDesc=st['params']['descStep']
                    self.config.set(step_name, 'text', stringDesc) 
                    urlStep=st['params']['url']
                    self.config.set(step_name, 'url', urlStep) 
                except:
                    pass
                microstep_name = self._microstep_name(step_no, i)
                i+=1
                section_microsteps.append(microstep_name)
                self.convert_microstep(st, microstep_name)
                continue
   
        if section_microsteps != ['']:
            self.set(step_name, 'microsteps', section_microsteps)
        sr=(step_name.split('_',1)[-1]).replace('_',' ')
        sr=sr[0].upper()+sr[1:]
        self.set(step_name,'title',sr)
            

    def convert_microstep(self, microstep, microstep_name):
        self.config.add_section(microstep_name)
        self.config.set(microstep_name, 'blueprint', 'collective.amberjack.blueprints.windmillmicrostep')
        self.set(microstep_name,'method', microstep['method'])
        primo = True
        selector='{'
        text='{'
        for k, v in microstep['params'].items():
            if(k=='titleTut'):
                continue
            if(k=='descStep'):
                continue
            if(k=='url'):
                continue
            if(k=='nameStep'):
                continue
            if(k=='SandboxBase'):
                continue
            if(k=='PloneSiteUrl'):
                continue
            if(k=='validators'):
                continue
            if(k=='description'):
                self.set(microstep_name,'description',v)  
                continue
            if(k=='condition'):
                self.set(microstep_name,'condition',v)
                continue
            if(k=='locators'):  #highlight method
               if (v==''):
                        continue
               allLoc=v.split(',')
               lung=len(allLoc)
               cont=1
               for l in allLoc:
                   loctype=(l.split(':')[0]+'').strip()
                   selector+='"'+(l.split(':',1)[1]).strip()+'" : '+"'"+loctype+"'"
                   if cont==lung:
                       break
                   else:
                       selector+=', '
                       cont+=1
            elif(k=='id' or k=='link' or k=='value' or k=='xpath' or k=='jsid' or k=='name' or k=='classname' or k=='tagname' or k=='label' or k=='jquery'):
                selector+='"'+v+'" : '+"'"+k+"'"
            else:
                 if(primo==True):
                            if(k=='bookmark'):
                                text+="'"+k+"' : '"+v+'\''
                            else:    
                                text+="'"+k+"' : "+'"'+v.replace('"','\\"')+'"'
                            primo=False
                 else:
                      if(k=='bookmark'):
                                text+=", '"+k+"' : '"+v+'\''
                      else: 
                          text+=", '"+k+"' : "+'"'+v.replace('"','\\"')+'"'
            
        selector+='}'
        text+='}'
        if selector!= '{}':   
            self.set(microstep_name,'selector',selector)
        if text!= '{}':     
            self.set(microstep_name,'text',text)

    def set(self, section, k, v):
        if hasattr(v, '__iter__'):
            if ''.join(v).strip():
                self.config.set(section, k, '\n'.join(v))
        elif v.strip():
           self.config.set(section, k, v)
        elif k=='description':
            self.config.set(section, k, v)

    
def build_amberjack_test_file(tests, suite_name=None):
    """Build the cfg file"""
    ts = '# Generated by amberjack_converter\n'
    convertito=Converter(suite_name,tests)
    ts += '\n' + Converter.convertTour(convertito)
    return ts
    
def create_amberjack_test_file(suite_name, tests, location=None):

    """Transform and create and build the python test file"""
    if location is None: 
        location = os.path.join(windmill.settings['SAVES_PATH'], suite_name+'.cfg')
    f = open(location, 'w')
    f.write(build_amberjack_test_file(tests, suite_name.split('.')[0]))
    f.flush()
    f.close()
    return windmill.authoring.transforms.get_save_url(suite_name, 'cfg')




