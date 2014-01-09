/* jshint undef: true,strict:true,trailing:true */
/* global YUI,document,window,Image */

YUI.add('screen',function(Y){'use strict';var Screen,_bridge,i,prefix,extensions=['webkit','moz','o','ms','khtml'],CLASSNAME='rmr-screen';_bridge={prefix:'',supported:false,isFullScreen:function(){return false;},exit:function(){},request:function(){},eventName:null};if(typeof document.cancelFullScreen!='undefined'){_bridge.supported=true;}else{for(i=0;i<extensions.length;i++){prefix=extensions[i];if(typeof document[prefix+'CancelFullScreen']!='undefined'){_bridge.supported=true;_bridge.prefix=prefix;break;}}}if(_bridge.supported){Y.one('body').addClass('rmr-screenable');_bridge.eventName=_bridge.prefix+'fullscreenchange';_bridge.request=function(node){return!prefix?node._node.requestFullScreen():node._node[prefix+'RequestFullScreen']();};_bridge.exit=function(node){return!prefix?document.cancelFullScreen():document[prefix+'CancelFullScreen']();};_bridge.isFullScreen=function(){var r=null;switch(prefix){case'webkit':r=document.webkitIsFullScreen;break;default:if(document.hasOwnProperty('fullScreen')){r=document.fullScreen;}else if(document.hasOwnProperty('fullscreen')){r=document.fullscreen;}r=document[prefix+'FullScreen'];}return r;};}Screen=function(config){Screen.superclass.constructor.apply(this,arguments);if(!_bridge.supported){return false;}this.set('node',config.hasOwnProperty('node')?config.node:document.body);var $=this;if(!this.get('node')){return null;}this.set('listener',function(e){if($.isFullScreen()){$.fire('fullscreen');Y.one(e.target).addClass(CLASSNAME);}else{$.fire('exit');$.get('node').removeClass(CLASSNAME);}});this.get('node')._node.addEventListener(_bridge.eventName,this.get('listener'));};Screen.ATTRS={'node':{setter:function(node){var n=Y.one(node);if(!n){return null;}return n;},writeOnce:true},'listener':{}};Y.Screen=Y.extend(Screen,Y.Base,{isFullScreen:function(){return _bridge.isFullScreen();},isSupported:function(){return _bridge.supported;},toggle:function(){return this.isFullScreen()?this.exit():this.request();},request:function(){var n=this.get('node');if(!n){return false;}_bridge.request(n);return this;},exit:function(){_bridge.exit();return this;},toString:function(){return'Screen <'+this.get('node')+'>';},destructor:function(){if(this.get('node')){this.get('node')._node.removeEventListener(_bridge.eventName,this.get('listener'));this.set('node',null);}},NAME:'screen'});},'3.3.1',{requires:['node','event','base']});

YUI.add('backdrop',function(Y){'use strict';var Backdrop=function(config){Backdrop.superclass.constructor.apply(this,arguments);this.set('url',config.hasOwnProperty('url')?config.url:null);this.set('id',config.hasOwnProperty('id')?config.id:null);this.set('duration',config.hasOwnProperty('duration')?config.duration:null);this.set('styles',config.hasOwnProperty('styles')?config.styles:null);if(this.get('url')){this.drop();}return this;},DEFAULT_STYLES={'color':'transparent','position':'top left','repeat':'no-repeat','attachment':'fixed','size':'auto'};Backdrop.ATTRS={url:{value:null},id:{value:null,setter:function(id){return id||'backdrop';},writeOnce:true},styles:{value:null},duration:{value:1,setter:function(i){return(i?parseFloat(i,10):1);}}};Y.Backdrop=Y.extend(Backdrop,Y.Base,{destructor:function(){this.set('id',null);this.set('duration',null);this.set('url',null);this.set('styles',null);},_applyStyles:function(node,styles){for(var s in styles){if(styles.hasOwnProperty(s)){node.setStyle('background'+s.charAt(0).toUpperCase()+s.substr(1),styles[s]);}}},drop:function(config){if(typeof config==='string'){this.set('url',config);this.set('styles',null);}else if(config){if(config.hasOwnProperty('url')){this.set('url',config.url);}if(config.hasOwnProperty('duration')){this.set('duration',config.duration);}this.set('styles',config.hasOwnProperty('styles')?config.styles:null);}var img=new Image(),o={};o.$=this;o.node=Y.Node.create('<div id="'+this.get('id')+'"></div>');img.onload=function(){Y.one('body').append(o.node);var s=Y.merge(DEFAULT_STYLES,o.$.get('styles'));o.$.fire('start',this.src);s.image='url('+this.src+')';o.$._applyStyles(o.node,s);o.$.resize();o.node.transition({'opacity':1,'duration':o.$.get('duration')},function(){o.$.fire('end',o.$.get('url'));var styles=Y.merge(DEFAULT_STYLES,o.$.get('styles')),body=Y.one('body');styles.image='url('+img.src+')';o.$._applyStyles(body,styles);o.node.remove();});Y.on('windowresize',function(){o.$.resize();});};img.src=this.get('url');return this;},resize:function(){var body=Y.one(document.body),region=null,node=Y.one('#'+this.get('id'));body.setStyle('minHeight',body.get('winHeight')+'px');region=body.get('region');if(node){node.setStyles({'width':region.width+'px','height':region.height+'px'});}return this;},toString:function(){return'[Backdrop]';}});},'3.3.1',{requires:['node','base','event','event-resize','transition']});

YUI.add("popover",function(e){"use strict";var t={},n={},r=10,i=function(e){i.superclass.constructor.apply(this,arguments)};i.ATTRS={node:{value:null,setter:function(t){return e.one(t)},writeOnce:true}};e.Popover=e.extend(i,e.Base,{initializer:function(r){if(!this.get("node")){return false}e.one(this.get("node")).all("[data-popover]").each(function(r){if(!r.get("id")){r.set("id",e.guid())}r.set("title","");var i=function(n){var i={"class":"",orientation:"vertical",content:"",margin:10},s=null,o=[0,0],u=null,a=null,f=null,l=n.target.getXY(),c=arguments[1].get("id")+"-popover",h=null;if(t[c]){return}try{s=e.JSON.parse(n.target.getAttribute("data-popover"))}catch(p){s={content:n.target.getAttribute("data-popover")}}s=e.merge(i,s);u=s.orientation=="vertical"?"top":"right";a=e.Node.create('<div id="'+c+'" class="rmr-popover '+u+" "+(s.hasOwnProperty("class")?s["class"]:"")+'"><b></b><div class="bd">'+s.content+"</div></div>");e.one(document.body).append(a);f=a.one("> b");h=a.get("region");switch(s.orientation){case"vertical":if(h.top-h.height<0){a.replaceClass("top","bottom");o[1]=n.target.get("region").height+s.margin}else{o[1]=-h.height-5}if(s.color){f.setStyle("borderTopColor",s.color);f.setStyle("borderBottomColor",s.color)}break;case"horizontal":o[0]=n.target.get("region").width+s.margin;o[1]=(n.target.get("region").height-h.height)/2;if(s.color){f.setStyle("borderRightColor",s.color);f.setStyle("borderLeftColor",s.color)}break}a.setXY([l[0]+o[0],l[1]+o[1]]);if(a.getXY()[1]<0){a.setXY([a.getXY()[0],10]);h=a.get("region")}if(s.orientation=="horizontal"){f.setXY([f.getXY[0],r.get("region").top+r.get("region").height/2-5])}else{f.setXY([a.getXY()[0]+a.get("region").width/2-5,f.getXY()[1]])}t[a.get("id")]=a;a.addClass("pop");e.fire("popover:pop",{node:n.target})},s=function(i){n[r.get("id")]=e.later(100,null,function(r){var i=r+"-popover";delete n[i];if(t[r+"-popover"]){t[i].remove();delete t[i];e.fire("popover:unpop",{node:e.one("#"+r)})}},[r.get("id")])};r.on("mouseenter",i,null,r);r.on("focus",i,null,r);r.on("mouseleave",s);r.on("blur",s)});return this},destructor:function(){this.set("node",null)},toString:function(){return"[Popover]"}})},"3.3.1",{requires:["node","base","event","json-parse","event-resize","transition"]})

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
    popover = null,
    title = 'Toggle fullscreen',
    resizer = function() { Y.one('#doc').setStyle('minHeight', (Y.one(document.body).get('winHeight') - 150) + 'px'); };

    new Y.Popover({ node : '#doc' });

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
