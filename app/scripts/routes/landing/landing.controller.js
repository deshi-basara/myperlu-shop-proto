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
                        $rootScope.$broadcast('loader.hide');

                        // start the video
                        $('#video-section video').get(0).play();

                    }, 500);
                },
            });
        });

        /**
         * Starts a specified animation, when a certan pagepile enters the viewport
         * @param  {int}    index [Current pagepile]
         */
        function checkPillingAnimation(index) {
            // Section 2 aninmation
            if(index === 2 && !ctrl.startAnimation.productSlider) {
                $scope.$apply(function() {
                    ctrl.startAnimation.productSlider = true;
                });
            }
            // Section 3 aninmation
            else if(index === 3 && !ctrl.startAnimation.teaserBoxes) {
                $scope.$apply(function() {
                    ctrl.startAnimation.teaserBoxes = true;
                });
            }
        }

        /**
         * Holdes the current sliderIndex and computes it with the length of the
         * sliderArray.
         * @return {String} [SliderIndex / SliderLength]
         */
        function sliderIndex() {
            return (parseInt(ctrl.sliderPos.index) + 1) + ' / ' + ctrl.slidesArray.length;
        }

        /**
         * Calculates the slider slidingTransition which is returned to the ngStyles of all '.product-image'
         * @param  {int}     index [ngRepeat-$index of the current '.product-image'-div]
         * @return {String}        [New translate3d-position of the '.product-image' in our slider]
         */
        function sliderTranslate(index) {
            return {'-webkit-transform': 'translate3d('+ parseInt(ctrl.sliderPos.index) * -410  +'px,0,0)'};
        }

        /**
         * Redirects the user to the planner-state
         */
        function startPlanning() {
            $state.go('planner');
        }

        //////////////////////

        angular.extend(ctrl, {
            sliderPos: {index: 0},
            slidesArray: [{name: 'blau.png', price: 100}, {name: 'gelb.png', price: 100}, {name: 'rosa.png', price: 100},{name: 'blau.png', price: 100}, {name: 'gelb.png', price: 100}, {name: 'rosa.png', price: 100}],
            startAnimation: {
                teaserBoxes: false,
                productSlider: false
            },

            sliderIndex: sliderIndex,
            sliderTranslate: sliderTranslate,

            startPlanning: startPlanning
        });
    }

})();