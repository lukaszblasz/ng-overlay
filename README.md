# ng-overlay
Overlay directive to use with Agular 1.*

Directive is responsible for displaying data in a form of overlay. We are able to pass whole templates to overlay together with some
additional data. Directive is resposible for compiling provided template and displaying when needed.

# How to install

Directive is available on npm
```javascript
npm install ng-overlay
```
Es6 import sytax:

```javascript
import 'angular-sanitize';
import 'ng-overlay';

angular.module('myModule', ['ngOverlay']) //add dependency to ngOverlay to your module
```
In template attach directive to any elemnt:

```
<div class="test-div"
     data-ng-overlay
     data-ng-overlay-template="$ctrl.overlayTemplate"
     data-ng-overlay-data="$ctrl.overlayData"
     data-ng-overlay-on-close="$ctrl.onClose()"
     data-ng-overlay-on-show="$ctrl.onShow()"
     data-ng-overlay-close-timeout="500">
</div>
````

# Properties
| property name | Description   |
| ------------- |:-------------:| 
| data-ng-overlay | is required to attach directive to element |
| data-ng-overlay-template | angular template which will be displayed inside overlay, template may include angular oprerations or simple angular components with bindings, in template we shoudl use only items which comes from data-ng-ovverlay-data, they will be available under ngOverlayData variable in template | 
| data-ng-overlay-data | object with data to fill overlay | 
| data-ng-overlay-on-close | method called after closing overlay|
| data-ng-overlay-on-show | method called afetr showing overlay |
| data-ng-overlay-close-timeout| timeout after overlay will be closed(helpfull when attaching css animation to element) |

#Example usage
For working examples please see /examples section.



