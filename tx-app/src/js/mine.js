import '@/styles/mine.scss';

import '@/assets/js/common.js';

// components
import Header from '@/components/common/header';
import InputRoute from '@/components/common/input-route';
import Tabbar from '@/components/common/tabbar';

import MineContainer from '@/components/container/mine';

// data
import { TABBAR_DATA } from '@/configs/data';
import { getComponentTpl } from '@/utils/tools';

const App = () => {
  const oApp = document.getElementById('app');

  const init = () => {
    render(oApp);
  }

  function render(root) {
    root.innerHTML = `
      <!-- mine-header -->
      ${
        getComponentTpl(new Header({
          type: 'primary',
          template: getComponentTpl(new InputRoute({
            pageName: 'search',
            query: {},
            prefix: 'search',
            placeholder: '找知识、找培训、找老师',
            bgColor: '#eeeff3',
          })),
          bgColor: '#fff'
        }))
      }
      <!-- mine-container -->
      ${ getComponentTpl(new MineContainer({})) }
      <!-- common-tabbar -->
      ${ getComponentTpl(new Tabbar({ list: TABBAR_DATA })) }
    `;
  }

  init();
}

App();
