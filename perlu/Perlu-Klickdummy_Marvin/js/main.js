$(function (){
	// body...

var $container = $('#isotope');
var $container2 = $('#isotope2');

var height = ($container.width()/4)-4.5;

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

  $(this).children('.short-info').show(); 
}
},  function() {

 if (!$(this).hasClass('gigante')){

    $(this).children('.short-info').hide();
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

  var $item = $(this).parent().parent();
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

  var $item = $(this).parent().parent();
  $item.toggleClass('gigante');
  
$item.children('.long-info').hide();
  $item.children('.short-info').show(); 

 height = $item.width();
 $item.height(height/2);
 $item.width(height/2);

  $container2.isotope('layout');
});

});