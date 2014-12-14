(function () {

    'use strict';

    angular
        .module('app')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$state'];

    /**
     * Handles the landing view and all interactions
     */
    function LandingCtrl($scope, $rootScope, $timeout, $state) {
        var ctrl = this;

        /**
         * Initiate pagepilling when the dom is ready
         */
        angular.element(document).ready(function () {

            setTimeout(function() {
                $('#landing').pagepiling({
                    menu: null,
                    direction: 'vertical',
                    verticalCentered: true,
                    sectionsColor: ['#EDEFF0', '#5DB0C6', '#F37A5D', '#5DB0C6'],
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
                    onLeave: function(index, nextIndex, direction) {},
                    afterLoad: function(anchorLink, index){
                        checkPillingAnimation(index);
                    },
                    afterRender: function(){

                        // show the navigation
                        $rootScope.$broadcast('nav.show');

                        // hide the loader
                        $timeout(function() {
                            // has to be index = 1 after rendering
                            checkPillingAnimation(1);

                            //$rootScope.$broadcast('loader.hide');

                        }, 500);
                    }
                });

            }, 10);
        });



        /**
         * Starts a specified animation, when a certan pagepile enters the viewport
         * @param  {int}    index [Current pagepile]
         */
        function checkPillingAnimation(index) {
            // Section 1 animation
            if(index === 1 && !ctrl.startAnimation.teaser) {
                startTeaserAnimation();
            }
            // Section 2 aninmation
            else if(index === 2 && !ctrl.startAnimation.productSlider) {

            }
            // Section 3 aninmation
            else if(index === 3 && !ctrl.startAnimation.teaserBoxes) {

            }
        }

        /**
         * Redirects to the handed ui-router-state.
         * @param  {string} stateName [ui-router state identifier]
         */
        function goToState(stateName) {
            $state.go(stateName);
        }

        /**
         * Starts the teaser animation in section 1
         */
        function startTeaserAnimation() {
            // insert all bullet points, in row
            var counter = 0;
            angular.forEach(ctrl.bullet, function(value, key) {
                $timeout(function() {
                    $scope.$apply(function() {
                        ctrl.bullet[key] = true;
                    });
                }, 2100 * counter++);
            });

            // move the bag to the left & move the phones up
            $timeout(function() {
                ctrl.moveLeft = true;
                ctrl.moveUp = true;
            }, 2300 * counter++);

            // move the testimonials in
            $timeout(function() {
                angular.forEach(ctrl.testimonial, function(value, key) {
                    ctrl.testimonial[key] = true;
                });
            }, 2100 * counter++);

            ctrl.startAnimation.teaser = true;
        }

        /**
         * Toggles the footer open state.
         * @return {boolean}
         */
        function toggleOpen() {
            return ctrl.isOpen = (ctrl.isOpen) ? false : true;
        }


        //////////////////////

        angular.extend(ctrl, {
            bullet: {
                lock: false,
                scale: false,
                tracking: false,
                location: false
            },
            isOpen: false,
            moveLeft: false,
            startAnimation: {
                teaser: false
            },
            testimonial: {
                brandon: false,
                svenja: false,
                ramona: false
            },

            goToState: goToState,
            toggleOpen: toggleOpen
        });
    }

})();