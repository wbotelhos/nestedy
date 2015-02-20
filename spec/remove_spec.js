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

  context('when destroy is false', function() {
    it ('removes item', function() {
      // given
      var self = $('form').nestedy();

      $('.nestedy-add').trigger('click');

      expect(self.find('.nestedy-item').length).toEqual(2);

      // when
      $('.nestedy-item:last').find('.nestedy-remove').trigger('click');

      // then
      expect(self.find('.nestedy-item').length).toEqual(1);
    });

    context('adding a new item after bind was done', function() {
      it ('binds dynamically the remove action on new item', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item').clone().appendTo($('.nestedy'));

        expect(self.find('.nestedy-item').length).toEqual(2);

        // when
        self.find('.nestedy-remove:last').trigger('click');

        // then
        expect(self.find('.nestedy-item').length).toEqual(1);
      });
    });

    context('with 3 items removing the last', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        $('.nestedy-add').trigger('click').trigger('click');

        // when
        $('.nestedy-remove:last').trigger('click');

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
      });
    });

    context('with 3 items removing the middle', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        $('.nestedy-add').trigger('click').trigger('click');

        // when
        $('.nestedy-remove:eq(1)').trigger('click');

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:first :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:last :input').attr('name'))).toBeTruthy();
      });
    });

    context('with 3 items removing the first', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        $('.nestedy-add').trigger('click').trigger('click');

        // when
        $('.nestedy-remove:first').trigger('click');

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
      });
    });

    context('with 1 item removing it', function() {
      it ('will be removed', function() {
        // given
        var self = $('form').nestedy();

        // when
        $('.nestedy-remove').trigger('click');

        // then
        expect(self.find('.nestedy-item').length).toEqual(0);
      });

      context('and adding again', function() {
        beforeEach(function() {
          this.self = $('form').nestedy();

          $('.nestedy-remove').trigger('click');
        });

        it ('will be create from DOM memory', function() {
          // given
          var self = this.self;

          // when
          $('.nestedy-add').trigger('click').trigger('click');

          // then
          expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
          expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
        });

        context('and removing it again', function() {
          it ('removes item', function() {
            // given
            var self = this.self;

            // when
            $('.nestedy-item').find('.nestedy-remove').trigger('click');

            // then
            expect(self.find('.nestedy-item').length).toEqual(0);
          });
        });
      });
    });
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
