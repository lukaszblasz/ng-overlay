import './components/app/app.component';

angular.module('overlayApp',
    [
        'appComponentModule'
    ])
    .config([function () {
        "use strict";

    }
    ]);

angular.element(function() {
    let overlayApp  = document.querySelectorAll('.overlay-app');
    angular.bootstrap(overlayApp[0], ['overlayApp']);
});