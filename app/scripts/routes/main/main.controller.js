(function () {

    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$location'];

    /**
     * Handles the landing view and all interactions
     */
    function MainCtrl($scope, $location) {
        var main = this;

        /**
         * Starts the checkout process after validation
         */
        function checkoutBag() {
            // validate
            if(!main.bagItems) {
                return main.showFeedback = true;
            }

        }

        /**
         * Checks if the navigation link is active
         * @param  {string}  url [Url of the navigation link]
         * @return {Boolean}     [description]
         */
        function isActive(url) {
            return url == $location.hash();
        }

        /**
         * Toggles the shopping car open state.
         */
        function toggleBag() {
            main.bagOpen = (main.bagOpen === false) ? true : false;
        }

        //////////////////////

        angular.extend(main, {
            bagOpen: false,
            isLoading: false,
            showFeedback: false,
            showNav: false,
            priceTotal: 0,

            bagItems: null,
            complete: {
                gehaeuse: true,
                material: false,
                ausstattung: false,
                farben: false,
                extras: false
            },

            checkoutBag: checkoutBag,
            isActive: isActive,
            toggleBag: toggleBag
        });

        /////////////////////
        
        /**
         * Listen for navigation changes.
         * @param  {object} broadEvent [Angular broadcast object]
         * @param  {int}    index      [Current slider index]
         */
        $scope.$on('nav.change', function(broadEvent, index) {
            $scope.$apply(function() {
                main.enabled = index;
            });
        });

        /**
         * Listens for requests to see the loader.
         */
        $scope.$on('loader.show', function() {
            $scope.$apply(function() {
                main.isLoading = true;
            });
        });

        /**
         * Listens for requests to show the nav.
         */
        $scope.$on('nav.show', function() {
            main.showNav = true;
        });

        /**
         * Listens for requests to hide the nav.
         */
        $scope.$on('nav.hide', function() {
            main.showNav = false;
        });
    }

})();