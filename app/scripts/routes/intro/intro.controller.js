(function () {

    'use strict';

    angular
        .module('app')
        .controller('IntroCtrl', IntroCtrl);

    IntroCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$state'];

    /**
     * Handles the landing view and all interactions
     */
    function IntroCtrl($scope, $rootScope, $timeout, $state) {
        var ctrl = this;

        /**
         * Initiate animation when the dom is ready
         */
        angular.element(document).ready(function () {
            startFakeLoading();
        });

        /**
         * Redirects to the handed ui-router-state.
         * @param  {string} stateName [ui-router state identifier]
         */
        function goToState(stateName) {
            $state.go(stateName);
        }

        /*
         * Starts the fake loading process and initiates the
         * starting animation
         */
        function startFakeLoading() {
            // calculate the progress
            ctrl.loadingProgress += 10;

            // increment progress until 100
            if(ctrl.loadingProgress === 100) {
                // start animation after 700ms
                $timeout(function() {
                    ctrl.startAnimation = true;
                }, 700);
            }
            else {
                // recursion until 100
                $timeout(function() {
                    startFakeLoading();
                }, 500);
            }
        }

        //////////////////////

        angular.extend(ctrl, {
            loadingProgress: 0,
            startAnimation: false,

            goToState: goToState
        });
    }

})();