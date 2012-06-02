/*jslint browser:true, indent:2,white:true,nomen:false,plusplus:false */
/*global YUI, window */


YUI.add('backdrop', function(Y) {

    'use strict';

    var Backdrop = function() {
      Backdrop.superclass.constructor.apply(this, arguments);
    };

    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {

      /* 
       *
       * @param config (object)
       *  'url' (string) - the path to the background image
       *  'id' (string, optional) - 
       *  'duration' (float, optional) - seconds
       */
      initializer : function(config) {

        this.set('url', config.url);
        this.set('id', config.hasOwnProperty('id') ? config.id : 'backdrop');
        this.set('duration', config.hasOwnProperty('duration') ? parseFloat(config.duration, 10) : 1);

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
          }, function() { o.$.fire('drop'); });

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
            region = null;

        body.setStyle('minHeight', body.get('winHeight') + 'px');
        region = body.get('region');
        Y.one('#' + this.get('id')).setStyles({'width': region.width + 'px', 'height': region.height + 'px'});

        return this;
      },

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

      /*
       *
       * @return string
       */
      toString : function() {
        return '[Backdrop]';
      },

      'NAME' : 'backdrop',
      'ATTRS' : {
        url : {
          value : null,
          writeOnce : true
        },
        id : {
          value : null,
          writeOnce : true,
        },
        duration : {
          value : null,
          writeOnce : true
        }
      }
    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });