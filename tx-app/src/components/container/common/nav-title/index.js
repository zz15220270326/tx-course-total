import './index.scss';

import getIndexTpl from './tpls/index.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

class NavTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title = 'TITLE' } = this.props;
    const oContainer = document.createElement('div');
    oContainer.className = 'nav-title';
    oContainer.innerHTML = replaceTpl(getIndexTpl(), {
      title
    });
    return oContainer;
  }
}

export default NavTitle;
