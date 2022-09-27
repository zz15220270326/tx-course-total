import './index.scss';

import getIndexTpl from './tpls/index.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const indexTpl = getIndexTpl();

    const oContainer = document.createElement('div');

    oContainer.className = `user-msg-box J_UserInfo`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      ...this.props,
    });

    return oContainer;
  }
}

export default UserInfo;
