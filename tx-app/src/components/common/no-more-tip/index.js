import './index.scss';

import getIndexTpl from './tpls';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

class NoMoreTip extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      img,
      title = 'NO DATA',
    } = this.props;

    const oContainer = document.createElement('div');
    oContainer.className = 'no-more-tip J_NoMoreTip';
    oContainer.innerHTML = replaceTpl(getIndexTpl(), {
      img,
      title
    });
    return oContainer;
  }
}

export default NoMoreTip;
