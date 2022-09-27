import getHeaderTpl from './tpl';
import { replaceTpl } from '@/utils/tools';
import Component from '@/components/Component';

import './index.scss';

const headerTpl = getHeaderTpl();

class Header extends Component {
  constructor(options) {
    super(options);
    this.name = Header.name;
    // console.log(this);
  }

  render() {
    const {
      fixed = true,
      template = 'Empty header',
      leftTpl = '',
      rightTpl = '',
      type = '',
      bgColor
    } = this.props;
    const oHeader = document.createElement('div');
    oHeader.className = `header J_Header ${
      fixed ? 'fixed' : ''
    } ${ !type ? '' : type }`;
    if (bgColor) {
      oHeader.style.backgroundColor = bgColor;
    }
  
    const innerHTML = replaceTpl(headerTpl, {
      template,
      leftTpl,
      rightTpl,
    });
    oHeader.innerHTML = innerHTML;
    return oHeader;
  }
};

export default Header;
