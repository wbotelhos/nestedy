/*!
 * jQuery Nestedy - A nested fields creator
 * ----------------------------------------------------------------------
 *
 * jQuery Nestedy is a plugin to create dynamically nested fields.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.2
 * @since          2013-08-14
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/nestedy
 *
 * ----------------------------------------------------------------------
 *
 *  <form>
 *    <div class="nestedy">
 *      <div class="nestedy-item">
 *        <input id="some_0_value" name="some[0][value]">
 *        <i class="nestedy-remove"></i>
 *      </div>
 *    </div>
 *
 *    <i class="nestedy-add"></i>
 *  </form>
 *
 *  $('form').nestedy();
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        this.opt = $.extend({}, $.fn.nestedy.defaults, settings);

        methods._instances.call(this);
        methods._saveData.call(this, this.model);

        methods._bindAdd.call(this);
        methods._bindRemove.call(this);

        $(this).data({ 'settings': this.opt, 'nestedy': true });
      });
    }, _add: function() {
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

      this.content.append(item);

      methods._reorder.call(this);

      if (this.opt.focus) {
        methods._focus.call(this, item);
      }
    }, _bindAdd: function() {
      var that = this;

      that.addButton.on('click.nestedy', function() {
        methods._add.call(that);
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
    }, _remove: function(button) {
      var item = $(button).closest(this.opt.model);

      if (this.opt.remove && !methods._execute.call(this, this.opt.remove, item)) {
        return false;
      }

      item.remove();

      methods._reorder.call(this);

      if (this.opt.focus) {
        methods._focus.call(this);
      }
    }, _reorder: function() {
      var that = this;

      $(that).find(that.opt.model).each(function(index) {
        $(this).find(':input').each(function() {
          this.name = methods._rename.call(that, this, index, 'name');
          this.id   = methods._rename.call(that, this, index, 'id');
        });
      });
    }, _saveData: function(item) {
      $(item).find(':input').each(function() {
        $(this).data({ 'id': this.id, 'name': this.name });
      });
    }, _instances: function() {
      var self = $(this);

      this.content   = self.find(this.opt.content);
      this.addButton = self.find(this.opt.addButton);
      this.model     = (this.opt.template ? $('body').find(this.opt.template) : self.find(this.opt.model)).first();
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
