(function () {

    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$location', '$rootScope', '$timeout'];

    /**
     * Handles the landing view and all interactions
     */
    function MainCtrl($scope, $location, $rootScope, $timeout) {
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
         * Fakes a login in our modal.
         */
        function submitLogin() {
            main.showModal = false;
            main.loggedIn = true;
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
            isLoading: true,
            loggedIn: false,
            showFeedback: false,
            showLogin: true,
            showNav: false,
            showModal: false,
            priceTotal: 0,

            bagItems: 0,
            complete: {
                gehaeuse: true,
                material: false,
                ausstattung: false,
                farben: false,
                extras: false
            },

            checkoutBag: checkoutBag,
            isActive: isActive,
            submitLogin: submitLogin,
            toggleBag: toggleBag,
        });

        /////////////////////

        /**
         * Listens for new shopping bag items.
         */
        $scope.$on('bag.add', function() {
            main.bagOpen = true;
            main.bagItems++;
        });

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


        /**
         * Listen for fake loader events.
         */
        $rootScope.$on('$locationChangeStart', function() {
            main.isLoading = true;
        });
        $rootScope.$on('$locationChangeSuccess', function() {
            $timeout(function() {
                main.isLoading = false;
            }, 1600);
        });
    }

})();