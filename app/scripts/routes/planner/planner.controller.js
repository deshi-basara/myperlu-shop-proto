(function () {

    'use strict';

    angular
        .module('app')
        .controller('PlannerCtrl', PlannerCtrl);

    PlannerCtrl.$inject = ['$rootScope', '$timeout'];

    /**
     * Handles the landing view and all interactions
     */
    function PlannerCtrl($rootScope, $timeout) {
        var ctrl = this;

        /**
         * Changes the current slide position.
         * @param  {int} newPos [New slide position]
         */
        function changeSlidePos(newPos) {
            ctrl.slidePos = newPos;

            // if the drag wasn't initiated yet, initiate it!
            if(!ctrl.initDrag) {
                initDragUsability();
            }
        }

        /**
         * Initiates all needed events and listeners for the drag interaction.
         */
        function initDragUsability() {
            // get all circles
            var $circles = $('.color-circle');
            console.log($circles);

            // make them draggable
            var dragCircles = new Draggabilly($circles[0], {
                containment: '.planner'
            });

            // fired on 'dragMove'
            dragCircles.on('dragStart', function(draggieInstance, event, pointer) {

                // get the part, that shoud be highlighted
                var part = draggieInstance.element.dataset.part;
                console.log(part);
                console.log('.svg-'+part);
                $('.svg-'+part).attr('fill', '#E66E4C');


                // highlight
                
                console.log('dragStart');
                console.log(draggieInstance);
            });

            // fired on 'dragEnd'
            dragCircles.on('dragEnd', function(draggieInstance, event, pointer) {
                var onDropArea = false;

                // move the circle back, when it is not dropped on the dropArea
                if(!onDropArea) {
                    // reset translation value & left/top
                    draggieInstance.element.style.transition = 'all 1s ease-in-out';
                    draggieInstance.element.style.transform = 'translate3d(0,0,0)';
                    draggieInstance.element.style.left = 0;
                    draggieInstance.element.style.top = 0;

                    // remove the transition
                    $timeout(function() {
                        draggieInstance.element.style.transition = '';
                    }, 1000);
                }
            });
        }

        /**
         * Calculates the box-item slidingTransition which is returned to the ngStyles of all '.planner-box-box-item'
         * @param  {int}     index [Index of the current '.planner-box-box-item'-div]
         * @return {String}        [New translate3d-position of the '.planner-box-box-item' on our box]
         */
        function slideBoxTo(index) {
            // opacity: 0 only, if the element is not the current element
            if(ctrl.slidePos === index) {
                return {'-webkit-transform': 'translate3d('+ parseInt(ctrl.slidePos) * -100  +'%,0,0)'};
            }
            else {
                // fake "overflow: hidden" with opacity
                return {'-webkit-transform': 'translate3d('+ parseInt(ctrl.slidePos) * -100  +'%,0,0)', 'opacity': 0};
            }

        }

        //////////////////////

        angular.extend(ctrl, {
            initDrag: false,
            showDesc: true,
            slidePos: 1,

            colors: [
                '#5DF3C0', '#5DB0C6', '#A7DBD9', '#EDEFF0', '#F37A5D', '#555A5C',
                '#7C8990', '#5ACA00', '#4BBFC3', '#8f88b8', '#ffd1b2', '#c5e5b4'
            ],

            changeSlidePos: changeSlidePos,
            slideBoxTo: slideBoxTo
        });

        /////////////////////
        ///
        /////////////////////

        $rootScope.$broadcast('nav.show');

        setTimeout(function() {
            initDragUsability();
        }, 200);
    }

})();