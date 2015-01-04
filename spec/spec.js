describe('normal.html', function() {
  beforeEach(function() {
    Factory.html(
      '<form>' +
        '<div class="nestedy">' +
          '<div class="nestedy-item">' +
            '<input id="product_prices_attributes_0_hours"  type="number"   name="product[prices_attributes][0][hours]" />' +
            '<label for="product_prices_attributes_0_check">checkbox prev</label>' +
            '<input id="product_prices_attributes_0_check" type="checkbox" name="product[prices_attributes][0][check]" />' +
            '<div id="product_prices_attributes_0_select">' +
              '<select name="product[prices_attributes][0][select]">' +
                '<option></option>' +
                '<option>1</option>' +
                '<option>2</option>' +
              '</select>' +
            '</div>' +
            '<input id="product_prices_attributes_0_radio1"         type="radio"          name="product[prices_attributes][0][radio]" />' +
            '<label for="product_prices_attributes_0_radio1">radio1 next</label>' +
            '<label for="product_prices_attributes_0_radio2">radio2</label>' +
            '<input id="product_prices_attributes_0_radio2"         type="radio"          name="product[prices_attributes][0][radio]" />' +
            '<input id="product_prices_attributes_0_description"    type="text"           name="product[prices_attributes][0][description]" />' +
            '<input id="product_prices_attributes_0_value"          type="number"         name="product[prices_attributes][0][value]" />' +
            '<input id="product_prices_attributes_0_color"          type="color"          name="product[prices_attributes][0][color]" />' +
            '<input id="product_prices_attributes_0_date"           type="date"           name="product[prices_attributes][0][date]" />' +
            '<input id="product_prices_attributes_0_datetime"       type="datetime"       name="product[prices_attributes][0][datetime]" />' +
            '<input id="product_prices_attributes_0_datetime-local" type="datetime-local" name="product[prices_attributes][0][datetime-local]" />' +
            '<input id="product_prices_attributes_0_email"          type="email"          name="product[prices_attributes][0][email]" />' +
            '<input id="product_prices_attributes_0_hidden"         type="hidden"         name="product[prices_attributes][0][hidden]" />' +
            '<input id="product_prices_attributes_0_month"          type="month"          name="product[prices_attributes][0][month]" />' +
            '<input id="product_prices_attributes_0_password"       type="password"       name="product[prices_attributes][0][password]" />' +
            '<input id="product_prices_attributes_0_range"          type="range"          name="product[prices_attributes][0][range]" min="1" max="10" />' +
            '<input id="product_prices_attributes_0_search"         type="search"         name="product[prices_attributes][0][search]" />' +
            '<input id="product_prices_attributes_0_tel"            type="tel"            name="product[prices_attributes][0][tel]" />' +
            '<input id="product_prices_attributes_0_time"           type="time"           name="product[prices_attributes][0][time]" />' +
            '<input id="product_prices_attributes_0_url"            type="url"            name="product[prices_attributes][0][url]" />' +
            '<input id="product_prices_attributes_0_week"           type="week"           name="product[prices_attributes][0][week]" />' +

            '<i class="nestedy-remove">remove</i>' +
          '</div>' +
        '</div>' +

        '<i class="nestedy-add">add</i>' +
      '</form>'
    );
  });

  afterEach(function() { Factory.clear(); });

  describe('add', function() {
    it ('creates one more item', function() {
      // given
      var self = $('form');

      // when
      self.nestedy();

      self[0].addButton.click();

      // then
      expect(self.find('.nestedy-item').length).toEqual(2);
    });

    context('one field', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        // when
        self[0].addButton.click();

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
      });
    });

    context('two fields', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        // when
        self[0].addButton.click();
        self[0].addButton.click();
        self[0].addButton.click();

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
        expect(/\[2\]/.test(self.find('.nestedy-item:eq(2) :input').attr('name'))).toBeTruthy();
      });
    });

    context('text field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item').find('input:text').val('dirty');

        // when
        self[0].addButton.click();

        // then
        self.find('.nestedy-item:last input:text').each(function() {
          expect(this.value).toEqual('');
        })
      });
    });

    context('select field', function() {
      it ('checks the first one', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('select').children('option').last().prop('selected', 'selected').attr('selected', 'selected');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('select').children('option').first()).toBeSelected();
      });
    });

    context('checkbox field', function() {
      it ('uncheck it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input:checkbox').click().attr('checked', 'checked');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input:checkbox')).not.toBeChecked();
      });
    });

    context('radio field', function() {
      it ('uncheck it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input:radio:first').click().attr('checked', 'checked');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input:radio')).not.toBeChecked();
      });
    });

    context('number field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="number"]').val(1);

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="number"]').val()).toEqual('');
      });
    });

    context('color field', function() {
      it ('resets to default value', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="color"]').val('#FF0000');

        // when
        self[0].addButton.click();

        // then
        var value = self.find('.nestedy-item:last').find('input[type="color"]').val();

        expect(value == '#000000' || value == '').toBeTruthy();
      });
    });

    context('date field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="date"]').val('05/26/1984');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="date"]').val()).toEqual('');
      });
    });

    context('datetime field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="datetime"]').val('05/26/1984 11:21:32');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="datetime"]').val()).toEqual('');
      });
    });

    context('datetime-local field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="datetime"]').val('05/26/1984 11:21 AM');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="datetime"]').val()).toEqual('');
      });
    });

    context('email field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="email"]').val('some@email.com');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="email"]').val()).toEqual('');
      });
    });

    context('hidden field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="hidden"]').val('some text');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="hidden"]').val()).toEqual('');
      });
    });

    context('month field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="month"]').val('09-2013');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="month"]').val()).toEqual('');
      });
    });

    context('password field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="password"]').val('some password');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="password"]').val()).toEqual('');
      });
    });

    context('range field', function() {
      it ('resets to default value', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="range"]').val('2');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="range"]').val()).toEqual('6');
      });
    });

    context('search field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="search"]').val('google it');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="search"]').val()).toEqual('');
      });
    });

    context('tel field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="tel"]').val('+55 (11) 555-5555');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="tel"]').val()).toEqual('');
      });
    });

    context('time field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="time"]').val('11:21 AM');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="time"]').val()).toEqual('');
      });
    });

    context('url field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="url"]').val('http://www.someurl.com');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="url"]').val()).toEqual('');
      });
    });

    context('week field', function() {
      it ('clears it', function() {
        // given
        var self = $('form').nestedy();

        self.find('.nestedy-item:first').find('input[type="week"]').val('2013-W32');

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:last').find('input[type="week"]').val()).toEqual('');
      });
    });
  });

  describe(':add', function() {
    it ('has `this` as the self element', function() {
      // given
      var self = $('form').nestedy({
          add: function() {
            $(this).data('self', this);
          }
        });

      // when
      self[0].addButton.click();

      // then
      expect(self.data('self')).toBe(self);
    });

    it ('is called on add click', function() {
      // given
      var self = $('form').nestedy({
            add: function() {
              $(this).data('clicked', true);
            }
          });

      // when
      self[0].addButton.click();

      // then
      expect(self.data('clicked')).toBeTruthy();
    });

    it ('receives the added item', function() {
      // given
      var self = $('form').nestedy({
            add: function(item) {
              $(this).data('item', item);
            }
          });

      // when
      self[0].addButton.click();

      // then
      expect(self.find('.nestedy-item:last')).toBe(self.data('item'));
    });

    it ('is called just on time', function() {
      // given
      var self = $('form').data('count', 0).nestedy({
            add: function() {
              var $this = $(this);
              $this.data('count', Number($this.data('count')) + 1);
            }
          });

      // when
      self[0].addButton.click();

      // then
      expect(self.data('count')).toEqual(1);
    });

    context('when returns undefined', function() {
      it ('executes the action', function() {
        // given
        var self = $('form').nestedy({
              add: function(item) {
                return undefined;
              }
            });

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(2);
      });
    });

    context('when returns true', function() {
      it ('executes the action', function() {
        // given
        var self = $('form').nestedy({
              add: function(item) {
                return true;
              }
            });

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(2);
      });
    });

    context('when returns fase', function() {
      it ('stops the action', function() {
        // given
        var self = $('form').nestedy({
              add: function(item) {
                return false;
              }
            });

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(1);
      });
    });
  });

  describe('#add', function() {
    context('without the number', function() {
      it ('adds a new item', function() {
        // given
        var self = $('form').nestedy();

        // when
        self.nestedy('add');

        // then
        expect(self.find('.nestedy-item').length).toEqual(2);
      });
    });

    context('with number', function() {
      it ('adds a new item the number times', function() {
        // given
        var self = $('form').nestedy();

        // when
        self.nestedy('add', 2);

        // then
        expect(self.find('.nestedy-item').length).toEqual(3);
      });
    });

    context('with number as string', function() {
      it ('adds a new item the number times', function() {
        // given
        var self = $('form').nestedy();

        // when
        self.nestedy('add', '2');

        // then
        expect(self.find('.nestedy-item').length).toEqual(3);
      });
    });

    context('with a not number parameter', function() {
      it ('throws exception', function() {
        // given
        var self = $('form').nestedy();

        // when
        var proc = function() { self.nestedy('add', 'string'); };

        // then
        expect(proc).toThrow(new Error("The parameter 'string' passed on add function is not a number!"));
      });
    });
  });

  describe('channing', function() {
    it ('is chainable', function() {
      // given
      var self = $('form');

      // when
      var ref = self.nestedy();

      // then
      expect(ref).toBe(self);
    });
  });

  describe(':content', function() {
    it ('holds the item', function() {
      // given
      var self = $('form');

      // when
      self.nestedy({ content: '.nestedy' });

      self[0].addButton.click();

      // then
      expect(self.find(self[0].opt.content).find('.nestedy-item').length).toEqual(2);
    });

    context('changing the content', function() {
      it ('changes the wrapper where item will be appended', function() {
        // given
        var self = $('form').append('<div class="target"></div>');

        // when
        self.nestedy({ content: '.target' });

        self[0].addButton.click();

        // then
        expect(self.find(self[0].opt.content).find('.nestedy-item').length).toEqual(1);
      });
    });
  });

  describe(':focus', function() {
    context('on add', function() {
      context('with focus last', function() {
        it ('focus the first field of the last item', function() {
          // given
          var self = $('form').nestedy({ focus: ':last' });

          // when
          self[0].addButton.click();

          // then
          expect(self.find(self[0].opt.model).last().find(':input:first')).toBeFocused();
        });
      });

      context('with focus first', function() {
        it ('does not focus the first field of the first item', function() {
          // given
          var self = $('form').nestedy({ focus: ':first' });

          // when
          self[0].addButton.click();

          // then
          expect(self.find(self[0].opt.model).first().find(':input:first')).toBeFocused();
        });
      });
    });

    context('on remove', function() {
      context('with focus last', function() {
        it ('focus the first field of the last item', function() {
          // given
          var self = $('form').nestedy({ focus: ':last' });

          self[0].addButton.click().click();

          // when
          self.find('.nestedy-item:last').find('.nestedy-remove').click();

          // then
          expect(self.find(self[0].opt.model).last().find(':input:first')).toBeFocused();
        });
      });

      context('with focus first', function() {
        it ('does not focus the first field of the first item', function() {
          // given
          var self = $('form').nestedy({ focus: ':first' });

          self[0].addButton.click().click();

          // when
          self.find('.nestedy-item:last').find('.nestedy-remove').click();

          // then
          expect(self.find(self[0].opt.model).first().find(':input:first')).toBeFocused();
        });
      });
    });
  });

  describe(':idx', function() {
    beforeEach(function() {
      $('.nestedy :input').each(function() {
        this.id = this.id.replace(/\d/, '{index}')
      });
    });

    it ('saves id as date', function() {
      // given
      var self = $('form');

      // when
      self.nestedy({ idx: /{index}/ });

      // then
      self.find('.nestedy-item :input').each(function() {
        expect($(this).data('id')).toEqual(this.id);
      });
    });

    context('reorder the index with custom dynamic id', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy({ idx: /{index}/ });

        // when
        self[0].addButton.click().click();

        // then
        expect(/_0_/.test(self.find('.nestedy-item:eq(0) :input').attr('id'))).toBeTruthy();
        expect(/_1_/.test(self.find('.nestedy-item:eq(1) :input').attr('id'))).toBeTruthy();
        expect(/_2_/.test(self.find('.nestedy-item:eq(2) :input').attr('id'))).toBeTruthy();
      });

      it ('the related labels', function() {
        // given
        var self = $('form').nestedy({ idx: /{index}/ });

        // when
        self[0].addButton.click().click();

        // then
        expect(/_0_/.test(self.find('.nestedy-item:eq(0) label:eq(0)').attr('for'))).toBeTruthy();
        expect(/_0_/.test(self.find('.nestedy-item:eq(0) label:eq(1)').attr('for'))).toBeTruthy();
        expect(/_0_/.test(self.find('.nestedy-item:eq(0) label:eq(2)').attr('for'))).toBeTruthy();

        expect(/_1_/.test(self.find('.nestedy-item:eq(1) label:eq(0)').attr('for'))).toBeTruthy();
        expect(/_1_/.test(self.find('.nestedy-item:eq(1) label:eq(1)').attr('for'))).toBeTruthy();
        expect(/_1_/.test(self.find('.nestedy-item:eq(1) label:eq(2)').attr('for'))).toBeTruthy();

        expect(/_2_/.test(self.find('.nestedy-item:eq(2) label:eq(0)').attr('for'))).toBeTruthy();
        expect(/_2_/.test(self.find('.nestedy-item:eq(2) label:eq(1)').attr('for'))).toBeTruthy();
        expect(/_2_/.test(self.find('.nestedy-item:eq(2) label:eq(2)').attr('for'))).toBeTruthy();
      });
    });

    context('without the group', function() {
      it ('ignores the holders $1 and $2', function() {
        // given
        var self = $('form').nestedy({ idx: /{index}/ });

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:eq(0) :input').attr('id').indexOf('$10$2')).toEqual(-1);
      });
    });
  });

  describe(':model', function() {
    context('on add', function() {
      it ('will search the item inside the form', function() {
        // given
        var self = $('form').nestedy({ model: '.nestedy-item' });

        // when
        self[0].addButton.click();

        // then
        var items = self.find(self[0].opt.model);

        expect(items.last().attr('class')).toEqual('nestedy-item');
      });
    });
  });

  describe(':namex', function() {
    beforeEach(function() {
      $('.nestedy :input').each(function() {
        this.name = this.name.replace(/\d/, '{index}')
      });
    });

    it ('saves name as date', function() {
      // given
      var self = $('form');

      // when
      self.nestedy();

      // then
      self.find('.nestedy-item :input').each(function() {
        expect($(this).data('name')).toEqual(this.name);
      });
    });

    context('reorder the index with custom dynamic name', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy({ namex: /(\[){index}(\])/ });

        // when
        self[0].addButton.click().click();

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
        expect(/\[2\]/.test(self.find('.nestedy-item:eq(2) :input').attr('name'))).toBeTruthy();
      });
    });

    context('without the group', function() {
      it ('ignores the holders $1 and $2', function() {
        // given
        var self = $('form').nestedy({ namex: /{index}/ });

        // when
        self[0].addButton.click();

        // then
        expect(self.find('.nestedy-item:eq(0) :input').attr('name').indexOf('$10$2')).toEqual(-1);
      });
    });
  });

  describe('remove', function() {
    it ('removes item', function() {
      // given
      var self = $('form').nestedy();

      self[0].addButton.click();

      // when
      $('.nestedy-item:last').find('.nestedy-remove').click();

      // then
      expect(self.find('.nestedy-item').length).toEqual(1);
    });

    context('adding a new item after bind', function() {
      it ('binds dynamically the remove action', function() {
        // given
        var self = $('form').nestedy();

        // when
        self.find('.nestedy-item').clone().appendTo(self[0].content);
        self.find('.nestedy-remove').click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(0);
      });
    });

    context('with 3 items removing the last', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        self[0].addButton.click().click();

        // when
        $('.nestedy-item:last').find('.nestedy-remove').click();

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
      });
    });

    context('with 3 items removing the middle', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        self[0].addButton.click().click();

        // when
        $('.nestedy-item:eq(1)').find('.nestedy-remove').click();

        // then
        expect(/\[0\]/.test(self.find('.nestedy-item:first :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.nestedy-item:last :input').attr('name'))).toBeTruthy();
      });
    });

    context('with 3 items removing the first', function() {
      it ('reorder the fields', function() {
        // given
        var self = $('form').nestedy();

        self[0].addButton.click().click();

        // when
        $('.nestedy-item:first').find('.nestedy-remove').click();

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
        self.find('.nestedy-item').find('.nestedy-remove').click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(0);
      });

      context('and adding again', function() {
        beforeEach(function() {
          this.self = $('form').nestedy();

          this.self.find('.nestedy-item').find('.nestedy-remove').click();
        });

        it ('will be create from DOM memory', function() {
          // given
          var self = this.self;

          // when
          self[0].addButton.click().click();

          // then
          expect(/\[0\]/.test(self.find('.nestedy-item:eq(0) :input').attr('name'))).toBeTruthy();
          expect(/\[1\]/.test(self.find('.nestedy-item:eq(1) :input').attr('name'))).toBeTruthy();
        });

        context('and removing it again', function() {
          beforeEach(function() {
            this.self[0].addButton.click();
          });

          it ('removes item', function() {
            // given
            var self = this.self;

            // when
            self.find('.nestedy-item').find('.nestedy-remove').click();

            // then
            expect(self.find('.nestedy-item').length).toEqual(0);
          });
        });
      });
    });
  });

  describe(':remove', function() {
    it ('has `this` as the self element', function() {
      // given
      var self = $('form').nestedy({
          remove: function() {
            $(this).data('self', this);
          }
        });

      // when
      self.find('.nestedy-item:last').find('.nestedy-remove').click();

      // then
      expect(self.data('self')).toBe(self);
    });

    it ('is called on remove click', function() {
      // given
      var self = $('form').nestedy({
            remove: function() {
              $(this).data('clicked', true);
            }
          });

      // when
      self.find('.nestedy-item:last').find('.nestedy-remove').click();

      // then
      expect(self.data('clicked')).toBeTruthy();
    });

    it ('is called just on time', function() {
      // given
      var self = $('form').data('count', 0).nestedy({
            remove: function() {
              var $this = $(this);
              $this.data('count', Number($this.data('count')) + 1);
            }
          });

      self[0].addButton.click();

      // when
      self.find('.nestedy-item:last').find('.nestedy-remove').click();

      // then
      expect(self.data('count')).toEqual(1);
    });

    it ('receives the removed item', function() {
      // given
      var self = $('form');
          item = self.find('.nestedy-item');

      self.nestedy({
        remove: function(item) {
          $(this).data('item', item);
        }
      });

      // when
      self.find('.nestedy-item:last').find('.nestedy-remove').click();

      // then
      expect(self.data('item')).toBe(item);
    });

    context('when returns undefined', function() {
      it ('executes the action', function() {
        // given
        var self = $('form').nestedy({
              remove: function(item) {
                return undefined;
              }
            });

        // when
        self.find('.nestedy-item:last').find('.nestedy-remove').click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(0);
      });
    });

    context('when returns true', function() {
      it ('executes the action', function() {
        // given
        var self = $('form').nestedy({
              remove: function(item) {
                return true;
              }
            });

        // when
        self.find('.nestedy-item:last').find('.nestedy-remove').click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(0);
      });
    });

    context('when returns fase', function() {
      it ('stops the action', function() {
        // given
        var self = $('form').nestedy({
              remove: function(item) {
                return false;
              }
            });

        // when
        self.find('.nestedy-item:last').find('.nestedy-remove').click();

        // then
        expect(self.find('.nestedy-item').length).toEqual(1);
      });
    });
  });

  describe('#remove', function() {
    it ('throws exception if not pass first, last or none', function() {
      // given
      var self = $('form').nestedy();

      // when
      var proc = function() { self.nestedy('remove', 'wrong'); };

      // then
      expect(proc).toThrow(new Error("The parameter 'wrong' passed on remove function is invalid!"));
    });

    describe('first', function() {
      it ('removes the first item', function() {
        // given
        var self = $('form').nestedy({
          add: function(item) {
            item.removeAttr('id');
          }
        });

        self.find('.nestedy-item').attr('id', 'excluded');
        self.nestedy('add');

        // when
        self.nestedy('remove', 'first');

        // then
        expect(self).not.toContain('#excluded');
      });
    });

    context('last', function() {
      it ('removes the last item', function() {
        // given
        var self = $('form').nestedy({
          add: function(item) {
            item.attr('id', 'excluded');
          }
        }).nestedy('add');

        // when
        self.nestedy('remove', 'last');

        // then
        expect(self).not.toContain('#excluded');
      });
    });

    context('number', function() {
      it ('removes the given item number', function() {
        // given
        var self = $('form').nestedy({
          add: function(item) {
            item.attr('id', 'excluded');
          }
        }).nestedy('add');

        // when
        self.nestedy('remove', 2);

        // then
        expect(self).not.toContain('#excluded');
      });
    });

    describe('number as string', function() {
      it ('removes the given item number', function() {
        // given
        var self = $('form').nestedy({
          add: function(item) {
            item.attr('id', 'excluded');
          }
        }).nestedy('add');

        // when
        self.nestedy('remove', '2');

        // then
        expect(self).not.toContain('#excluded');
      });
    });
  });

  describe(':template', function() {
    beforeEach(function() {
      $('.nestedy').empty();

      Factory.append(
        '<div id="template" class="template">' +
          '<input id="some_0_value" type="text" name="some[0][value]" class="input" />' +
          '<i class="nestedy-remove"></i>' +
        '</div>'
      );
    });

    context('on add', function() {
      it ('searchs the item on the document to be cloned', function() {
        // given
        var self = $('form').nestedy({ model: '.template', template: '#template' });

        // when
        self[0].addButton.click();

        // then
        expect(self.find(self[0].opt.model)).toExist();
      });

      it ('clears the wrapper id copied from the clone', function() {
        // given
        var self = $('form').nestedy({ model: '.template', template: '#template' });

        // when
        self[0].addButton.click();

        // then
        expect(self.find(self[0].opt.model).attr('id')).toBeUndefined();
      });

      it ('reorder the fields inside the .nestedy', function() {
        // given
        var self = $('form').nestedy({ model: '.template', template: '#template' });

        // when
        self[0].addButton.click().click();

        // then
        expect(/\[0\]/.test(self.find('.template:first :input').attr('name'))).toBeTruthy();
        expect(/\[1\]/.test(self.find('.template:last :input').attr('name'))).toBeTruthy();
      });

      context('with other element on body with same name as the model used inside a form', function() {
        beforeEach(function() {
          Factory.append('<div class="nestedy-item">should be ignored</div>');
        });

        it ('searchs the template by template option on body context and ignores the model option', function() {
          // given
          var self = $('form').nestedy({ model: '.nestedy-item', template: '#template' });

          // when
          self[0].addButton.click();

          // then
          expect(self).toContain('.template');
          expect(self).not.toContain('.nestedy-item');
        });
      });
    });

    context('on remove', function() {
      it ('removes item', function() {
        // given
        var self = $('form').nestedy({ model: '.template', template: '#template' });

        self[0].addButton.click();

        // when
        self.find('.template:last').find('.nestedy-remove').click();

        // then
        expect(self.find('.template').length).toEqual(0);
      });

      context('with focus last', function() {
        it ('focus the first field of the last item', function() {
          // given
          var self = $('form').nestedy({ model: '.template', template: '#template', focus: ':last' });

          self[0].addButton.click().click();

          // when
          self.find('.template:last').find('.nestedy-remove').click();

          // then
          expect(self.find(self[0].opt.model).last().find(':input:first')).toBeFocused();
        });
      });

      context('with focus first', function() {
        it ('does not focus the first field of the first item', function() {
          // given
          var self = $('form').nestedy({ model: '.template', template: '#template', focus: ':first' });

          self[0].addButton.click().click();

          // when
          self.find('.template:last').find('.nestedy-remove').click();

          // then
          expect(self.find(self[0].opt.model).first().find(':input:first')).toBeFocused();
        });
      });
    });
  });
});

describe('multiple-nestedy.html', function() {
  beforeEach(function() {
    Factory.html(
      '<form>' +
        '<div class="nestedy container-1">' +
          '<div class="nestedy-item">' +
            '<input id="container-1_0_container-1" type="number" name="container-1[0][container-1]" />' +

            '<i class="nestedy-remove">remove</i>' +
          '</div>' +
        '</div>' +

        '<i data-nestedy=".container-1" class="nestedy-add">add container-1</i>' +

        '<div class="nestedy container-2">' +
          '<div class="nestedy-item">' +
            '<input id="container-2_0_container-2" type="number" name="container-2[0][container-2]" />' +

            '<i class="nestedy-remove">remove</i>' +
          '</div>' +
        '</div>' +

        '<i data-nestedy=".container-2" class="nestedy-add">add container-2</i>' +
      '</form>'
    );
  });

  afterEach(function() { Factory.clear(); });

  describe('add', function() {
    context('with more than one add button', function() {
      context('with data-nestedy', function() {
        context('clicking on last one', function() {
          it ('creates one more item only inside the last nestedy', function() {
            // given
            var self = $('form');

            // when
            self.nestedy();

            $(self[0].addButton).last().click();

            // then
            expect(self.children('.nestedy:last').children().length).toEqual(2);
          });
        });
      });

      context('without data-nestedy', function() {
        beforeEach(function() {
          $('.nestedy-add').removeAttr('data-nestedy');
        });

        it ('throws an exception', function() {
          // given
          var self = $('form');

          // when
          self.nestedy();

          var proc = function() { $(self[0].addButton).last().click(); }

          // then
          expect(proc).toThrow(new Error('You have multiple add buttons and the clicked one has no the `data-nestedy` attribute!'));
        });
      });

      context('after all nestedy be removed from DOM', function() {
        it ('throws an exception', function() {
          // given
          var self = $('form').nestedy();

          self.find('.nestedy-remove').click();

          // when
          $(self[0].addButton).last().click();

          // then
          expect(self.children('.nestedy:last').children().length).toEqual(1);
        });
      });
    });
  });
});
