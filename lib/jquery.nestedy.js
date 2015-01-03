/*!
 * jQuery Nestedy - A nested fields creator
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/nestedy
 * @version : 0.1.2
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        this.opt = $.extend({}, $.fn.nestedy.defaults, settings);

        methods._instances.call(this);
        methods._saveData.call(this);

        methods._bindAdd.call(this);
        methods._bindRemove.call(this);

        $(this).data({ 'settings': this.opt, 'nestedy': true });
      });
    }, _add: function(button) {
      var self = $(this), content;

      if (this.addButton.length == 1) {
        content = this.content;
      } else {
        var data = button.getAttribute('data-nestedy')

        if (!data) {
          $.error('You have multiple add buttons and the clicked one has no the `data-nestedy` attribute!');
        }

        content    = $(data);

        var model  = $(button).data('model');

        this.model = model || self.find(content).find(this.opt.model).first();
      }

      var item = this.model.clone(true);

      if (this.opt.add && !methods._execute.call(this, this.opt.add, item)) {
        return false;
      }

      if (this.opt.excludes && this.opt.excludes.length > 0) {
        methods._exclude.call(this, item);
      }

      if (this.opt.template) {
        item.removeAttr('id');
      }

      methods._clear.call(this, item);

      content.append(item);

      methods._reorder.call(this);

      if (this.opt.focus) {
        methods._focus.call(this, item);
      }
    }, _bindAdd: function() {
      var that = this;

      that.addButton.on('click.nestedy', function() {
        methods._add.call(that, this);
      });
    }, _bindRemove: function() {
      var that = this;

      that.content.on('click.nestedy', '.nestedy-remove', function() {
        methods._remove.call(that, this);
      });
    }, _clear: function(item) {
      var that = this;
      $(item).find(':input').each(function() {
        if (methods._is(this, that.opt.typeful)) {
          this.value = '';
        } else if (methods._is(this, that.opt.selectable)) {
          $(this).find('option').removeAttr('selected').first().prop('selected', true);
        } else if (methods._is(this, that.opt.checkable)) {
          $(this).removeAttr('checked').prop('checked', false);
        }
      });
    }, _is: function(field, types) {
      return $.inArray(field.type, types) >= 0;
    }, _rename: function(field, index, attribute) {
      var value   = $(field).data(attribute) || field[attribute];
          partner = '$1' + index + '$2';

      return value.replace(this.opt[attribute + 'x'], partner).replace(/\$1(\d)\$2/, '$1')
    }, _execute: function(callback, item) {
      var isValid = callback.call(this, item);

      return isValid || isValid === undefined;
    }, _exclude: function(item) {
      for (var i = 0; i < this.opt.excludes.length; i++) {
        var selector = this.opt.excludes[i],
            prefix   = selector.charAt(0);

        if (prefix != '#' && prefix != '.') {
          selector = ':input[' + selector + ']';
        }

        item.find(selector).remove();
      }
    }, _focus: function(item) {
      var itemToFocus = (this.opt.focus == ':last' && item) || this.content.find(this.opt.model + this.opt.focus);

      if (itemToFocus) {
        itemToFocus.find(':input:visible:first').focus();
      }
    },

    _remove: function(button) {
      var item = $(button).closest(this.opt.model);

      if (this.opt.remove && !methods._execute.call(this, this.opt.remove, item)) {
        return false;
      }

      if (this.opt.destroy) {
        var
          name    = item.find(':input').attr('name').replace(this.opt.destroyex, '$1_destroy$2'),
          destroy = $('<input />', { name: name, type: 'hidden', value: true })

        item.append(destroy).hide();
      } else {
        item.remove();

        methods._reorder.call(this);
      }

      if (this.opt.focus) {
        methods._focus.call(this);
      }
    },

    _reorder: function() {
      var that = this;

      $(that).find(that.opt.model).each(function(index) {
        $(this).find(':input').each(function() {
          console.log('----------');
          console.log(this.name.match(/id$|name=".+id\\]$/));
          console.log('----------');
          this.name = methods._rename.call(that, this, index, 'name');
          this.id   = methods._rename.call(that, this, index, 'id');

          if (that.opt.checkable.indexOf(this.type) >= 0) {
            var
              self = $(this),
              next = self.next('label'),
              prev = self.prev('label');

            if (prev.length) {
              prev.attr('for', this.id);
            } else if (next.length) {
              next.attr('for', this.id);
            }
          }
        });
      });
    },

    _saveData: function() {
      var that   = this,
          self   = $(that),
          models = [];

      if (this.model) {
        models.push(that.model);
      } else {
        $(that.addButton).each(function() {
          var model = self.find(this.getAttribute('data-nestedy')).find(that.opt.model).first();

          $(this).data('model', model)

          models.push(model);
        });
      }

      for (var i = 0; i < models.length; i++) {
        $(models[i]).find(':input').each(function() {
          $(this).data({ 'id': this.id, 'name': this.name });
        });
      }
    }, _instances: function() {
      var self = $(this);

      this.addButton = self.find(this.opt.addButton);

      this.content = self.find(this.opt.content);

      if (this.addButton.length == 1) {
        this.model = (this.opt.template ? $('body').find(this.opt.template) : self.find(this.opt.model)).first();
      }
    }, isNumber: function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }, add: function(times) {
      if (times && !methods.isNumber(times)) {
        $.error("The parameter '" + times + "' passed on add function is not a number!");
      }

      return $(this).each(function() {
        for (var i = 0; i < (times || 1); i++) {
          methods._add.call(this);
        };
      });
    }, remove: function(index) {
      var selector = index || 'last';

      if (methods.isNumber(index)) {
        selector = 'eq(' + (Number(--selector)) + ')';
      } else if (selector != 'first' && selector != 'last') {
        $.error("The parameter '" + index + "' passed on remove function is invalid!");
      }

      return $(this).each(function() {
        var button = $(this).find(this.opt.removeButton + ':' + selector);

        methods._remove.call(this, button);
      });
    }
  };

  $.fn.nestedy = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.nestedy.defaults = {
    add          : undefined,
    addButton    : '.nestedy-add',
    checkable    : ['checkbox', 'radio'],
    content      : '.nestedy',
    destroy      : false,
    destroyex    : /(\[)[^\[]*(\])$/,
    excludes     : ['id$="id"', 'name$="id"', 'name$="id\\]"'],
    focus        : ':last',
    idx          : /(_)\d(_)/,
    model        : '.nestedy-item',
    namex        : /(\[)\d(\])/,
    remove       : undefined,
    removeButton : '.nestedy-remove',
    selectable   : ['select-one', 'select-multiple'],
    template     : undefined,
    typeful      : ['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'textarea', 'time', 'url', 'week']
  };

})(jQuery);
