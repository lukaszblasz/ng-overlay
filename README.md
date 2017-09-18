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

```html
<div class="test-div"
     data-ng-overlay
     data-ng-overlay-template="$ctrl.overlayTemplate"
     data-ng-overlay-data="$ctrl.overlayData"
     data-ng-overlay-on-close="$ctrl.onClose()"
     data-ng-overlay-on-show="$ctrl.onShow()"
     data-ng-overlay-close-timeout="500">
</div>
```

Attach basic styles from: dist/overlay/overlay.css
Its hight recommented to create your own styling based on ones provided, dependant on your needs.

# How to use - example

In below example we have single angular component called app. App component has a button which is responsible for showing overlay.
We want to pass to overlay custom template with list of items and also execute method from our component in context of overlay
(countAlert). In below example overlay is triggered using simple click event.

```javascript 
import 'angular-sanitize';
import 'ng-overlay';

class appComponentController {
    constructor(){
        //inside template all data is available under ngOverlayData  
        this.overlayTemplate =`
           <div class='list'>
               <ul>
                    <li ng-repeat='item in ngOverlayData.items'>
                         {{item}}
                    </li>
               </ul>
               <button ng-click='ngOverlayData.countAlert(ngOverlayData.items)'>Show list count</button>
           </div>
        
        `;
        
        //examnple data we will display in overlay
        this.overlayTemplateData = {
            items: [
                {
                    name: 'test1'
                },
                {
                    name: 'test2'
                },
                {
                    name: 'test3'
                }
            ]
        };
        
        //example method called in overlay template
        this.overlayTemplateData.countAlert = (items) => {
            alert("Items length = " + items.length);
        }
    }
}


let appComponent = {
    controller: appComponentController,
    template: `
          <button 
               data-ng-overlay
               data-ng-overlay-template='$ctrl.overlayTemplate'
               data-ng-overlay-data='$ctrl.overlayTemplateData'
               data-ng-overlay-trigger="click"
          >Trigger Overlay</button> 
    `
};

angular.module('appComponentModule', ['ngOverlay'])
    .component('appComponent', appComponent);

```

# How to show/hide overlay

There are 2 ways to show overlay first(the easiest) is to attach data-ng-overlay-trigger="eventName" to any element in template.
It may be simple click or mouseenter events.

The second way(advenced) is to pass ngOverlayData.visible="true" (visible property to template overlayData object). It may be usefull when overlay should be shown after some ajax event on other action. 

Setting ngOverlayData.visible="false" will close overlay. Also X button(on overlay) and ESC will trigger overlay closing.

# How to attach animation

Animation should be attached using css. Overlay main class is 'ng-overlay-wrapper' you can attach css animation to that element easily.

Closing overlay is more complicated. After closing whole overlay data is removed from DOM. To implement hiding animation there is a need to set data-ng-overlay-close-timeout property with proper value in milisecond. After triggering closing action 'ng-overlay-closing' class will be added to 'ng-overlay-wrapper' and css animation may be attached. Css animation time should match a value we use in close-timeout property.

# Properties
| property name | Description   |
| ------------- |:-------------:| 
| data-ng-overlay | is required to attach directive to element |
| data-ng-overlay-template | angular template which will be displayed inside overlay, template may include angular oprerations or simple angular components with bindings, in template we shoudl use only items which comes from data-ng-ovverlay-data, they will be available under ngOverlayData variable in template | 
| data-ng-overlay-data | object with data to fill overlay | 
| data-ng-overlay-on-close | method called after closing overlay|
| data-ng-overlay-on-show | method called afetr showing overlay |
| data-ng-overlay-close-timeout| timeout after overlay will be closed(helpfull when attaching css animation to element) |
| data-ng-overlay-trigger| event which will show overlay |

# Example usage
For working examples please see /examples section.


