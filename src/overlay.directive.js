import 'angular';
import 'angular-sanitize';

import template from './overlay.template';

class OverlayDirective {

    classes() {
        return {
            overlayWrapper:'ng-overlay-wrapper'
        }
    }

    constructor($compile, $sce) {
        this.$compile = $compile;
        this.$sce = $sce;

        this.restrict = 'A';
        this.scope = {
            ngOverlayTemplate: '<',
            ngOverlayTrigger: '@',
            ngOverlayData: '<'
        };
        
        this.replace = true;
    }

    link(scope, el, attrs){
        this.handleEvents(el, scope);
    }

    createOverlayContainer(scope) {
        let classes = this.classes();
        this.overlayWrapper = document.querySelectorAll(`.${classes.overlayWrapper}`);

        if(this.overlayWrapper.length){
            this.overlayWrapper.remove();
        }

        let body = angular.element(document.getElementsByTagName('body')[0]);

        this.overlayWrapper = angular.element(template(scope.ngOverlayTemplate));
        body.append(this.$compile(this.overlayWrapper)(scope));
    }

    handleEvents(el, scope) {
        el.on(scope.ngOverlayTrigger, () => {
            this.createOverlayContainer(scope);
        });

        scope.close = () => {
            this.overlayWrapper.remove();
        }
    }
}

OverlayDirective.$inject = ['$compile', '$sce'];

angular.module('ngOverlay', ['ngSanitize'])
.directive('ngOverlay', ($compile, $sce) => new OverlayDirective($compile, $sce));