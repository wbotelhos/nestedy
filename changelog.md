# jQuery Nestedy - A nested fields creator - http://wbotelhos.com/nestedy

## Soon

### Fixes

- Hidden fields with value were cleared.

### Changes

- The option `excludes` now can receive a callback like `filter` to choose the field.

### News

- Added option `destroy` to just hide the item and adds a hidden field `_destroy` as `true`.
- Added option `destroyex` to indicate what part of the field name will be replace to `_destroy`.
- Added option `clear` to choose the fields will be cleared.

### Bugfix

## 0.1.2

- Added some fields types of HTML 4 and 5 to typeful option.

## 0.1.1

- Added new options checkable, selectable and typeful to fix the clear method.

## 0.1.0

- Option 'add' that is the callback for add action;
- Option 'addButton' to change the add button hook;
- Option 'content' to change the place the cloned item goes;
- Option 'excludes' to select the elements to be excluded on clone;
- Option 'focus' to change where the focus goes;
- Option 'idx' to change the regex that scans the dynamic part of the field id.
- Option 'model' to change the container that will be the model;
- Option 'namex' to change the regex that scans the dynamic part of the field name.
- Option 'remove' that is the callback for remove action;
- Option 'removeButton' to change the remove button hook;
- Option 'template' to select an external model.
