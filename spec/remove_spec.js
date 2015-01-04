describe('#remove', function() {
  'use strict';

  beforeEach(function() {
    Factory.html(
      '<form>' +
        '<div class="nestedy">' +
          '<div class="nestedy-item">' +
            '<input id="product_prices_attributes_0_name" type="text" name="product[prices_attributes][0][name]" />' +

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

  context('when destroy is true', function() {
    it ('hides the item', function() {
      // given
      var self = $('form').nestedy({ destroy: true });

      // when
      $('.nestedy-remove').trigger('click');

      // then
      expect(self.find('.nestedy-item').is(':hidden')).toBeTruthy();
    });

    it ('adds a hidden field with _destroy value as true', function() {
      // given
      var self = $('form').nestedy({ destroy: true });

      // when
      $('.nestedy-remove').trigger('click');

      // then
      var destroy = self.find('input[value="true"]')[0];

      expect(destroy.type).toEqual('hidden');
      expect(destroy.name).toEqual('product[prices_attributes][0][_destroy]');
    });
  });
});
