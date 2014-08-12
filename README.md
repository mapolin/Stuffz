# Framework

### Usage:

 * .Extend(name, object, overwrite, save)
```
@name -> String
@object -> Object, Function
@overwrite -> If @name exists, overwrite it?
@save -> If @name exits, save a copy called '_name'
@return -> Newly created/overwritten method
```
```
#Extending the framework:
Framework.Extend('Object', {}); -> produces Framework.Object
Framework.Extend('Object:Method', {}) -> adds 'Method' to Framework.Object, producing Framework.Object.Method
Framework.Extend('Object', 'hello', true) -> overwrites previously created Object {} with 'hello'
Framework.Extend('Object', 'there', true, true) -> overwrites previously set Object='hello', but it can still be accessed via Framework._Object
```
 * .is(object, 'type')
```
@object -> Object, Function
@type -> String, Number, Array, Object, Global variable/function, Function
@return -> Boolean
```
 * .Date.compare(date1, date2)
```
@date1 -> Date
@date2 -> Date
@return -> Boolean
```
 * .Device()
```
@return -> String (iPhone, iPad, Android, etc)
```
 * .ClassUtil.swap(element, classes)
```
@element -> jQuery(element)
@classes -> 
    [string, string] 
    [obj, obj, ..., obj] -> obj = {on: string, off: string}
```
 * .parse
   * .date(date)
   ```
   @date -> Date
   @return -> String (mm/dd/yy)
   _todo -> format
   ```
   * .toRem(value)
   ```
   @value -> String | Number
   @return String (value in REM - '1.25rem')
   ```
   * .toPx(value)
   ```
   @value -> String | Number
   @return String (value in PX - '1.25px')
   ```
