import getIndexTpl from './tpls';
import getItemTpl from './tpls/item.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

import './index.scss';

const indexTpl = getIndexTpl(),
      itemTpl = getItemTpl();

class Tabbar extends Component {
  constructor(options) {
    super(options);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.oContainer = document.getElementsByClassName('J_Tabbar')[0];
    this.bindEvent();
  }

  get currentItem() {
    const { currentIndex } = this.state,
          { list } = this.props;

    return list[currentIndex];
  }

  render() {
    /** location.pathname */
    const { list } = this.props,
          currentIndex = list.findIndex(item => item.path === location.pathname);

    this.setState({
      currentIndex,
    });

    const oContainer = document.createElement('ul');
    oContainer.className = `tabbar J_Tabbar`;
    const innerHTML = replaceTpl(indexTpl, {
      template: [...list].map((item, index) => replaceTpl(itemTpl, {
        ...item,
        index: String(index),
        activeClass: index === currentIndex ? 'active' : '',
      })).join('\n')
    });

    oContainer.innerHTML = innerHTML;
    return oContainer;
  }

  bindEvent() {
    this.oContainer.addEventListener('click', this.onTabItemClick.bind(this), false);
  }

  onTabItemClick(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          itemClass = tar.classList[0];

    if (!itemClass || !itemClass.includes('icon')) {
      return;
    }

    const allItems = this.oContainer.getElementsByClassName(itemClass),
          currentIndex = [].indexOf.call(allItems, tar),
          oTabbarItems = this.oContainer.getElementsByClassName('tabbar-item'); 

    this.setState({
      currentIndex,
    });

    [...oTabbarItems].forEach((el, index) => {
      el.className = 'tabbar-item J_TabbarItem';
      if (index === currentIndex) {
        el.className += ' active';
      }
    });

    if (this.currentItem) {
      location.href = this.currentItem.path;
    }

  }
}

export default Tabbar;
