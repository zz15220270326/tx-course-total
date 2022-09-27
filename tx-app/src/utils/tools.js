import Component from "@/components/Component";

const replaceTplReg = /\{\{(.*?)\}\}/igm;

/**
 * {{}}模板替换
 * @param {string} tpl
 * @param {{[key: string]: any;}} obj
 * @return {string} targetTpl
 */
export function replaceTpl(tpl, obj) {
  return tpl.replace(replaceTplReg, function (node, key) {
    var _key = key.trim();

    return obj[_key] || '';
  });
}

/**
 * 把对象转化成query
 */
export function setObjectToQuery(object, prefix) {
  var _prefix = typeof prefix === 'string' ? prefix : '',
      query = _prefix;

  for (var k in object) {
    query += k + '=' + object[k] + '&';
  }

  return query.replace(/&$/, '');
}

/**
 * 节流函数
 */
export function throttle(fn, duration) {
  var _duration = typeof duration === 'number' && duration > 0 ? duration : 500,
      timer = null,
      start = new Date().getTime();

  return function () {
    var ctx = this,
        args = arguments,
        end = new Date().getTime();

    clearTimeout(timer);
    timer = null;

    if (end - start >= _duration) {
      fn.apply(ctx, args);
      start = new Date().getTime();
    } else {
      timer = setTimeout(function () {
        fn.apply(ctx, args);
        clearTimeout(timer);
        timer = null;
      }, end - start);
    }
  }
}

/**
 * 防抖函数
 */
export function debounce(fn, delay) {
  var _delay = delay || 300,
      timer = null;

  return function () {
    var args = arguments,
        ctx = this;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(ctx, args);
      clearTimeout(timer);
      timer = null;
    }, _delay);
  }
}

/**
 * 判断是否已经滚动到底
 */
export function isScrollToBottom() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
        viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  if (scrollTop + viewHeight === scrollHeight) {
    return true;
  }
  return false;
}

/**
 * 获取整个component元素的模板字符串
 */
export function getComponentTpl(component) {
  if (component instanceof Component) {
    return component.render().outerHTML;
  }
  return ``;
}
