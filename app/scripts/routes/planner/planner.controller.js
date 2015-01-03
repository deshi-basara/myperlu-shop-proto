(function () {

    'use strict';

    angular
        .module('app')
        .controller('PlannerCtrl', PlannerCtrl);

    PlannerCtrl.$inject = ['$rootScope', '$timeout', 'PlannerService'];

    /**
     * Handles the landing view and all interactions
     */
    function PlannerCtrl($rootScope, $timeout, PlannerService) {
        var ctrl = this;

        /**
         * Initiate pagepilling when the dom is ready
         */
        angular.element(document).ready(function () {

            $timeout(function() {
                $('#planner').pagepiling({
                    menu: null,
                    direction: 'horizontal',
                    verticalCentered: true,
                    sectionsColor: ['#EDEFF0', '#EDEFF0', '#EDEFF0'],
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
                        //checkPillingAnimation(index);
                    },
                    afterRender: function(){

                        // show the navigation
                        $rootScope.$broadcast('nav.show');

                        // hide the loader
                        $timeout(function() {
                            // has to be index = 1 after rendering
                            //checkPillingAnimation(1);

                            //$rootScope.$broadcast('loader.hide');

                        }, 500);
                    }
                });

            }, 10);
        });

        /**
         * Is called when a new item is added to MyPerlu-bag within the
         * planner.
         * @param {[type]} part     [description]
         * @param {[type]} material [description]
         * @param {[type]} color    [description]
         */
        function addToPlannerBag(part, material, color) {

        }

        /**
         * Changes the current slide position.
         * @param  {int} newPos [New slide position]
         */
        function changeSlidePos(newPos) {
            console.log(newPos);
            ctrl.slidePos = newPos;

            // if the drag wasn't initiated yet, initiate it!
            if(!ctrl.initDrag) {
                initDragUsability();

                // hide the dragOK dialog
                ctrl.showDesc = false;
            }
        }

        /**
         * Initiates all needed events and listeners for the drag interaction.
         */
        function initDragUsability() {
            // get all circles
            var $circles = $('.color-circle');

            // make all circles draggable
            for (var i = 0; i < $circles.length; i++) {

                // attach draggabilly
                var dragCircles = new Draggabilly($circles[i], {
                    containment: '.planner'
                });

                // fired on 'dragMove'
                dragCircles.on('dragStart', onDragStart);

                // fired on 'dragEnd'
                dragCircles.on('dragEnd', onDragEnd);
            }
        }

        /**
         * Checks if the headIndex is active and returns an active-class if active.
         * @param  {int}     headIndex [Index of the head-item]
         * @return {string}            [Class-string]
         */
        function isHeadActive(headIndex) {
            if(headIndex === ctrl.slidePos) {
                return 'active';
            }
        }

        /**
         * Moves the planner to the next pagepilling step
         */
        function nextStep() {
            $.fn.pagepiling.moveSectionDown();
        }

        /**
         * Highlights onDragStart all possible dropAreas for the part & reduces
         * the opacity of all non-possible dropAreas.
         * @param  {Draggabilly}      draggieInstance [the Draggabilly instance]
         * @param  {Event }           event           [the original mousemove or touchmove event]
         * @param  {MouseEvent/Touch} pointer         [the event object that has .pageX and .pageY]
         */
        function onDragStart(draggieInstance, event, pointer) {
            // get the part, that shoud be highlighted, and highlight it
            var part = draggieInstance.element.dataset.part;

            // make non drop parts transparent
            $('.svg-path:not(.svg-'+ part +')').attr('fill-opacity', '0.3');
            // highlight drop parts
            $('.svg-'+part).attr({
                'fill': '#F37A5D',
                'fill-opacity': '0.7'
            });
        }

        /**
         * Checks if the color was placed on a valid dropArea and changes corrisponding
         * to this the part color or moves the circle back.
         * @param  {Draggabilly}      draggieInstance [the Draggabilly instance]
         * @param  {Event }           event           [the original mousemove or touchmove event]
         * @param  {MouseEvent/Touch} pointer         [the event object that has .pageX and .pageY]
         */
        function onDragEnd(draggieInstance, event, pointer) {
            console.log(draggieInstance);
            console.log(event);

            // check if the element was placed on the right dropArea
            var onDropArea = false;
            var instancePart = draggieInstance.element.dataset.part;
            var dropAreaPart = event.toElement.dataset.part;
            if(instancePart === dropAreaPart) {
                onDropArea = true;
            }

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
            else {
                // change the part's fill-color to the new color
                var draggedColor = draggieInstance.element.dataset.color;
                $('.svg-'+instancePart).attr({
                    'fill': draggedColor,
                    'fill-opacity': '1'
                });

                // reset the drop parts transparency
                $('.svg-path:not(.svg-'+ instancePart +')').attr('fill-opacity', '1');

                // hide the circle, move it back and fade it in one more time
                draggieInstance.element.style.opacity = '0';
                // reset translation value & left/top, after the previous transition has finished
                $timeout(function() {

                    draggieInstance.element.style.left = 0;
                    draggieInstance.element.style.top = 0;
                    // fade it back
                    draggieInstance.element.style.opacity = '1';

                }, 700);
            }
        }

        /**
         * Moves the planner to the previous pagepilling step
         */
        function previousStep() {
            $.fn.pagepiling.moveSectionUp();
        }

        /**
         * Calculates the box-item slidingTransition which is returned to the ngStyles of all '.planner-box-box-item'
         * @param  {int}     index [Index of the current '.planner-box-box-item'-div]
         * @return {String}        [New translate3d-position of the '.planner-box-box-item' on our box]
         */
        function slideBoxTo(index) {
            console.log(ctrl.slidePos+ '===' + index);
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
            slidePos: 0,

            colors: PlannerService.getAllColors(),
            materials: PlannerService.getAllMaterials(),
            sizes: PlannerService.getAllSizes(),

            changeSlidePos: changeSlidePos,
            isHeadActive: isHeadActive,
            nextStep: nextStep,
            previousStep: previousStep,
            slideBoxTo: slideBoxTo
        });

        /////////////////////
        ///
        /////////////////////

    }

})();