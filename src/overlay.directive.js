import template from './overlay.template';
import './overlay.scss';

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

   link(scope, el, attrs) {
        this.handleEvents(el, scope);

        scope.$watch('ngOverlayData', (newValue, oldValue) => {
            if(newValue.visible === true){
                this.createOverlayContainer(scope);
            }
            else if(newValue.visible === false) {
                this.closeOverlay(scope);
            }
        }, true);
    }

    closeOverlay(scope) {
        scope.ngOverlayData.visible = false;
        this.overlayWrapper.remove();
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
            scope.$apply();
        });

        scope.close = () => {
            this.closeOverlay(scope)
        };
    }
}

OverlayDirective.$inject = ['$compile'];

angular.module('ngOverlay', ['ngSanitize'])
.directive('ngOverlay', ($compile) => new OverlayDirective($compile));