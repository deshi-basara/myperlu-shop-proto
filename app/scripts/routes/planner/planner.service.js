(function() {

    'use strict';

    angular
        .module('app')
        .factory('PlannerService', PlannerService);

    PlannerService.$inject = [];

    /**
     * Service for checking if the current user is authenticated
     */
    function PlannerService() {

        var service = {
            colors: [
                '#5DF3C0', '#5DB0C6', '#EDEFF0', '#A7DBD9', '#F37A5D', '#555A5C',
                '#7C8990', '#5ACA00', '#4BBFC3', '#8f88b8', '#ffd1b2', '#c5e5b4'
            ],
            materials: ['Aluminium', 'Leder', 'Polyester', 'Synthetik', 'Synthetik2', 'Titan'],
            sizes: ['Handgepäck', 'Mittel', 'Groß', 'Extra-Groß'],

            getAllColors: getAllColors,
            getAllMaterials: getAllMaterials,
            getAllSizes: getAllSizes

        };

        return service;

        ///////////////

        /**
         * Returns all available colors.
         * @return {array}
         */
        function getAllColors() {
            return service.colors;
        }

        /**
         * Returns all available materials.
         * @return {array}
         */
        function getAllMaterials() {
            return service.materials;
        }

        /**
         * Returns all available sizes.
         * @return {array}
         */
        function getAllSizes() {
            return service.sizes;
        }



    }


})();