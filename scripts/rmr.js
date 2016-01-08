/* jshint undef: true,strict:true,trailing:true */
/* global YUI,document,window,Image */


/* screen */
!function(){var e,n,t,r=["webkit","moz","o","ms","khtml"],o="rmr-screen";if(e={prefix:"",supported:!1,isFullScreen:function(){return!1},exit:function(){},request:function(){},eventName:null},"undefined"!=typeof document.cancelFullScreen)e.supported=!0;else for(n=0;n<r.length;n++)if(t=r[n],"undefined"!=typeof document[t+"CancelFullScreen"]){e.supported=!0,e.prefix=t;break}e.supported&&(e.eventName=e.prefix+"fullscreenchange",e.request=function(e){return t?e[t+"RequestFullScreen"]():e.requestFullScreen()},e.exit=function(e){return t?document[t+"CancelFullScreen"]():document.cancelFullScreen()},e.isFullScreen=function(){var e=null;switch(t){case"webkit":e=document.webkitIsFullScreen;break;case"moz":e=document.mozFullScreenElement;break;default:document.hasOwnProperty("fullScreen")?e=document.fullScreen:document.hasOwnProperty("fullscreen")&&(e=document.fullscreen),e=document[t+"FullScreen"]}return e}),window.Screen=function(n){this.node=document.querySelector(n),this.events={exit:function(){},fullscreen:function(){}};var t=this;this.listener=function(e){t.isFullScreen()?(t.events.fullscreen(),t.node.classList.add(o)):(t.events.exit(),t.node.classList.remove(o))},"moz"==e.prefix?document.addEventListener("mozfullscreenchange",this.listener):t.node.addEventListener(e.eventName,this.listener)},window.Screen.prototype.isSupported=function(){return e.supported},window.Screen.prototype.request=function(){e.request(this.node)},window.Screen.prototype.isFullScreen=function(){return e.isFullScreen()},window.Screen.prototype.on=function(e,n){this.events[e]=n},window.Screen.prototype.toggle=function(){return this.isFullScreen()?this.exit():this.request()},window.Screen.prototype.exit=function(){e.exit()},window.Screen.prototype.toString=function(){return"Screen <"+this.node+">"}}();

// backdrop
(function() {

  'use strict';

  var
  RESIZE_LISTENED = false,
  DEFAULT_STYLES = { 'color' : 'transparent', 'position' : 'top left', 'repeat' : 'no-repeat', 'attachment' : 'fixed', 'size' : 'cover' },

    /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {

    var rect = node.getBoundingClientRect();

    // create a new object that is not read-only
    var ret = { top : rect.top, left : rect.left, bottom: rect.bottom, right : rect.right };

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },

  /*
   *
   * @param a
   * @param b

   * @return Object
   */
  merge = function(a, b) {
    var o = {};
    for (var i in a) {
      o[i] = a[i];
    }
    for (i in b) {
      o[i] = b[i];
    }
    return o;
  },

  setStyles = function(node, styles) {
    for (var key in styles) {
      node.style[key] = styles[key];
    }
  },

  _applyStyles = function(node, styles) {
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {

        var key = 'background' + s.charAt(0).toUpperCase() + s.substr(1),
        style = styles[s];

        node.style[key] = style;
      }
    }
  };


  window.Backdrop = function(config) {

    if (! config) { config = {}; }

    this.events = {
      'end' : function() { },
      'start' : function() { }
    };

    this.id = config.hasOwnProperty('id') ? config.id : 'backdrop';
    this.url = config.hasOwnProperty('url') ? config.url : null;
    this.styles = config.hasOwnProperty('styles') ? config.styles : null;

    if (this.url) {
      this.drop(this.url);
    }
  };


   /**
    * Assign handler for a Screen event
    *
    * @param {String} e - event name to attach to, one of 'fullscreen' or 'exit'
    * @param {Function} func - function to invoke when event occurs
    * @chainable
    */
  window.Backdrop.prototype.on = function(event, func) {
    this.events[event] = func;
    return this;
  };


  window.Backdrop.prototype.drop = function(config) {

    if (typeof config === 'string') {
      this.url = config;
      this.styles = null;
    } else if (config) {
      if (config.hasOwnProperty('url')) { this.url = config.url; }
      if (config.hasOwnProperty('styles')) { this.styles = config.styles; }
    }

    var img = new Image(), o = {};
    o.$ = this;
    o.node = document.createElement('div');
    o.node.setAttribute('id', this.id);

    o.$.resize();

    img.onload = function() {

      var styles = merge(DEFAULT_STYLES, o.$.styles),
          body = document.body;

      body.appendChild(o.node);
      o.$.resize();

      o.$.events.start(o.$.url);

      styles.image = 'url(' + this.src + ')';

      _applyStyles(o.node, styles);

      var val = 0;
      var anim = function() {

        val += 0.04;
        o.node.style.opacity = val;

        if (val >= 1) {

          var
          styles = merge(DEFAULT_STYLES, o.$.styles);

          styles.image = 'url(' + img.src  + ')';
          o.$.events.end(o.$.url);

          _applyStyles(document.body, styles);
          o.node.parentNode.removeChild(o.node);

          window.clearInterval(interval);
        }
      };

      var interval = window.setInterval(anim, 10);

      if (! RESIZE_LISTENED) {
        window.addEventListener('resize', function(e) {
          o.$.resize();
        });
      }
      RESIZE_LISTENED = true;
    };

    img.src = this.url;
    return this;
  };

  window.Backdrop.prototype.resize = function() {

    var
    body = document.body,
    rect = null,
    node = document.getElementById(this.id);

    rect = getRect(document.body);

    document.body.style.minHeight = window.innerHeight + 'px';

    if (node) {
      setStyles(node, { width : rect.width + 'px',  height : rect.height + 'px' });
    }

    return this;
  };

  window.Backdrop.prototype.toString = function() {
    return '[Backdrop v0.1]';
  };

}());

// popover
(function() {

  'use strict';

  var

  //
  VERSION = '0.1.3',

  // node attribute
  ATTR = 'data-popover',

  /*
   * Generate a unique string
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return basename + '-' + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   *
   * @param a
   * @param b

   * @return Object
   */
  merge = function(a, b) {
    var o = {};
    for (var i in a) {
      o[i] = a[i];
    }
    for (i in b) {
      o[i] = b[i];
    }
    return o;
  },

  /*
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function(list) {
    var ret = [], i = 0;
    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  },

  /*
   *
   * @param type (String)
   * @param attrs
   */
  makeElement = function(type, attrs) {
     var
     n = document.createElement(type),
     i = null;

     for (i in attrs) {
       n.setAttribute(i, attrs[i]);
     }
     return n;
  },

  /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {

    var rect = node.getBoundingClientRect();

    // create a new object that is not read-only
    var ret = { top : rect.top, left : rect.left, bottom: rect.bottom, right : rect.right };

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },
  timeouts = {},
  pops = {};


  /**
   *
   *
   * @param node (node, optional) - the root element containing all elements with attached popovers
   * @param options (Object, optional) method to retrieve the popover's data for a given node
   */
  window.Popover = function(options) {

    var
    $ = this,
    nodes,
    i = 0,
    n,
    node,
    on,
    off,
    over,
    defaultOptions = {
      root : document.body,
      delay : { pop : 100, unpop : 1000 },
      factory : null
    };

    if (arguments.length < 1) {
      options = defaultOptions;
    } else {
      options = merge(defaultOptions, options);
    }

    // two events are fired
    this.events = {
      'pop' : function(target, popover) { },
      'unpop' : function(target, popover) { }
    };
    this.enabled = true;
    this.delay = options.delay;

    node = options.root ? (options.root instanceof HTMLElement ? options.root : document.querySelector(options.root)) : document.body;

    if (! node) {
      throw Error('Invalid Popover root [' + options.root + ']');
    }

    nodes = arr(node.querySelectorAll('[' + ATTR + ']'));

    on = function(e, delay) {

      if (! $.enabled) { return; }

      var
      target = e.target,
      data = {},
      n,
      arrow,
      targetRect = getRect(target),
//      bodyRect = getRect(document.body),
      popoverRect,
      popoverXY,
      arrowXY,
      popper = function() {

        if (n) {
          n.classList.add('pop');
          // fire event listener
          if (pops[n.getAttribute('id')]) {
            $.events.pop(target, n);
          }
        }
      }

      if (options.hasOwnProperty('factory') && options.factory) {
        data = options.factory(target);
      }
      else  {
        try {
          data = JSON.parse(e.target.getAttribute(ATTR));
        } catch (err) {
          data = { content : e.target.getAttribute(ATTR) };
        }
      }

      // if there's no content and no specific class, abort since it's an empty popover
      if (! data.content && ! data['class']) { return; }

      data['class'] = (data['class'] ? data['class'] : '') + ' rmr-popover';
      data.id = target.getAttribute('id') + '-popover';

      n = makeElement('div', {'role' : 'tooltip', 'class' : data['class'], 'id' : data.id });

      if (pops[data.id]) {
        if (timeouts[target.getAttribute('id')]) {
          window.clearTimeout(timeouts[target.getAttribute('id')]);
          delete timeouts[target.getAttribute('id')];
        }
        return;
      }

      n.innerHTML = '<b></b><div class="bd">' + (data.content ? data.content : '') + '</div>';

      arrow = n.querySelector('b');

      window.document.body.appendChild(n);

      popoverRect = getRect(n);

      popoverXY = [
        targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2),
        targetRect.top - popoverRect.height - 5
      ];

      arrowXY = [popoverXY[0], popoverXY[1]];
      arrowXY[0] = popoverRect.width / 2 - 6;

      if (popoverXY[0] < 0) {
        popoverXY[0] = 5;
        arrowXY[0] = targetRect.left + targetRect.width / 2 - 10;
      } else if (popoverXY[0] + popoverRect.width > window.innerWidth ) {
        popoverXY[0] = window.innerWidth - popoverRect.width - 5;
        arrowXY[0] = popoverRect.width - targetRect.width / 2;
      }

      target.setAttribute('aria-describedby', data.id);
      n.setAttribute('style', 'left: ' + parseInt(popoverXY[0], 10) + 'px; top: ' + parseInt(popoverXY[1], 10) + 'px');

      pops[data.id] = n;
      arrow.setAttribute('style', 'left: ' + parseInt(arrowXY[0], 10) + 'px');

      if (delay) {
        window.setTimeout(function() { popper(); }, delay);
      } else {
        popper();
      }

      //
      n.addEventListener('mouseenter', over);
    };

    /*
     *
     * @param e (MouseEvent)
     */
    over = function(e) {
     var n = e.target,
         id;

      id = n.getAttribute('id').replace('-popover', '');

      n.addEventListener('mouseleave', function(e) {
        off({ target: document.getElementById(id) });
      });

      if (timeouts[id]) {
        window.clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    };

    /*
     *
     * @param e (MouseEvent)
     */
    off = function(e, delay) {
      var target = e.target;
      timeouts[target.getAttribute('id')] = window.setTimeout(function() {
        var id = target.getAttribute('id');
        target.removeAttribute('aria-describedBy');
        try {
          var pop = pops[id + '-popover'];

          delete pops[id + '-popover'];

          if (pop) {
            pop.parentNode.removeChild(pop);
            $.events.unpop(target, pop);
          }

        } catch (e) { window.console.log('ERROR', e); }
      }, arguments.length == 1 ? $.delay.unpop : delay);

    };

    // add root node if it has
    if (node.hasAttribute(ATTR)) {
      nodes.push(node);
    }

    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];

      // ensure target has unique id
      if (! n.getAttribute('id')) { n.setAttribute('id', guid('popover-target') ); }

      // clear out title since we don't want the tooltip to obscure the popover
      if (n.hasAttribute('title')) { n.setAttribute('title', ''); }

      n.addEventListener('mouseenter', function(e) {
        on(e, $.delay.pop);
      });

      n.addEventListener('focus', function(e) {
        on(e, $.delay.pop);
      });

      n.addEventListener('mouseleave', function(e) {
       off(e, $.delay.unpop);
      });

      n.addEventListener('blur',  function(e) {
       off(e, $.delay.unpop);
      });
    }
  };

  /*!
   *
   * @param event (string) - one of "pop" or "unpop"
   * @param method (function) - the method that will be invoked
   */
  window.Popover.prototype.on = function(event, method) {
    this.events[event] = method;
    return this;
  };

  /**
   *
   *
   * @return string
   */
  window.Popover.prototype.toString = function() {
    return '[Popover v' + VERSION + ']';
  };

}());


(function() {

  'use strict';

  // mobile browser check
  if (
    (function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;}())
  ) { return; }

  var
  /*
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function(list) {

    if (! list || ! list.length) { return []; }

    var ret = [], i = 0;
    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  };

  var dropper = new Backdrop(),
  styles = {
    'backdrop' : { 'size' : 'cover' },
    'chinatown' : { 'repeat' : 'repeat-y', 'size' : 'cover' },
    'evs' : { 'color' : '#fff', 'position' : 'bottom right', 'size' : 'auto' },
    'kaos' : { 'position' : '370px top', 'color' : '#000', 'size' : 'auto' },
    'ubc' : { 'position' : 'right bottom', 'color' : '#000', 'size' : 'auto' },
    'bodhisattva' : { 'position' : 'right bottom', 'color' : '#fff', 'size' : 'auto' },
    'stream' : { 'position' : '400px top', 'color' : '#fff', 'size' : 'auto' },
    'moma' : { 'position' : 'right top', 'color' : '#000', 'size' : 'auto' },
    'lacma' : { 'position' : 'right center', 'color' : '#000' },
    'getty' : { 'position' : 'left bottom', 'color' : '#000', 'size' : 'cover' },
    'vegas' : { 'color' : '#000', 'position' : 'right top', 'size' : 'auto' },
    'rmr' : { 'color' : '#a2a2a2', 'position' : 'center center' },
    'koru' : { 'color' : '#a2a2a2', 'position' : 'center center', 'size' : 'cover' },

    'archive' : { 'color': '#fafafa', 'size' : 'contain', 'position' : 'left bottom' },
    'pink' : { 'size' : 'cover' }
  },

  // retrieve basename of file from a url (ex: 'http://davidfmiller.github.io/assets/img/backdrop/backdrop.jpg' → 'backdrop')
  parser = function(path) { return path.replace(/^.*[\/\\]/g, '').split(".")[0]; },
  body = document.body,
  doc = document.querySelector('#doc'),
  screen = new Screen('body'),
  input = null,
  bg = function(n) {
    var cls = parser(n.getAttribute('href'));
    document.location = '#' + cls;

    if (! doc.classList.contains(cls)) {
      dropper.drop({ 'url' : n.getAttribute('href'), 'styles' : styles[cls] });
    }
  },
  toggle = null,
  title = 'Toggle fullscreen';
//    resizer = function() { Y.one('#doc').setStyle('minHeight', (Y.one(document.body).get('winHeight') - 150) + 'px'); };

//    Y.on('windowresize', resizer);
//    resizer();

  dropper.on('start', function(url) {
    var bg = parser(url),
        li = document.querySelector('ol li.' + bg);

    doc.className = bg;

    arr(document.querySelectorAll('ol li')).forEach(function(li) {
      li.classList.remove('active');
    });

    if (li) {
      li.classList.add('active');
    }
  });

  dropper.on('end', function(url) {

    arr(document.querySelectorAll('img.pin')).forEach(function(img) {
      if (img) {
        img.parentNode.removeChild(img);
      }
    });

    var img = document.createElement('img');
    img.classList.add('pin');
    img.src = url;

    body.appendChild(img);
  });

  window.onload = function() {

    new Popover({
      delay : { pop : 0, unpop : 0 }
    });

    var hash = document.location.hash ? document.location.hash.replace('#', '') : null,
        first = hash && styles.hasOwnProperty(hash) ? document.querySelector('ol li.' + hash + ' a') : (document.querySelector('ol li a') ? document.querySelector('ol li a') : null);

    if (first) {
      first = first.getAttribute('href');
    } else if (window.RMR && window.RMR.backdrop) {
      first = window.RMR.backdrop;
    } else {
      first = document.querySelector('html').getAttribute('data-backdrop');
    }

    if (first) {
      dropper.drop({'url' : first, 'styles' : styles[parser(first)] });
    }

    arr(document.querySelectorAll('ol li a')).forEach(function(n) {

      n.addEventListener('click', function(e) {
        e.preventDefault();

        var ancestor = e.target
        while (ancestor.tagName != 'A') {
          ancestor = ancestor.parentNode;
        }

        bg(ancestor);
      });
    });

  /* screen */
    if (screen.isSupported()) {

      var section = document.querySelector('section.zoom');
      toggle = function() { screen.toggle(); };
//      Y.on('key', toggle, body, 'f');

      if (section) {

        input = document.createElement('button');
        input.setAttribute('title', title);
        input.classList.add('zoom');
        input.innerHTML = title;
        document.querySelector('section.zoom').appendChild(input);

        input.addEventListener('click', toggle);
      }
    }

  };

/*
    Y.one(document.body).on('key', function(e) {

      var code = e.keyCode,
          li = null;

      code = code == 48 ? 9 : code - 49;
      li = Y.all('ol li');
      if (li.size() <= code) { return; }
      bg(li.item(code).one('a'));

    }, '48,49,50,51,52,53,54,55,56,57');
*/

}());

