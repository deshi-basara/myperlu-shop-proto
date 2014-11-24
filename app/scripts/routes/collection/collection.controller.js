(function () {

    'use strict';

    angular
        .module('app')
        .controller('CollectionCtrl', CollectionCtrl);

    CollectionCtrl.$inject = ['$rootScope', '$timeout'];

    /**
     * Handles the landing view and all interactions
     */
    function CollectionCtrl($rootScope, $timeout) {
        var ctrl = this;

        /**
         * Initiate isotope when the dom is ready
         */
        angular.element(document).ready(function () {

            var ismobile = false;

            var winWidth = $(window).width();

            if(winWidth <= 450){
                ismobile = true;
            }
            console.log(ismobile);


        if(ismobile == true){
            var $container = $('#isotope');
            var $container2 = $('#isotope2');

            var height = $container.width();

            $('.item').height(height+70);
            $('.item').width(height);

            console.log($container);


        // init
        $container.isotope({
          // options
          itemSelector: '.item',
          layoutMode: 'fitRows',

          masonry: {
            columnWidth: 50
          }
        });

        $container2.isotope({
          // options
          itemSelector: '.item',
          layoutMode: 'fitRows',

          masonry: {
            columnWidth: 50
          }
        });

        $container.on( 'click', '.button-more-infos', function() {

          var $item = $(this).parent().parent();
          $item.toggleClass('gigante');


          $item.children('.short-info').hide();
          $item.children('.long-info').show();

          height = $item.width();
          $item.height(height*2.7);

          $container.isotope('layout');
        });

        $container.on( 'click', '.button-less-infos', function() {

          var $item = $(this).parent().parent().parent();
          $item.toggleClass('gigante');

          $item.children('.long-info').hide();
          $item.children('.short-info').show();

          height = $item.width();
          $item.height(height+70);

          $container.isotope('layout');
        });


        $container2.on( 'click', '.button-more-infos', function() {

          var $item = $(this).parent().parent();
          $item.toggleClass('gigante');


          $item.children('.short-info').hide();
          $item.children('.long-info').show();

          height = $item.width();
          $item.height(height*2.7);

          $container2.isotope('layout');
        });

        $container2.on( 'click', '.button-less-infos', function() {

          var $item = $(this).parent().parent().parent();
          $item.toggleClass('gigante');

          $item.children('.long-info').hide();
          $item.children('.short-info').show();

          height = $item.width();
          $item.height(height+70);

          $container2.isotope('layout');
        });
        }



        else if(ismobile == false){
          var $container = $('#isotope');
          var $container2 = $('#isotope2');

          var height = ($container.width()/4)-2;
          console.log(height);

          $('.item').height(height);
          $('.item').width(height);


            // init
            $container.isotope({
              // options
              itemSelector: '.item',
              layoutMode: 'fitRows',

              masonry: {
                columnWidth: 50
              }
            });

            $container2.isotope({
              // options
              itemSelector: '.item',
              layoutMode: 'fitRows',

              masonry: {
                columnWidth: 50
              }
            });

            $('.item').hover(function() {

              if (!$(this).hasClass('gigante')){

                $(this).children('.short-info').animate({
                  opacity: 1
                }, 200);
              }
            },  function() {

             if (!$(this).hasClass('gigante')){

              $(this).children('.short-info').animate({
                opacity: 0
              }, 200);
            }

            });

            $container.on( 'click', '.button-more-infos', function() {

              var $item = $(this).parent().parent();
              $item.toggleClass('gigante');


              $item.children('.short-info').hide();
              $item.children('.long-info').show();

              height = $item.width();
              $item.height(height*2);
              $item.width(height*2);

              $container.isotope('layout');
            });

            $container.on( 'click', '.button-less-infos', function() {

              var $item = $(this).parent().parent().parent();
              $item.toggleClass('gigante');

              $item.children('.long-info').hide();
              $item.children('.short-info').show();

              height = $item.width();
              $item.height(height/2);
              $item.width(height/2);

              $container.isotope('layout');
            });


            $container2.on( 'click', '.button-more-infos', function() {

              var $item = $(this).parent().parent();
              $item.toggleClass('gigante');


              $item.children('.short-info').hide();
              $item.children('.long-info').show();

              height = $item.width();
              $item.height(height*2);
              $item.width(height*2);

              $container2.isotope('layout');
            });

            $container2.on( 'click', '.button-less-infos', function() {

              var $item = $(this).parent().parent().parent();
              $item.toggleClass('gigante');

              $item.children('.long-info').hide();
              $item.children('.short-info').show();

              height = $item.width();
              $item.height(height/2);
              $item.width(height/2);

              $container2.isotope('layout');
            });
            }



            // hide the loader after 1000ms
            $timeout(function() {
                $rootScope.$broadcast('loader.hide');
            }, 1000);

        });

        //////////////////////

        angular.extend(ctrl, {

        });
    }

})();