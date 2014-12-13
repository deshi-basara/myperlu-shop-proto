(function () {

    'use strict';

    angular
        .module('app')
        .controller('PlannerCtrl', PlannerCtrl);

    PlannerCtrl.$inject = ['$rootScope'];

    /**
     * Handles the landing view and all interactions
     */
    function PlannerCtrl($rootScope) {
        var ctrl = this;

        /**
         * Changes the current slide position.
         * @param  {int} newPos [New slide position]
         */
        function changeSlidePos(newPos) {
            ctrl.slidePos = newPos;
        }

        /**
         * Calculates the box-item slidingTransition which is returned to the ngStyles of all '.planner-box-box-item'
         * @param  {int}     index [Index of the current '.planner-box-box-item'-div]
         * @return {String}        [New translate3d-position of the '.planner-box-box-item' on our box]
         */
        function slideBoxTo() {
            console.log('-webkit-transform: translate3d('+ parseInt(ctrl.slidePos) * -100  +'%,0,0)');
            return {'-webkit-transform': 'translate3d('+ parseInt(ctrl.slidePos) * -100  +'%,0,0)'};
        }

        //////////////////////

        angular.extend(ctrl, {
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

    }

})();