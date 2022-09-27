import '@/styles/plan.scss';

import '@/assets/js/common.js';

// components
import Header from '@/components/common/header';
import Tabbar from '@/components/common/tabbar';
import InputRoute from '@/components/common/input-route';

import PlanContainer from '@/components/container/plan';

// data
import { TABBAR_DATA } from '@/configs/data';
// utils
import { getComponentTpl } from '@/utils/tools';

const App = () => {
  const oApp = document.getElementById('app');

  const init = () => {
    render(oApp);
  }

  function render(root) {
    root.innerHTML = `
      <!-- plan-header -->
      ${
        getComponentTpl(new Header({
          type: 'primary',
          template: getComponentTpl(new InputRoute({
            pageName: 'search',
            query: {},
            prefix: 'search',
            placeholder: '找知识、找培训、找老师',
          })),
        }))
      }
      <!-- plan-container -->
      ${ getComponentTpl(new PlanContainer({})) }
      <!-- common-tabbar -->
      ${ getComponentTpl(new Tabbar({ list: TABBAR_DATA })) }
    `;
  }

  init();
}

App();
