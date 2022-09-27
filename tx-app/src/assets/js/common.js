import './fastclick.js';

;(function (doc) {

  doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 3.75 + 'px';

  doc.addEventListener('load', function () {
    FastClick.attach(doc.body);
  });

  doc.addEventListener('touchstart', function (ev) {
    var e = ev || window.event;

    if (e.touches.length > 1) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }, false);

})(document);
