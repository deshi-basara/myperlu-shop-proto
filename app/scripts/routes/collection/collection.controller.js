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

  // body...
  if(ismobile == true){
    var $container = $('#isotope');
    var $container2 = $('#isotope2');

    var height = $container.width();

    $('.item').height(height+60);
    $('.item').width(height);


// init
$container.isotope({
  // options
  itemSelector: '.item',
 layoutMode: 'packery',

packery: {
  gutter: 2
}
});

$container2.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'packery',

packery: {
  gutter: 2
}
});

$container.on( 'click', '.button-more-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').hide();

  $item.children('.short-info').hide();
  $item.children('.long-info').show(); 

  height = $item.width();
  $item.height(height*2.7);

  $container.isotope('layout');
});

$container.on( 'click', '.button-less-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').hide();
  
  $item.children('.long-info').hide();
  $item.children('.short-info').show(); 

  height = $item.width();
  $item.height(height+60);

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

  var $item = $(this).parent().parent();
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

// init
$container.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'packery',

packery: {
  gutter: 10
}

});

$container2.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'packery',

packery: {
  gutter: 10
}

});

$('.item').hover(function() {

  if (!$(this).hasClass('gigante')){

    $(this).children('.short-info').animate({
      opacity: 1
    }, 300); 
  }
},  function() {

 if (!$(this).hasClass('gigante')){

  $(this).children('.short-info').animate({
    opacity: 0
  }, 300); 
}

});

$container.on( 'click', '.button-more-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').hide();
  

  $item.children('.short-info').hide();
  $item.children('.long-info').show(); 

  height = $item.width();
  $item.height(height*2+10);
  $item.width(height*2+10);

  $container.isotope('layout');
});

$container.on( 'click', '.button-less-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').show();
  
  $item.children('.long-info').hide();
  $item.children('.short-info').show(); 

  height = $item.width();
   $item.height((height/2)-5);
  $item.width((height/2)-5);

  $container.isotope('layout');
});


$container2.on( 'click', '.button-more-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').hide();

  $item.children('.short-info').hide();
  $item.children('.long-info').show(); 

  height = $item.width();
   $item.height((height*2)+10);
  $item.width((height*2)+10);

  $container2.isotope('layout');
});

$container2.on( 'click', '.button-less-infos', function() {

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  $item.children('h3').show();
  
  $item.children('.long-info').hide();
  $item.children('.short-info').show(); 

  height = $item.width();
  $item.height((height/2)-5);
  $item.width((height/2)-5);

  $container2.isotope('layout');
});
}

});

}

})();