/* jshint undef: true,strict:true,trailing:true */
/* global YUI,document,window,Image */


!function(){var e,n,t,r=["webkit","moz","o","ms","khtml"],o="rmr-screen";if(e={prefix:"",supported:!1,isFullScreen:function(){return!1},exit:function(){},request:function(){},eventName:null},"undefined"!=typeof document.cancelFullScreen)e.supported=!0;else for(n=0;n<r.length;n++)if(t=r[n],"undefined"!=typeof document[t+"CancelFullScreen"]){e.supported=!0,e.prefix=t;break}e.supported&&(e.eventName=e.prefix+"fullscreenchange",e.request=function(e){return t?e[t+"RequestFullScreen"]():e.requestFullScreen()},e.exit=function(e){return t?document[t+"CancelFullScreen"]():document.cancelFullScreen()},e.isFullScreen=function(){var e=null;switch(t){case"webkit":e=document.webkitIsFullScreen;break;case"moz":e=document.mozFullScreenElement;break;default:document.hasOwnProperty("fullScreen")?e=document.fullScreen:document.hasOwnProperty("fullscreen")&&(e=document.fullscreen),e=document[t+"FullScreen"]}return e}),window.Screen=function(n){this.node=document.querySelector(n),this.events={exit:function(){},fullscreen:function(){}};var t=this;this.listener=function(e){t.isFullScreen()?(t.events.fullscreen(),t.node.classList.add(o)):(t.events.exit(),t.node.classList.remove(o))},"moz"==e.prefix?document.addEventListener("mozfullscreenchange",this.listener):t.node.addEventListener(e.eventName,this.listener)},window.Screen.prototype.isSupported=function(){return e.supported},window.Screen.prototype.request=function(){e.request(this.node)},window.Screen.prototype.isFullScreen=function(){return e.isFullScreen()},window.Screen.prototype.on=function(e,n){this.events[e]=n},window.Screen.prototype.toggle=function(){return this.isFullScreen()?this.exit():this.request()},window.Screen.prototype.exit=function(){e.exit()},window.Screen.prototype.toString=function(){return"Screen <"+this.node+">"}}();


YUI.add('backdrop',function(Y){'use strict';var Backdrop=function(config){Backdrop.superclass.constructor.apply(this,arguments);this.set('url',config.hasOwnProperty('url')?config.url:null);this.set('id',config.hasOwnProperty('id')?config.id:null);this.set('duration',config.hasOwnProperty('duration')?config.duration:null);this.set('styles',config.hasOwnProperty('styles')?config.styles:null);if(this.get('url')){this.drop();}return this;},DEFAULT_STYLES={'color':'transparent','position':'top left','repeat':'no-repeat','attachment':'fixed','size':'auto'};Backdrop.ATTRS={url:{value:null},id:{value:null,setter:function(id){return id||'backdrop';},writeOnce:true},styles:{value:null},duration:{value:1,setter:function(i){return(i?parseFloat(i,10):1);}}};Y.Backdrop=Y.extend(Backdrop,Y.Base,{destructor:function(){this.set('id',null);this.set('duration',null);this.set('url',null);this.set('styles',null);},_applyStyles:function(node,styles){for(var s in styles){if(styles.hasOwnProperty(s)){node.setStyle('background'+s.charAt(0).toUpperCase()+s.substr(1),styles[s]);}}},drop:function(config){if(typeof config==='string'){this.set('url',config);this.set('styles',null);}else if(config){if(config.hasOwnProperty('url')){this.set('url',config.url);}if(config.hasOwnProperty('duration')){this.set('duration',config.duration);}this.set('styles',config.hasOwnProperty('styles')?config.styles:null);}var img=new Image(),o={};o.$=this;o.node=Y.Node.create('<div id="'+this.get('id')+'"></div>');img.onload=function(){Y.one('body').append(o.node);var s=Y.merge(DEFAULT_STYLES,o.$.get('styles'));o.$.fire('start',this.src);s.image='url('+this.src+')';o.$._applyStyles(o.node,s);o.$.resize();o.node.transition({'opacity':1,'duration':o.$.get('duration')},function(){o.$.fire('end',o.$.get('url'));var styles=Y.merge(DEFAULT_STYLES,o.$.get('styles')),body=Y.one('body');styles.image='url('+img.src+')';o.$._applyStyles(body,styles);o.node.remove();});Y.on('windowresize',function(){o.$.resize();});};img.src=this.get('url');return this;},resize:function(){var body=Y.one(document.body),region=null,node=Y.one('#'+this.get('id'));body.setStyle('minHeight',body.get('winHeight')+'px');region=body.get('region');if(node){node.setStyles({'width':region.width+'px','height':region.height+'px'});}return this;},toString:function(){return'[Backdrop]';}});},'3.3.1',{requires:['node','base','event','event-resize','transition']});


YUI().use(function(Y) {

  'use strict';

  if (Y.UA.mobile) { return false; }

  Y.use('backdrop', 'screen', 'node-focusmanager', function(Y) {

    var dropper = new Y.Backdrop({
      'id' : 'backdrop',
      'duration' : 0.5
    }),
    styles = {
      'backdrop' : { 'size' : 'cover' },
      'chinatown' : { 'repeat' : 'repeat-y', 'size' : 'cover' },
      'evs' : { 'color' : '#fff', 'position' : 'bottom right' },
      'kaos' : { 'position' : '370px top', 'color' : '#000' },
      'ubc' : { 'position' : 'right bottom', 'color' : '#000' },
      'bodhisattva' : { 'position' : 'right bottom', 'color' : '#fff' },
      'stream' : { 'position' : '400px top', 'color' : '#fff' },
      'moma' : { 'position' : 'right top', 'color' : '#000' },
      'lacma' : { 'position' : 'right center', 'color' : '#000' },
      'getty' : { 'position' : 'left bottom', 'color' : '#000', 'size' : 'cover' },
      'vegas' : { 'color' : '#000', 'position' : 'right top' },
      'rmr' : { 'color' : '#a2a2a2', 'position' : 'center center' },
      'koru' : { 'color' : '#a2a2a2', 'position' : 'center center', 'size' : 'cover' },

      'archive' : { 'color': '#fafafa', 'size' : 'contain', 'position' : 'left bottom' },
      'pink' : { 'size' : 'cover' }
    },

    // retrieve basename of file from a url (ex: 'http://davidfmiller.github.io/assets/img/backdrop/backdrop.jpg' → 'backdrop')
    parser = function(path) { return path.replace(/^.*[\/\\]/g, '').split(".")[0]; },
    body = Y.one(document.body),
    doc = Y.one('#doc'),
    screen = new Screen('body'),
    input = null,
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

    Y.on('windowresize', resizer);
    resizer();

    dropper.on('start', function(e) {
      var bg = parser(e.details[0]),
          li = Y.one('ol li.' + bg);

      doc.set('className', bg);
      Y.all('ol li').removeClass('active');

      if (li) {
        li.addClass('active');
      }
    });

    dropper.on('end', function(e) {
      Y.all('img.pin').remove();
      Y.one('body').append('<img src="' + e.details[0] + '" class="pin">');
    });

    Y.on('domready', function(e) {

      var hash = document.location.hash ? document.location.hash.replace('#', '') : null,
          first = hash && styles.hasOwnProperty(hash) ? Y.one('ol li.' + hash + ' a') : (Y.one('ol li a') ? Y.one('ol li a') : null);

      if (first) {
        first = first.getAttribute('href');
      } else if (window.RMR && window.RMR.backdrop) {
        first = window.RMR.backdrop;
      } else {
        first = Y.one('html').getAttribute('data-backdrop');
      }

      if (first) {
        dropper.drop({'url' : first, 'styles' : styles[parser(first)] });
      }
    });


    Y.all('ol li a').on('click', function(e) {
      e.halt();
      bg(e.target.ancestor('a', true));
    });

    /* screen */
    if (screen.isSupported()) {

      var section = Y.one('section.zoom');
      toggle = function() { screen.toggle(); };
      Y.on('key', toggle, body, 'f');

      if (section) {
        input = Y.Node.create('<button title="' + title + '" class="zoom">' + title + '</button>');
        Y.one('section.zoom').append(input);
        input.on('click', toggle);

      }
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
