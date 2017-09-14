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
<div class="test-dic"
     data-ng-overlay
     data-ng-overlay-template="$ctrl.overlayTemplate"
     data-ng-overlay-data="$ctrl.overlayData"
     data-ng-overlay-on-close="$ctrl.onClose()"
     data-ng-overlay-on-show="$ctrl.onShow()"
     data-ng-overlay-close-timeout="500">
</div>
````

# How to use
For example usacases see 'examples' sectin.
