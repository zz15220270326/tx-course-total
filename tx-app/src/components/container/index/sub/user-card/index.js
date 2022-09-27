import getIndexTpl from './tpls';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

import './index.scss';

const indexTpl = getIndexTpl();

class UserCard extends Component {
  constructor(options) {
    super(options);
  }

  render() {
    const oContainer = document.createElement('div');
    oContainer.className = `user-card J_UserCard`;

    const innerHTML = replaceTpl(indexTpl, {
      ...this.props,
    });

    // console.log(innerHTML);

    oContainer.innerHTML = innerHTML;

    return oContainer;
  }
}

export default UserCard;
