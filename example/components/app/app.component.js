import template from './app.template.html';
import overlayTemplate from './overlay.template.html';

class appComponentController {
    constructor(){
        this.overlayTemplate = overlayTemplate;
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
        }
    }
}


let appComponent = {
    controller: appComponentController,
    template: template
};


angular.module('appComponentModule', [])
    .component('appComponent', appComponent);