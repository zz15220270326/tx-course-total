import './index.scss';

import getIndexTpl from './tpls/index.tpl';
import getItemTpl from './tpls/item.tpl';

import NavTitle from '@/components/common/nav-title';

import Component from '@/components/Component';
import { getComponentTpl, replaceTpl } from '@/utils/tools';

class HotWords extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list } = this.props;

    const indexTpl = getIndexTpl(),
          itemTpl = getItemTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `hot-words J_HotWords`;
    oContainer.innerHTML = `
      <!-- nav-title -->
      ${ getComponentTpl(new NavTitle({ title: '热门搜索' })) }
      ${
        replaceTpl(indexTpl, {
          template: `
            ${
              list.map(item => {
                const showClass = item.type.trim().length ? '' : 'hidden';
                console.log(showClass);

                return replaceTpl(itemTpl, {
                  id: String(item.id),
                  name: item.name,
                  type: item.type,
                  showClass,
                });
              }).join('\n')
            }
          `,
        })
      }
    `;
    return oContainer;
  }

  componentDidMount() {
    this.initDOM();
    this.bindEvent();
  }

  initDOM() {
    this.oHotWords = document.getElementsByClassName('J_HotWords')[0];
  }

  bindEvent() {
    this.oHotWords.addEventListener('click', this.onClickHotWord.bind(this), false);
  }

  onClickHotWord(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          id = parseInt(tar.dataset.id);

    const { list, onHotWordClick } = this.props;

    if ([null, undefined, NaN].includes(id)) {
      return;
    }
    const crtItem = list.find(item => item.id === id);

    typeof onHotWordClick === 'function' && onHotWordClick(crtItem);
  }
}

export default HotWords;
