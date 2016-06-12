$(function(){

  setTimeout(function(){
    $('.sidebar').addClass('active');
  },800);
  
  setTimeout(function(){
    $('.lightbulb').addClass('active');
  },1400);
  setTimeout(function(){
    $('.sidebar__title > h3').addClass('active');
  },1400);
  setTimeout(function(){
    $('.sidebar__title > h1').addClass('active');
  },1400);
  setTimeout(function(){
    $('.sidebar__photo').addClass('active');
  },2000);

  


  $('.lightbulb').click(function(){
    $('.sidebar__title > h1').toggleClass('clicked');
  });

  console.log("mainJs linked.")

  $('.popup-img').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
    removalDelay: 300,
    mainClass: 'mfp-fade',
    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function

      // The 'opener' function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add 'opener' option if this code matches your needs, it's defailt one.
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  $('.popup-video').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
  });

});