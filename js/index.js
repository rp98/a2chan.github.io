// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
  // sleep(8000).then(() => {
  //   autoType(".type-js",200);
  // });
}

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  $("nav").hide(0).delay(7000).show(2000);
  $(".gettingStarted").hide(0).delay(7000).fadeTo(3000,1);
  $(".bigcontainer").hide(0).delay(9000).fadeTo(3000,1);
  setTimeout(function(){
    autoType(".type-js",200);
  },8000);
  // sleep(5000).then(() => {
  //   // $("button").removeAttr("style");
  // });
});

setTimeout(function(){
  $("#inkpot").fadeOut(2500);
}, 5500);

setTimeout(function() {
  playGame();
  polyfillKey();
},6000);

function playGame(replay) {
  var LETTERS = ['क','அ','c','తు','e','എ','ಮಾ','ਹੈ','ভা','ਵੇਂ','గ','झे','றி','n','o','p','ব','r','আ','t','ਹੈ','ನ್','ഷം','ఏ','வு','ज्ञा','இ'];
  var animations = {'क':[],'அ':[],'c':[],'తు':[],'e':[],'എ':[],'ಮಾ':[],'ਹੈ':[],'ভা':[],'ਵੇਂ':[],'గ':[],'झे':[],'றி':[],'n':[],'o':[],'p':[],'ব':[],'r':[],'আ':[],'t':[],'ਹੈ':[],'ನ್':[],'ഷം':[],'ఏ':[],'வு':[],'ज्ञा':[],'இ':[]};
  var gameOn = true;
  var timeOffset = 500; //interval between letters starting, will be faster over time
  var DURATION = 10000;
  var main = document.getElementById('main');
  var rate = 1;
  var RATE_INTERVAL = 0; //playbackRate will increase by .05 for each letter... so after 20 letters, the rate of falling will be 2x what it was at the start
  var misses = 0;

  //To generate random colors for letters
  function randomColor(){
    let colorGen =  "0123456789ABCDEF";
    let len = colorGen.length;
    let color = "#";
    for(let i = 0; i < 6; i++) {
      color += colorGen[Math.floor(Math.random()*len)];
    }
    color= "#162449";
    return color;
  }

  //Create a letter element and setup its falling animation, add the animation to the active animation array, and setup an onfinish handler that will represent a miss. 
  function create() {
    var idx = Math.floor(Math.random() * LETTERS.length);
    var x = (Math.random() * 85) + 'vw';
    var container = document.createElement('div');
    var letter = document.createElement('span');
    var letterText = document.createElement('b');
    letterText.textContent = LETTERS[idx];
    letterText.style.color = randomColor();
    letter.appendChild(letterText);
    container.appendChild(letter);
    main.appendChild(container);
    var animation = container.animate([
      {transform: 'translate3d('+x+',-5vh,0)'},
      {transform: 'translate3d('+x+',120vh,0)'}
    ], {
      duration: DURATION,
      easing: 'linear',
      fill: 'both'
    });
    
    animations[LETTERS[idx]].splice(0, 0, {animation: animation, element: container});
    rate = rate + RATE_INTERVAL;
    animation.playbackRate = rate;
    
    //If an animation finishes, we will consider that as a miss, so we will remove it from the active animations array and increment our miss count
    animation.onfinish = function(e) {
      var target = container;
      var char = target.textContent;
                                      
    }
  }
  

  //Periodically remove missed elements, and lower the interval between falling elements
  var cleanupInterval = setInterval(function() {
    // timeOffset = timeOffset * 4 / 5;
    cleanup();
  }, 20000);
  function cleanup() {
    [].slice.call(main.querySelectorAll('.missed')).forEach(function(missed) {
      main.removeChild(missed);
    });
  }
  
  //Firefox 48 supports document.getAnimations as per latest spec, Chrome 52 and polyfill use older spec
  function getAllAnimations() {
    if (document.getAnimations) {
      return document.getAnimations();
    } else if (document.timeline && document.timeline.getAnimations) {
      return document.timeline.getAnimations();
    }
    return [];
  }
  
  //On key press, see if it matches an active animating (falling) letter. If so, pop it from active array, pause it (to keep it from triggering "finish" logic), and add an animation on inner element with random 3d rotations that look like the letter is being kicked away to the distance. Also update score.
  function onPress(e) {
    var char = e.key;
    if (char.length === 1) {
      char = char.toLowerCase();
      if (animations[char] && animations[char].length) {
        var popped = animations[char].pop();
        popped.animation.pause();
        var target = popped.element.querySelector('b');
        var degs = [(Math.random() * 1000)-500,(Math.random() * 1000)-500,(Math.random() * 2000)-1000];
        target.animate([
          {transform: 'scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',opacity:1},
          {transform: 'scale(0) rotateX('+degs[0]+'deg) rotateY('+degs[1]+'deg) rotateZ('+degs[2]+'deg)', opacity: 0}
        ], {
          duration: Math.random() * 500 + 850,
          easing: 'ease-out',
          fill: 'both'
        });
        addScore();
        // header.textContent += char;
      }
    }
  }
  function addScore() {
    // score++;
    // scoreElement.textContent = score;
  }
  
  document.body.addEventListener('keypress', onPress);

  //start the letters falling... create the element+animation, and setup timeout for next letter to start
  function setupNextLetter() {
    if (gameOn) {
      create();
      setTimeout(function() {
        setupNextLetter();
      }, timeOffset);
    }
  }
  setupNextLetter();
}

function polyfillKey() {
  if (!('KeyboardEvent' in window) ||
        'key' in KeyboardEvent.prototype) {
    return false;
  }
  
  console.log('polyfilling KeyboardEvent.prototype.key')
  var keys = {};
  var letter = '';
  for (var i = 65; i < 91; ++i) {
    letter = String.fromCharCode(i);
    keys[i] = letter.toUpperCase();
  }
  for (var i = 97; i < 123; ++i) {
    letter = String.fromCharCode(i);
    keys[i] = letter.toLowerCase();
  }
  var proto = {
    get: function (x) {
      var key = keys[this.which || this.keyCode];
      console.log(key);
      return key;
    }
  };
  Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
}

// autotype
function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block"
  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    $(".cursor").removeAttr("style");
    // thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },1500);
}

// Carousel

var carousel = angular.module('carousel', ['ngAnimate', 'ngTouch']);

carousel.directive('carousel', function($animate) {
  return {
    restrict: 'E',
    scope: true,
    require: 'carousel',
    controllerAs: 'carouselCtrl',
    controller: function CarouselCtrl($scope) {
      var slides = [],
          scopes = [],
          currentSlideIdx = 0;
      
      function transcludeSlide(idx) {
        console.info('Transcluding slide #%d', idx);
        if (!scopes[idx]) {
          scopes[idx] = $scope.$new();
          slides[idx].transcludeFn(scopes[idx], function(clone) {
            slides[idx].element.append(clone);
          });
        }
      }
      
      function removeSlide(idx) {
        console.info('Removing slide #%d', idx);
        if (scopes[idx]) {
          scopes[idx].$destroy();
          scopes[idx] = null;
        }
        slides[idx].element.empty();
      }
      
      this.currentSlideIdx = function() {
        return currentSlideIdx;
      };
      
      this.slideCount = function() {
        return slides.length;
      };
      
      this.registerSlide = function(element, transcludeFn) {
        slides.push({
          element: element,
          transcludeFn: transcludeFn
        });
      };
      
      this.prepareSlides = function(idx) {
        var i,l;
        
        transcludeSlide(idx);
        slides[idx].element.addClass('carousel__slide--active');

        if (idx > 0) {
          transcludeSlide(idx - 1);
          slides[idx - 1].element.addClass('carousel__slide--off-left');
        }
        if (idx < slides.length - 1) {
          transcludeSlide(idx + 1);
          slides[idx + 1].element.addClass('carousel__slide--off-right');
        }

        for (i = 0; i < idx - 1; i++) { 
          removeSlide(i);
        }
        for (i = idx + 2, l = slides.length; i < l; i++) { 
          removeSlide(i);
        }
      };
      
      this.cycleForward = function() {
        if (currentSlideIdx < slides.length - 1) {
          $animate.setClass(
            slides[currentSlideIdx].element, 
            'carousel__slide--off-left',
            'carousel__slide--active'
          );
          currentSlideIdx++;
          $animate.setClass(
            slides[currentSlideIdx].element, 
            'carousel__slide--active',
            'carousel__slide--off-right'
          );
          this.prepareSlides(currentSlideIdx);
        }
      };
      
      this.cycleBackward = function() {
        if (currentSlideIdx > 0) {
          $animate.setClass(
            slides[currentSlideIdx].element, 
            'carousel__slide--off-right',
            'carousel__slide--active'
          );
          currentSlideIdx--;
          $animate.setClass(
            slides[currentSlideIdx].element, 
            'carousel__slide--active',
            'carousel__slide--off-left'
          );
          this.prepareSlides(currentSlideIdx);
        }
      };
    },
    link: function(scope, iElement, iAttrs, ctrl) {
      ctrl.prepareSlides(0);
    }
  };
});

carousel.directive('slide', function() {
  return {
    restrict: 'E',
    require: '^carousel',
    transclude: true,
    link: function(scope, iElement, iAttr, carouselCtrl, transcludeFn) {
      carouselCtrl.registerSlide(iElement, transcludeFn);
    }
  };
});
