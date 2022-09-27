import './index.scss';

import getIndexTpl from './tpls/index.tpl';
import getItemTpl from './tpls/item.tpl';

import Component from '@/components/Component';
// utils
import { replaceTpl } from '@/utils/tools';

class FreePlanList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const indexTpl = getIndexTpl(),
          itemTpl = getItemTpl(),
          { list } = this.props;

    const oContainer = document.createElement('div');
    oContainer.className = `free-plan-list J_FreePlanList`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      template: (
        Array.isArray(list) && list.length
        ?
        list.map(item => {
          return replaceTpl(itemTpl, {
            ...item
          });
        })
        :
        []
      ).join(''),
      extra: '',
    });
    return oContainer;
  }
}

export default FreePlanList;
