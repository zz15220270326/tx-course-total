import './index.scss';

import getIndexTpl from './tpls/index.tpl';
import getItemTpl from './tpls/item.tpl';
import getTItemTpl from './tpls/t-item.tpl';

import Component from '@/components/Component';

import { replaceTpl } from '@/utils/tools';

const indexTpl = getIndexTpl(),
      itemTpl = getItemTpl(),
      tItemTpl = getTItemTpl();

class CatDetailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domCache: {}
    };
  }

  componentDidMount() {
    this.bindEvent();
  }

  bindEvent() {
    this.oContainer = document.getElementsByClassName('J_NavDetailList')[0];

    // bind some events (todo)
  }

  render() {
    const { list } = this.props;
    const oContainer = document.createElement('div');
    oContainer.className = `nav-detail-list J_NavDetailList`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      template: this.getTplByList(list),
      otherInfo: ``,
    });
    return oContainer;
  }

  getTplByList(list) {
    if (list instanceof Array && !!list.length) {
      return list.map(listItem => {
        const { t_list: tList } = listItem;

        return replaceTpl(itemTpl, {
          ...listItem,
          template: tList.map(tListItem => {
            return replaceTpl(tItemTpl, {
              ...tListItem
            });
          }).join('\n'),
        })
      }).join('\n')
    }
    return ``;
  }
}

export default CatDetailList;
