(function () {

    'use strict';

    angular
        .module('app')
        .controller('PlannerCtrl', PlannerCtrl);

    PlannerCtrl.$inject = ['$window','$stateParams','$location','$scope', '$rootScope', '$timeout'];

    /**
     * Handles the landing view and all interactions
     */
    function PlannerCtrl($window, $stateParams, $location, $scope, $rootScope, $timeout) {
        var ctrl = this;

        /**
         * Initiate pagepilling when the dom is ready
         */
        angular.element(document).ready(function () {
            $('#planner').pagepiling({
                menu: null,
                direction: 'horizontal',
                verticalCentered: true,
                sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                anchors: [],
                scrollingSpeed: 700,
                easing: 'swing',
                loopBottom: false,
                loopTop: false,
                css3: true,
                navigation: false,
                normalScrollElements: null,
                normalScrollElementTouchThreshold: 5,
                touchSensitivity: 5,
                keyboardScrolling: true,
                sectionSelector: '.section',
                animateAnchor: false,

                //events
                onLeave: function(index, nextIndex, direction) {
                    $rootScope.$broadcast('nav.change', nextIndex);
                },
                afterLoad: function(anchorLink, index) {

                },
                afterRender: function() {
                    // get the startIndex on the first load
                    var startIndex = parseInt($location.hash());

                    // fallback, if nothing was set
                    if(!startIndex) {
                        startIndex = 1;
                    }

                    // broadcast index
                    $rootScope.$broadcast('nav.change', startIndex);

                    // go to the wished index
                    $.fn.pagepiling.moveTo(startIndex);

                    // hide the loader
                    $timeout(function() {
                        $rootScope.$broadcast('loader.hide');
                    }, 1000);
                },
            });
        });

        /**
         * Watch for changes after the last url-hashbang and move to
         * the specified section.
         */
        $($window).bind('hashchange', function () {
            var newIndex = parseInt($location.hash());
            // go to the wished index
            $.fn.pagepiling.moveTo(newIndex);
        });


        //////////////////////

        angular.extend(ctrl, {

        });
    }

})();