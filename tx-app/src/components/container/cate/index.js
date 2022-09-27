import getIndexTpl from './tpls/index.tpl'

import CatNavs from './sub/cat-navs';
import CatDetailList from './sub/cat-detail-list';

import Component from '@/components/Component';
// utils
import { replaceTpl, getComponentTpl } from '@/utils/tools';
// models
import CateModel from '@/services/CateModel';

const cateModel = new CateModel({});

class CateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catId: '',
      cateNavList: [],
      listCache: {},
    };
    this.domPool = {};

    this.getNavListData();
  }

  get currentDetailList() {
    const { catId, listCache } = this.state;
    return listCache[catId];
  }

  render() {
    const oContainer = document.createElement('div');
    oContainer.className = `scroll-container J_ScrollContainer`;
    return oContainer;
  }

  async getNavListData() {
    const { data } = await cateModel.getCateListData();
    
    this.setState({
      catId: data[0].cat_id,
      cateNavList: data.map(item => {
        return {
          ...item,
          catId: item.cat_id,
          navItemName: item.name.split('·')[0],
        };
      })
    }, async () => {
      await this.getNavListItemData(this.state.catId)
    });
  }

  async getNavListItemData(catId) {
    if (!this.state.listCache[catId]) {
      const { data } = await cateModel.getCateListData(catId);

      if (data) {
        this.state.listCache[catId] = data.s_list;
      }
    }
    this.update(catId);
  }

  update(catId) {
    this.setState({
      catId,
    });

    const oContainer = document.getElementsByClassName('J_ScrollContainer')[0];
    const { cateNavList } = this.state;

    if (!this.catNavs) {
      this.catNavs = new CatNavs({
        list: cateNavList,
        catId,
        onNavItemClick: this.onNavItemClick.bind(this),
      });
      this.catDetailList = new CatDetailList({
        list: this.currentDetailList,
      });
      oContainer.innerHTML = replaceTpl(getIndexTpl(), {
        template: `
          ${ getComponentTpl(this.catNavs) }
          ${ getComponentTpl(this.catDetailList) }
        `,
      });
    } else {
      this.catDetailList.oContainer.innerHTML = new CatDetailList({
        list: this.currentDetailList,
      }).render().innerHTML;
    }
  }

  onNavItemClick(index) {
    const { cateNavList, catId } = this.state;
    const newCatId = cateNavList[index].catId;

    this.getNavListItemData(newCatId);
  }
}

export default CateContainer;
