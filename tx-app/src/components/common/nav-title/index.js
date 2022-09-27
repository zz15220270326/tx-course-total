import getIndexTpl from './tpls';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

import './index.scss';

class NavTitle extends Component {
  constructor(options) {
    super(options);
  }
  render() {
    const {
      title = 'Title',
      suffix = '',
    } = this.props;
    const oContainer = document.createElement('div');
    oContainer.className = `nav-title J_NavTitle clearfix`;

    const innerHTML = replaceTpl(getIndexTpl(), {
      title,
      suffix,
    });

    oContainer.innerHTML = innerHTML;

    return oContainer;
  }
}

export default NavTitle;
