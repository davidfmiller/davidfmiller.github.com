/* jshint undef: true,strict:true,trailing:true */
/* global YUI,document,window,Image */

YUI.add('screen',function(Y){'use strict';var Screen,_bridge,i,prefix,extensions=['webkit','moz','o','ms','khtml'],CLASSNAME='rmr-screen';_bridge={prefix:'',supported:false,isFullScreen:function(){return false;},exit:function(){},request:function(){},eventName:null};if(typeof document.cancelFullScreen!='undefined'){_bridge.supported=true;}else{for(i=0;i<extensions.length;i++){prefix=extensions[i];if(typeof document[prefix+'CancelFullScreen']!='undefined'){_bridge.supported=true;_bridge.prefix=prefix;break;}}}if(_bridge.supported){Y.one('body').addClass('rmr-screenable');_bridge.eventName=_bridge.prefix+'fullscreenchange';_bridge.request=function(node){return!prefix?node._node.requestFullScreen():node._node[prefix+'RequestFullScreen']();};_bridge.exit=function(node){return!prefix?document.cancelFullScreen():document[prefix+'CancelFullScreen']();};_bridge.isFullScreen=function(){var r=null;switch(prefix){case'webkit':r=document.webkitIsFullScreen;break;default:if(document.hasOwnProperty('fullScreen')){r=document.fullScreen;}else if(document.hasOwnProperty('fullscreen')){r=document.fullscreen;}r=document[prefix+'FullScreen'];}return r;};}Screen=function(config){Screen.superclass.constructor.apply(this,arguments);if(!_bridge.supported){return false;}this.set('node',config.hasOwnProperty('node')?config.node:document.body);var $=this;if(!this.get('node')){return null;}this.set('listener',function(e){if($.isFullScreen()){$.fire('fullscreen');Y.one(e.target).addClass(CLASSNAME);}else{$.fire('exit');$.get('node').removeClass(CLASSNAME);}});this.get('node')._node.addEventListener(_bridge.eventName,this.get('listener'));};Screen.ATTRS={'node':{setter:function(node){var n=Y.one(node);if(!n){return null;}return n;},writeOnce:true},'listener':{}};Y.Screen=Y.extend(Screen,Y.Base,{isFullScreen:function(){return _bridge.isFullScreen();},isSupported:function(){return _bridge.supported;},toggle:function(){return this.isFullScreen()?this.exit():this.request();},request:function(){var n=this.get('node');if(!n){return false;}_bridge.request(n);return this;},exit:function(){_bridge.exit();return this;},toString:function(){return'Screen <'+this.get('node')+'>';},destructor:function(){if(this.get('node')){this.get('node')._node.removeEventListener(_bridge.eventName,this.get('listener'));this.set('node',null);}},NAME:'screen'});},'3.3.1',{requires:['node','event','base']});

YUI.add('backdrop',function(Y){'use strict';var Backdrop=function(config){Backdrop.superclass.constructor.apply(this,arguments);this.set('url',config.hasOwnProperty('url')?config.url:null);this.set('id',config.hasOwnProperty('id')?config.id:null);this.set('duration',config.hasOwnProperty('duration')?config.duration:null);this.set('styles',config.hasOwnProperty('styles')?config.styles:null);if(this.get('url')){this.drop();}return this;},DEFAULT_STYLES={'color':'transparent','position':'top left','repeat':'no-repeat','attachment':'fixed','size':'auto'};Backdrop.ATTRS={url:{value:null},id:{value:null,setter:function(id){return id||'backdrop';},writeOnce:true},styles:{value:null},duration:{value:1,setter:function(i){return(i?parseFloat(i,10):1);}}};Y.Backdrop=Y.extend(Backdrop,Y.Base,{destructor:function(){this.set('id',null);this.set('duration',null);this.set('url',null);this.set('styles',null);},_applyStyles:function(node,styles){for(var s in styles){if(styles.hasOwnProperty(s)){node.setStyle('background'+s.charAt(0).toUpperCase()+s.substr(1),styles[s]);}}},drop:function(config){if(typeof config==='string'){this.set('url',config);this.set('styles',null);}else if(config){if(config.hasOwnProperty('url')){this.set('url',config.url);}if(config.hasOwnProperty('duration')){this.set('duration',config.duration);}this.set('styles',config.hasOwnProperty('styles')?config.styles:null);}var img=new Image(),o={};o.$=this;o.node=Y.Node.create('<div id="'+this.get('id')+'"></div>');img.onload=function(){Y.one('body').append(o.node);var s=Y.merge(DEFAULT_STYLES,o.$.get('styles'));o.$.fire('start',this.src);s.image='url('+this.src+')';o.$._applyStyles(o.node,s);o.$.resize();o.node.transition({'opacity':1,'duration':o.$.get('duration')},function(){o.$.fire('end',o.$.get('url'));var styles=Y.merge(DEFAULT_STYLES,o.$.get('styles')),body=Y.one('body');styles.image='url('+img.src+')';o.$._applyStyles(body,styles);o.node.remove();});Y.on('windowresize',function(){o.$.resize();});};img.src=this.get('url');return this;},resize:function(){var body=Y.one(document.body),region=null,node=Y.one('#'+this.get('id'));body.setStyle('minHeight',body.get('winHeight')+'px');region=body.get('region');if(node){node.setStyles({'width':region.width+'px','height':region.height+'px'});}return this;},toString:function(){return'[Backdrop]';}});},'3.3.1',{requires:['node','base','event','event-resize','transition']});

YUI.add("popover",function(e){"use strict";var t={},n={},r=10,i=function(e){i.superclass.constructor.apply(this,arguments)};i.ATTRS={node:{value:null,setter:function(t){return e.one(t)},writeOnce:true}};e.Popover=e.extend(i,e.Base,{initializer:function(r){if(!this.get("node")){return false}e.one(this.get("node")).all("[data-popover]").each(function(i){if(!i.get("id")){i.set("id",e.guid())}var s=i,o=function(s){i.set("title","");var o={id:arguments[1].get("id")+"-popover",content:""},a=null,f=[0,0],l=null,c=null,h=null,p=s.target.get("id"),d=s.target.getXY(),v=null;o=e.merge(r.defaults,o);try{a=e.JSON.parse(s.target.getAttribute("data-popover"))}catch(m){a={content:s.target.getAttribute("data-popover")}}a=e.merge(o,a);if(!a.orientation){a.orientation="vertical"}if(!a.margin){a.margin=10}if(t[a.id]){if(n[p]){n[p].cancel();delete n[p]}return}l=a.orientation=="vertical"?"top":"right";c=e.Node.create('<div id="'+a.id+'" role="tooltip" class="rmr-popover '+l+" "+(a.hasOwnProperty("class")?a["class"]:"")+'"><b></b><div class="bd">'+(a.content?a.content:"")+"</div></div>");e.one(document.body).append(c);h=c.one("> b");i.setAttribute("aria-describedby",a.id);v=c.get("region");switch(a.orientation){case"vertical":if(v.top-v.height<0){c.replaceClass("top","bottom");f[1]=s.target.get("region").height+a.margin}else{f[1]=-v.height-5}if(a.color){h.setStyle("borderTopColor",a.color);h.setStyle("borderBottomColor",a.color)}break;case"horizontal":f[0]=s.target.get("region").width+a.margin;f[1]=(s.target.get("region").height-v.height)/2;if(a.color){h.setStyle("borderRightColor",a.color);h.setStyle("borderLeftColor",a.color)}break}c.setXY([d[0]+f[0],d[1]+f[1]]);if(c.getXY()[1]<0){c.setXY([c.getXY()[0],10]);v=c.get("region")}if(a.orientation=="horizontal"){h.setXY([h.getXY[0],i.get("region").top+i.get("region").height/2-5])}else{h.setXY([c.getXY()[0]+Math.min(i.get("region").width,c.get("region").width)/2-5,h.getXY()[1]])}if(a.persist){c.on("mouseenter",function(e,t){t=t[0];if(n[t]){n[t].cancel();delete n[t]}},null,[i.get("id")])}c.on("mouseleave",function(e){u.call(this,i.get("id"))},null);c.addClass("pop");t[c.get("id")]=c;e.fire("popover:pop",{node:s.target})},u=function(o){var u=null;try{u=e.JSON.parse(e.one("#"+(typeof o=="string"?o:o.target.get("id"))).getAttribute("data-popover"));u=e.merge(r.defaults,u)}catch(a){u=r.defaults}n[i.get("id")]=e.later(u.persist?300:1,null,function(r,i){var s=r+"-popover",o=null;try{o=e.JSON.parse(e.one("#"+r).getAttribute("data-popover"))}catch(u){o={}}if(o&&o.id){s=o.id}delete n[s];if(t[s]){e.one("#"+r).removeAttribute("aria-describedby");try{t[s].remove();delete t[s];delete n[s]}catch(a){}e.fire("popover:unpop",{node:e.one("#"+r)})}},[i.get("id"),s],false)};i.on("mouseenter",o,null,i);i.on("focus",o,null,i);i.on("mouseleave",u);i.on("blur",u)});return this},destructor:function(){this.set("node",null)},toString:function(){return"[Popover]"}})},"3.3.1",{requires:["node","base","event","json-parse","event-resize","transition"]});

YUI().use(function(Y) {

  'use strict';

  if (Y.UA.mobile) { return false; }

  Y.use('backdrop', 'screen', 'popover', 'node-focusmanager', function(Y) {

    var dropper = new Y.Backdrop({
      'id' : 'backdrop',
      'duration' : 0.5
    }),
    styles = {
      'backdrop' : {},
      'chinatown' : { 'repeat' : 'repeat-y' },
      'evs' : { 'color' : '#fff', 'position' : 'bottom right' },
      'kaos' : { 'position' : '370px top', 'color' : '#000' },
      'ubc' : { 'position' : 'right bottom', 'color' : '#000' },
      'bodhisattva' : { 'position' : 'right bottom', 'color' : '#fff' },
      'stream' : { 'position' : '400px top', 'color' : '#fff' },
      'moma' : { 'position' : 'right top', 'color' : '#000' },
      'lacma' : { 'position' : 'right center', 'color' : '#000' },
      'getty' : { 'position' : 'left bottom', 'color' : '#000' },
      'vegas' : { 'color' : '#000', 'position' : 'right top' },
      'rmr' : { 'color' : '#a2a2a2', 'position' : 'center center' }
    },
    parser = function(path) { return path.replace(/^.*[\/\\]/g, '').split(".")[0]; },
    body = Y.one(document.body),
    doc = Y.one('#doc'),
    screen = new Y.Screen({ 'node': body }),
    input = null,
    hash = document.location.hash ? document.location.hash.replace('#', '') : null,
    first = (hash && styles.hasOwnProperty(hash) ? Y.one('ol li.' + hash + ' a') : Y.one('ol li a')).getAttribute('href'),
    bg = function(n) {
      var cls = parser(n.getAttribute('href'));
      document.location = '#' + cls;
      if (! doc.hasClass(cls)) {
        dropper.drop({ 'url' : n.getAttribute('href'), 'styles' : styles[cls] });
      }
    },
    toggle = null,
    title = 'Toggle fullscreen',
    resizer = function() { Y.one('#doc').setStyle('minHeight', (Y.one(document.body).get('winHeight') - 150) + 'px'); };

    new Y.Popover({ node : '#doc', defaults : { persist: true, 'orientation': 'horizontal', 'color': '#000', 'margin': 20, 'exclusive' : false } });

    Y.on('windowresize', resizer);
    resizer();

    dropper.on('start', function(e) {
      var bg = parser(e.details[0]);
      doc.set('className', bg);
      Y.all('ol li').removeClass('active');
      Y.one('ol li.' + bg).addClass('active');
    });

    dropper.drop({'url' : first, 'styles' : styles[parser(first)] });

    Y.all('ol li a').on('click', function(e) {
      e.halt();
      bg(e.target.ancestor('a', true));
    });

    /* left/right keys */
    Y.one('body').on('key', function(e) {

      if (e.altKey || e.ctrlKey) { return; }

      var current = Y.one('li.active'),
          target = null;

      if (e.charCode == 39) { // next 
        target = current.next();
        if (! target) { target = current.ancestor('ol').one('li'); }
      } else if (e.charCode == 37) { // prev
        target = current.previous();
        if (! target) { target = current.ancestor('ol').all('li').pop(); }
      }

      bg(target.one('a'));

    }, 'down:37,39');

    /* screen */
    if (screen.isSupported()) {
      toggle = function() { screen.toggle(); };
      input = Y.Node.create('<button title="' + title + '" class="zoom">' + title + '</button>');
      Y.one('section.zoom').append(input);
      input.on('click', toggle);
      Y.on('key', toggle, body, 'f');
    }

    /* focus manager */
    Y.all('#doc section section').each(function(n) {
      n.plug(Y.Plugin.NodeFocusManager, {
        descendants: 'a, button',
        keys: {
          next: 'down:40',
          previous: 'down:38'
        }
      });
    });

    Y.one(document.body).on('key', function(e) {

      var code = e.keyCode,
          li = null;

      code = code == 48 ? 9 : code - 49;
      li = Y.all('ol li');
      if (li.size() <= code) { return; }
      bg(li.item(code).one('a'));

    }, '48,49,50,51,52,53,54,55,56,57');

  });
});
