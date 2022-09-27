import './index.scss';

import getListsTpl from './tpls/lists.tpl';

import Component from '@/components/Component';
import { MINE_LISTS_DATA } from '@/configs/data';
import { replaceTpl } from '@/utils/tools';

class MineLists extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const listsTpl = getListsTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `mine-info-lists J_InfoLists`;
    oContainer.innerHTML = MINE_LISTS_DATA.map(item => {
      const extra = item.extra || {};

      return replaceTpl(listsTpl, {
        name: item.name,
        link: item.link || 'javascript:;',
        icon: extra.icon || '',
        text: extra.text || '',
      });
    }).join(' ');
    return oContainer;
  }
}

export default MineLists;
