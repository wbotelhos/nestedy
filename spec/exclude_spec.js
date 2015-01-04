describe('#exclude', function() {
  'use strict';

  beforeEach(function() {
    Factory.html(
      '<form>' +
        '<div class="nestedy">' +
          '<div class="nestedy-item">' +
            '<input id="product_prices_attributes_0_name" type="text" name="product[prices_attributes][0][name]" class="price" />' +

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

  context('using callback', function() {
    it ('excludes all returned item', function() {
      // given
      var self = $('form').nestedy({
        excludes: function() {
          return this.id.match(/product_prices_attributes_\d_name/);
        }
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      expect(self.find('.nestedy-item:last input').length).toEqual(0);
    });
  });

  context('using array', function() {
    xit ('excludes fields by id', function() {
      // given
      var self = $('form').nestedy({
        excludes: ['#product_prices_attributes_0_name']
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      expect(self.find('.nestedy-item:last input').length).toEqual(0);
    });

    xit ('excludes fields by class', function() {
      // given
      var self = $('form').nestedy({
        excludes: ['.price']
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      expect(self.find('.nestedy-item:last input').length).toEqual(0);
    });

    xit ('excludes fields by jquery selector (name)', function() {
      // given
      var self = $('form').nestedy({
        excludes: ['name="product[prices_attributes][0][name]"']
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      expect(self.find('.nestedy-item:last input').length).toEqual(0);
    });

    xit ('excludes fields by jquery selector (type)', function() {
      // given
      var self = $('form').nestedy({
        excludes: ['type="text"']
      });

      // when
      $('.nestedy-add').trigger('click');

      // then
      expect(self.find('.nestedy-item:last input').length).toEqual(0);
    });
  });
});
