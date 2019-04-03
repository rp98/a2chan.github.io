function sleep(time){return new Promise((resolve)=>setTimeout(resolve,time))}
$(window).on("beforeunload",function(){$(window).scrollTop(0)});$(document).ready(function(){$("body").css({"overflow":"hidden"});$("nav, .headertop").delay(7000).fadeTo(2000,1);$(".gettingStarted").delay(7000).fadeTo(3000,1);$("#autotext").delay(9400).fadeTo(1000,1);$("#owlwrapper").delay(8000).fadeTo(1000,1);$("#pepperdesc, #gsbutton").delay(11400).fadeTo(1000,1);$("#fallingLetters").delay(8000).fadeTo(2000,1);$('.owl-carousel').owlCarousel({loop:!0,margin:10,nav:!1,autoplay:!0,autoplayHoverPause:!0,responsive:{0:{items:2},600:{items:3},1000:{items:5}}});setTimeout(function(){autoType(".type-js",200)},8000);$(document).scroll(function(){if($(document).scrollTop()>95)
{$('.navwrapper').addClass("notonhomepage");$('.logo').addClass("hideme")}
else{$('.navwrapper').removeClass("notonhomepage");$('.logo').removeClass("hideme")}});$('.toggleMenu').click(function(){$('.sidemenu').addClass("showmenu");$('.toggleMenu').addClass("changeopacity")});$('.cross').click(function(){$('.sidemenu').removeClass("showmenu");$('.toggleMenu').removeClass("changeopacity")});$(document).scroll(function(){if($(document).scrollTop()>250)
{$('.mobilelogo').addClass("hideme");$('.toggleMenu').css('padding','9px 12px 9px 9px')}
else{$('.mobilelogo').removeClass("hideme");$('.toggleMenu').css('padding','15px 20px 15px 15px')}})});setTimeout(function(){$("#inkpot").fadeOut(2500)},5500);setTimeout(function(){$("body").css({"overflow":"visible"})},8000);setTimeout(function(){playGame();polyfillKey()},6000);function playGame(replay){var LETTERS=['क','அ','c','తు','e','എ','ಮಾ','ਹੈ','ভা','ਵੇਂ','గ','झे','றி','n','o','p','ব','r','আ','t','ਹੈ','ನ್','ഷം','ఏ','வு','ज्ञा','இ'];var animations={'क':[],'அ':[],'c':[],'తు':[],'e':[],'എ':[],'ಮಾ':[],'ਹੈ':[],'ভা':[],'ਵੇਂ':[],'గ':[],'झे':[],'றி':[],'n':[],'o':[],'p':[],'ব':[],'r':[],'আ':[],'t':[],'ਹੈ':[],'ನ್':[],'ഷം':[],'ఏ':[],'வு':[],'ज्ञा':[],'இ':[]};var gameOn=!0;var timeOffset=500;var DURATION=10000;var main=document.getElementById('main');var rate=1;var RATE_INTERVAL=0;var misses=0;function randomColor(){let colorGen="0123456789ABCDEF";let len=colorGen.length;let color="#";for(let i=0;i<6;i++){color+=colorGen[Math.floor(Math.random()*len)]}
color="#162449";return color}
function create(){var idx=Math.floor(Math.random()*LETTERS.length);var x=(Math.random()*85)+'vw';var container=document.createElement('div');var letter=document.createElement('span');var letterText=document.createElement('b');letterText.textContent=LETTERS[idx];letterText.style.color=randomColor();letter.appendChild(letterText);container.appendChild(letter);main.appendChild(container);var animation=container.animate([{transform:'translate3d('+x+',-5vh,0)'},{transform:'translate3d('+x+',120vh,0)'}],{duration:DURATION,easing:'linear',fill:'both'});animations[LETTERS[idx]].splice(0,0,{animation:animation,element:container});rate=rate+RATE_INTERVAL;animation.playbackRate=rate;animation.onfinish=function(e){var target=container;var char=target.textContent}}
var cleanupInterval=setInterval(function(){cleanup()},20000);function cleanup(){[].slice.call(main.querySelectorAll('.missed')).forEach(function(missed){main.removeChild(missed)})}
function getAllAnimations(){if(document.getAnimations){return document.getAnimations()}else if(document.timeline&&document.timeline.getAnimations){return document.timeline.getAnimations()}
return[]}
function onPress(e){var char=e.key;if(char.length===1){char=char.toLowerCase();if(animations[char]&&animations[char].length){var popped=animations[char].pop();popped.animation.pause();var target=popped.element.querySelector('b');var degs=[(Math.random()*1000)-500,(Math.random()*1000)-500,(Math.random()*2000)-1000];target.animate([{transform:'scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',opacity:1},{transform:'scale(0) rotateX('+degs[0]+'deg) rotateY('+degs[1]+'deg) rotateZ('+degs[2]+'deg)',opacity:0}],{duration:Math.random()*500+850,easing:'ease-out',fill:'both'});addScore()}}}
function addScore(){}
document.body.addEventListener('keypress',onPress);function setupNextLetter(){if(gameOn){create();setTimeout(function(){setupNextLetter()},timeOffset)}}
setupNextLetter()}
function polyfillKey(){if(!('KeyboardEvent' in window)||'key' in KeyboardEvent.prototype){return!1}
console.log('polyfilling KeyboardEvent.prototype.key')
var keys={};var letter='';for(var i=65;i<91;++i){letter=String.fromCharCode(i);keys[i]=letter.toUpperCase()}
for(var i=97;i<123;++i){letter=String.fromCharCode(i);keys[i]=letter.toLowerCase()}
var proto={get:function(x){var key=keys[this.which||this.keyCode];console.log(key);return key}};Object.defineProperty(KeyboardEvent.prototype,'key',proto)}
function autoType(elementClass,typingSpeed){var thhis=$(elementClass);thhis.css({"position":"relative","display":"inline-block",});thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');thhis=thhis.find(".text-js");var dum="Pepper.";var text=dum.trim().split('');var amntOfChars=text.length;var newString="";setTimeout(function(){thhis.prev().removeAttr("style");thhis.text("");for(var i=0;i<amntOfChars;i++){(function(i,char){setTimeout(function(){newString+=char;thhis.text(newString)},i*typingSpeed)})(i+1,text[i])}},1500)}