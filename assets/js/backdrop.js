/*jslint browser:true, indent:2,white:true,nomen:false,plusplus:false */
/*global YUI, window */


YUI.add('backdrop', function(Y) {

    'use strict';

    /* 
     *
     * @param config (object)
     *  'url' (string) - the path to the background image
     *  'id' (string, optional) - 
     *  'duration' (float, optional) - seconds
     */
    var Backdrop = function(config) {
      Backdrop.superclass.constructor.apply(this, arguments);

      this.set('url', config.hasOwnProperty('url') ? config.url : null);
      this.set('id', config.hasOwnProperty('id') ? config.id : null);
      this.set('duration', config.hasOwnProperty('duration') ? config.duration : null);

      if (this.get('url')) { this.drop(); }

      return this;
    };

    Backdrop.ATTRS = {
      url : {
        value : null
      },
      id : {
        value : null,
        setter : function(id) { return id ? id : 'backdrop'; },
        writeOnce : true,
      },
      duration : {
        value : null,
        writeOnce : true,
        setter : function(i) { return (i ? parseFloat(i, 10) : 1); }
      }
    };


    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {

      destructor : function() {
        this.set('id', null);
        this.set('duration', null);
        this.set('url', null);
      },

      /* 
       *
       *
       */
      drop : function(url) {

        if (url) { this.set('url', url); }
  
        var img = new Image(), o = {};
  
        o.$ = this;
        o.node = Y.Node.create('<div id="' + this.get('id') + '"></div>');
  
        img.onload = function() {
          Y.one('body').append(o.node);
          o.node.setStyle('backgroundImage', 'url(' + this.src + ')');
          o.$.resize();
          o.node.transition({
            'opacity' : 1,
            'duration' : o.$.get('duration')
          }, function() { o.$.fire('drop', o.$.get('url') ); Y.one('body').setStyle('backgroundImage', 'url(' + img.src + ')'); o.node.remove();  });
  
          Y.on('windowresize', function() { o.$.resize(); });
        };
        img.src = this.get('url');

        return this;
      },

      /*
       *
       * Update the size of the backdrop to match the window size (will be attached to window resize event)
       */
      resize : function() {

        var body = Y.one(document.body),
            region = null,
            node = Y.one('#' + this.get('id'));

        body.setStyle('minHeight', body.get('winHeight') + 'px');

        region = body.get('region');
        if (node) { node.setStyles({'width': region.width + 'px', 'height': region.height + 'px'}); }

        return this;

      },


      /*
       *
       * @return string
       */
      toString : function() {
        return '[Backdrop]';
      }


      /* 
       *
       *
      remove : function() {

        var $ = this;
        Y.one('#' + this.get('id')).transition({
          'opacity' : 0,
          'duration' : this.get('duration')
        }, function(e) { this.remove(); $.fire('remove'); });
      },
       */

//      'NAME' : 'backdrop',
    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });