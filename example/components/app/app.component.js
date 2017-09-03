import './../alert/alert.component';
import template from './app.template.html';
import overlayTemplate from './overlay.template.html';
import overlayTemplate2 from './overlay2.template.html';

class appComponentController {
    constructor(){
        this.overlayTemplate1 = overlayTemplate;
        this.overlayTemplateData1 = {
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

        this.overlayTemplate2 = overlayTemplate2;
    }
}


let appComponent = {
    controller: appComponentController,
    template: template
};

angular.module('appComponentModule', ['ngOverlay', 'alertComponentModule'])
    .component('appComponent', appComponent);