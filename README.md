# jQuery Nestedy - A nested fields creator - [wbotelhos.com/nestedy](http://wbotelhos.com/nestedy)

jQuery Nestedy is a plugin to create dynamically nested fields.

## Version

```
@version        0.1.0
@since          2013-08-14
@author         Washington Botelho
@documentation  wbotelhos.com/nestedy
@twitter        twitter.com/wbotelhos
```

## Required Files

+ jquery.nestedy.js

## Options

```js
add          : undefined                                  // Callback trigged when the add button is clicked.
addButton    : '.nestedy-add'                              // The add button element.
content      : '.nestedy'                                  // Place where the items will be copied.
excludes     : ['id$="id"', 'ame$="id"', 'name$="id\\]"'] // Selectors used to exclude field of a item before clone it.
focus        : ':last'                                    // The item you want focus, you can choose `:first`, `:last` or `undefined`.
idx          : /(_)\d(_)/                                 // Regex used to find the dynamic parte of the id of the field that will be changed.
model        : '.nestedy-item'                             // The element inside the `content` that will be used as a model to be cloned.
namex        : /(\[)\d(\])/                               // Regex used to find the dynamic parte of the name of the field that will be changed.
remove       : undefined                                  // Callback trigged before an item be removed.
removeButton : '.nestedy-remove'                           // The class name of the remove button.
template     : undefined                                  // The element inside the `body` that will be used as a model to be cloned.
```

## Usage without template

```html
<form>
  <div class="nestedy">
    <div class="nestedy-item">
      <input id="some_0_value" name="some[0][value]">
      <i class="nestedy-remove"></i>
    </div>
  </div>

  <i class="nestedy-add"></i>
</form>
```

```js
$('form').nestedy();
```

## Usage with template

```html
<div id="template" class="nestedy-item">
  <input id="some_0_value" name="some[0][value]">
  <i class="nestedy-remove"></i>
</div>

<form>
  <div class="nestedy"></div>
  <i class="nestedy-add"></i>
</form>
```

```js
$('form').nestedy({
  idx      : /{index}/,
  namex    : /{index}/,
  template : '#template'
});
```

## Functions

```js
$('form').nestedy('add', 2); // Adds a number of items. Ommiting the number, 1 is de default.

$('form').nestedy('remove', 3); // Removes a item. `first`, `last` or the number. Ommiting it, last is de default.
```

## Licence

The MIT License

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Nestedy). Thanks! (:
