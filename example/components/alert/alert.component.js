class appComponentController {
    constructor(){
        this.inputValue = "";
    }

    triggerAlert() {
        alert(this.inputValue);
    }
}

let appComponent = {
    controller: appComponentController,
    template: `<input placeholder="Put text here" type="text" ng-model="$ctrl.inputValue">
                <button ng-click="$ctrl.triggerAlert()">Alert text from input</button>`
};

angular.module('alertComponentModule', [])
    .component('alertComponent', appComponent);