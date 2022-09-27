import '@/styles/cate.scss';

import '@/assets/js/common.js';

// components
import Header from '@/components/common/header';
import InputRoute from '@/components/common/input-route';
import Tabbar from '@/components/common/tabbar';
import CateContainer from '@/components/container/cate';

// data
import { TABBAR_DATA } from '@/configs/data';
// tools
import { getComponentTpl } from '@/utils/tools';

const App = () => {
  const oApp = document.getElementById('app');

  const init = () => {
    render(oApp);
  }

  function render(root) {
    root.innerHTML = `
      <!-- cate-header -->
      ${
        getComponentTpl(new Header({
          type: 'primary',
          template: getComponentTpl(new InputRoute({
            pageName: 'search',
            query: {},
            prefix: 'search',
            placeholder: '找知识、找培训、找老师',
            bgColor: '#65cdff',
          })),
          bgColor: '#23b8ff',
        }))
      }
      <!-- inner-container -->
      ${ getComponentTpl(new CateContainer({})) }
      <!-- common-tabbar -->
      ${ getComponentTpl(new Tabbar({ list: TABBAR_DATA })) }
    `;
  }

  init();
}

App();
