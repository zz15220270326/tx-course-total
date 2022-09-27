import getIndexTpl from './tpls';
import getItemTpl from './tpls/item.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';
// models
import IndexModel from '@/services/IndexModel';

import './index.scss';

const indexModel = new IndexModel({});

/**
 * 热门分类
 */
class HotCate extends Component {
  constructor(options) {
    super(options);
    this.state = {
      list: [],
    };

    this.fetchData();
  }
  async fetchData() {
    const { data } = await indexModel.getHotItemList();

    this.setState({
      list: [...data],
    }, () => {
      this.update(this.state.list);
    });
  }

  render() {

    const oContainer = document.createElement('div');
    oContainer.className = `hot-cate J_HotCate`;

    // oContainer.innerHTML = innerHTML;

    return oContainer;
  }

  update(list) {
    const indexTpl = getIndexTpl(),
          itemTpl = getItemTpl();

    const oContainer = document.getElementsByClassName('J_HotCate')[0];

    const innerHTML = replaceTpl(indexTpl, {
      innerHTML: list.map(item => replaceTpl(itemTpl, item)).join('\n')
    });

    oContainer.innerHTML = innerHTML;
  }
}

export default HotCate;
