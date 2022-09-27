/**
 * 元素淡入
 */
function fadeIn(el, duration, callback) {
  if (window.jQuery) {
    jQuery(el).fadeIn(duration, function () {
      typeof callback === 'function' && callback();
    });
    return;
  }
  var _duration = duration || 150,
      timer = null,
      speed = 1 / _duration;

  el.style.opacity = 0;

  timer = setInterval(function () {
    var opacity = Number(el.style.opacity);
    if (opacity >= 1) {
      el.style.opacity = '';
      typeof callback === 'function' && callback();
      clearInterval(timer);
      timer = null;
    } else {
      el.style.opacity = opacity + speed;
    }
  }, 1);

  setTimeout(function () {
    el.style.opacity = '';
    clearInterval(timer);
    timer = null;
  }, _duration * 1.2);
}

/**
 * 元素淡出
 */
function fadeOut(el, duration, callback) {
  if (window.jQuery) {
    jQuery(el).fadeOut(duration, () => {
      typeof callback === 'function' && callback();
    });
    return;
  }
  var _duration = duration || 150,
      timer = null,
      speed = 1 / _duration;

  el.style.opacity = 1;

  timer = setInterval(function () {
    var opacity = Number(el.style.opacity);
    if (opacity <= 0) {
      el.style.opacity = '';
      typeof callback === 'function' && callback();
      clearInterval(timer);
      timer = null;
    } else {
      el.style.opacity = opacity - speed;
    }
  }, 1);
}

export {
  fadeIn,
  fadeOut,
};
