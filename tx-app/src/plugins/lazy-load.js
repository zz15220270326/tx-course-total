import { fadeIn } from './animate';

function imgLazyLoad(imgs, options = {}) {
  const {
    // 倍数
    scale = 1,
    // 加载时的图片
    loading = 'https://g.alicdn.com/s.gif',
    // 加载错误时的图片,
    error = '',
    // 是否淡入淡出
    fade = false,
  } = options;

  const imgList = [...imgs];

  const pageHeight = document.documentElement.clientHeight || document.body.clientHeight,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  imgList.forEach((imgEl) => {
    // const oParent = imgEl.parentNode;
    const imgOffsetTop = imgEl.offsetTop;

    if (imgEl.getAttribute('data-src')) {
      imgEl.src = loading;
    }

    if ((pageHeight + scrollTop) * scale >= imgOffsetTop) {
      if (imgEl.getAttribute('data-src')) {
        imgEl.src = imgEl.getAttribute('data-src');
        imgEl.removeAttribute('data-src');
        // console.log(imgIdx);
        imgEl.onload = function () {
          fade && fadeIn(imgEl, 300);
        }
        imgEl.onerror = function () {
          imgEl.src = error;
        }
      }
    }
  });
}

export {
  imgLazyLoad,
};
