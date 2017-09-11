import template from './overlay.template';
import './overlay.scss';

class OverlayDirective {

    classes() {
        return {
            overlayWrapper: 'ng-overlay-wrapper'
        };
    }

    constructor($compile, $timeout) {
        this.$compile = $compile;
        this.$timeout = $timeout;

        this.restrict = 'A';
        this.scope = {
            ngOverlayTemplate: '<',
            ngOverlayTrigger: '@',
            ngOverlayData: '<',
            ngOverlayShow: '&ngOverlayOnShow',
            ngOverlayClose: '&ngOverlayOnClose',
            ngOverlayCloseTimeout: '@'
        };

        this.replace = true;
    }

    link(scope, el, attrs) {
        this.handleEvents(el, scope);

        scope.$watch('ngOverlayData', (newValue, oldValue) => {
            if (newValue && newValue.visible === true) {
                this.createOverlayContainer(scope);
            } else if (newValue && newValue.visible === false) {
                this.closeOverlay(scope);
            }
        }, true);
    }

    closeOverlay(scope) {
        if(scope.ngOverlayCloseTimeout) {
            this.$timeout(()=> {
                this.closeOverlayActions(scope);
            }, parseInt(scope.ngOverlayCloseTimeout));
        }
        else {
            this.closeOverlayActions(scope);
        }
    }

    closeOverlayActions(scope){
        if (this.overlayWrapper) {
            this.overlayWrapper.remove();
        }

        if (scope.ngOverlayClose) {
            scope.ngOverlayClose();
        }
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
        this.$timeout(()=> {
            if(this.ngOverlayOnShow){
                this.ngOverlayOnShow();
            }
        }, 0)
    }

    handleEvents(el, scope) {
        el.on(scope.ngOverlayTrigger, () => {
            this.createOverlayContainer(scope);
            scope.$apply();
        });

        scope.close = () => {
            scope.ngOverlayData.visible = false;
        };
    }
}

OverlayDirective.$inject = ['$compile', '$timeout'];

angular.module('ngOverlay', ['ngSanitize'])
.directive('ngOverlay', ($compile, $timeout) => new OverlayDirective($compile, $timeout));