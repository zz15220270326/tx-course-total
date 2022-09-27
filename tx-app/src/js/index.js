import '@/styles/index.scss';

import '@/assets/js/common.js';

/** import components */
import Header from '@/components/common/header';
import InputRoute from '@/components/common/input-route';
import Tabbar from '@/components/common/tabbar';

import IndexContainer from '@/components/container/index';
// better-scroll
// import BScroll from 'better-scroll';
// configs
import { TABBAR_DATA, SEARCH_KEYS } from '@/configs/data';
// tools
import { getComponentTpl } from '@/utils/tools';
import StoragePool from '@/plugins/storage';

const App = () => {
  const oApp = document.getElementById('app');

  // storagePool
  const recentSearched = new StoragePool({ key: SEARCH_KEYS.RECENT_SEARCHED });
  
  const init = () => {
    render(oApp);
    bindEvent();
  }

  function render(root) {
    const recentSearchedList = recentSearched.getItem();

    root.innerHTML = `
      <!-- 首页Header -->
      ${
        getComponentTpl(new Header({
          template: getComponentTpl(new InputRoute({
            pageName: 'search',
            query: {},
            prefix: 'search',
            placeholder: '找知识、找培训、找老师',
            showValue: recentSearchedList[0] || '',
          })),
          type: 'primary',
        }))
      }
      <!-- 首页Container -->
      ${ getComponentTpl(new IndexContainer({})) }
      <!-- 公共tabbar -->
      ${ getComponentTpl(new Tabbar({ list: TABBAR_DATA })) }
    `;
  }
  // function initScroll() {
  //   const oScrollContainer = document.getElementsByClassName('J_MainContainer')[0];

  //   App.scroll = new BScroll(oScrollContainer, {
  //     click: true,
  //     mouseWheel: true,
  //     scrollY: true,
  //     observeDOM: true,
  //     pullUpLoad: {
  //       threshold: 50,
  //     },
  //     movable: true,
  //   });

  //   console.log(App.scroll);
  // }
  function bindEvent() {
    // window.onload = function () {
    //   initScroll();
    // }
    window.onunload = function () {
      App.scroll = null;
    }
  }

  init();
}

new Promise((resolve) => {
  window.scroll(0, 0);
  setTimeout(() => {
    resolve('running App');
  }, 150);
}).then(() => {
  App();
});
