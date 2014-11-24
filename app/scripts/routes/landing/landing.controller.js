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
            $('#landing').pagepiling({
                menu: null,
                direction: 'vertical',
                verticalCentered: true,
                sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                anchors: [],
                scrollingSpeed: 700,
                easing: 'swing',
                loopBottom: false,
                loopTop: false,
                css3: true,
                navigation: false/*{
                    'textColor': '#FFA600',
                    'bulletsColor': '#f2f2f2',
                    'position': 'left',
                    'tooltips': ['Start', 'Fertige Produkte', 'Zum Konfigurator']
                }*/,
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

                    // hide the loader
                    $timeout(function() {
                        // has to be index = 1 after rendering
                        checkPillingAnimation(1);

                        //$rootScope.$broadcast('loader.hide');

                    }, 500);
                },
            });
        });


        /**
         * Starts a specified animation, when a certan pagepile enters the viewport
         * @param  {int}    index [Current pagepile]
         */
        function checkPillingAnimation(index) {
            console.log(index);
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
         * Starts the teaser animation in section 1
         */
        function startTeaserAnimation() {
            // insert all bullet points, in row
            var counter = 1;
            angular.forEach(ctrl.bullet, function(value, key) {
                $timeout(function() {
                    ctrl.bullet[key] = true;
                    console.log(ctrl.bullet[key]);
                }, 3000 * counter++);
            });
        }




        //////////////////////

        angular.extend(ctrl, {
            bullet: {
                lock: false,
                tracking: false,
                scale: false,
                location: false
            },
            startAnimation: {
                teaser: false
            }
        });
    }

})();