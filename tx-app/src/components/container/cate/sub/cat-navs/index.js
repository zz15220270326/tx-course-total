import './index.scss';

import getIndexTpl from './tpls/index.tpl';
import getItemTpl from './tpls/item.tpl';

import Component from '@/components/Component';

import { replaceTpl } from '@/utils/tools';

const indexTpl = getIndexTpl(),
      itemTpl = getItemTpl();

class CatNavs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.bindEvent();
  }

  render() {
    const {
      list = [],
      catId
    } = this.props;
    const crtIdx = list.findIndex(item => item.catId == catId);

    const oContainer = document.createElement('div');
    oContainer.className = `cat-navs J_CatNavs`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      template: list.map((item, index) => {
        return replaceTpl(itemTpl, {
          ...item,
          activeClass: index === crtIdx ? 'active' : '',
          index: String(index),
        });
      }).join('\n'),
      itemWidth: (window.innerWidth / list.length) + 'px',
      itemLeft: (crtIdx * (window.innerWidth / list.length)) + 'px',
    });

    return oContainer;
  }
  bindEvent() {
    this.oContainer = document.getElementsByClassName('J_CatNavs')[0];
    this.oNavItemList = this.oContainer.getElementsByClassName('cat-nav-item');
    this.oUnderline = this.oContainer.getElementsByClassName('underline')[0];

    this.oContainer.addEventListener('click', this.onNavItemClick.bind(this), false);
  }

  onNavItemClick(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          className = tar.className.trim();

    let navItem;

    if (className === 'cat-nav-title') {
      navItem = tar.parentNode;
    }
    if (className.includes('cat-nav-item')) {
      navItem = tar;
    }
    if (navItem) {
      const index = parseInt(navItem.dataset.index);
      this.updateItemByIndex(index);
    }
  }

  updateItemByIndex(index) {
    const { onNavItemClick } = this.props;
    const oNavItemList = [...this.oNavItemList];
    oNavItemList.forEach((el, elIdx) => {
      el.className = 'cat-nav-item';
      if (elIdx === index) {
        el.className += ' active';
      }
    });

    this.oUnderline.style.left = index * (window.innerWidth / oNavItemList.length) + 'px';
    typeof onNavItemClick === 'function' && onNavItemClick(index);
  }
}

export default CatNavs;
