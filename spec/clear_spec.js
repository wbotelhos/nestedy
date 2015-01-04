describe('#clear', function() {
  'use strict';

  beforeEach(function() {
    Factory.html(
      '<form>' +
        '<div class="nestedy">' +
          '<div class="nestedy-item">' +
            '<input type="text" value="dirt" />' +
            '<input type="text" value="ignore" />' +

            '<i class="nestedy-remove">remove</i>' +
          '</div>' +
        '</div>' +

        '<i class="nestedy-add">add</i>' +
      '</form>'
    );
  });

  afterEach(function() {
    Factory.clear();
  });

  context('when destroy a function', function() {
    it ('clears the returned fields', function() {
      // given
      var self = $('form').nestedy({
        clear: function() {
          return this.value !== 'ignore';
        }
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      var fields = self.find('.nestedy-item:last input');

      expect(fields.eq(0).val()).toEqual('');
      expect(fields.eq(1).val()).toEqual('ignore');
    });
  });
});
