import './index.scss';

import getInfoTitTpl from './tpls/info-tit.tpl';
import getInfoListTpl from './tpls/info-list.tpl';
import getInfoListItemTpl from './tpls/info-list-item.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';
import { TIP_NAVS } from '@/configs/data';

class MineInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userInfo } = this.props;

    const infoTitTpl = getInfoTitTpl(),
          infoListTpl = getInfoListTpl(),
          infoListItemTpl = getInfoListItemTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `mine-info J_MineInfo`;
    oContainer.innerHTML = `
      ${ replaceTpl(infoTitTpl, {
        avatar: userInfo.avatar,
        nickname: userInfo.nickname,
      }) }
      ${ replaceTpl(infoListTpl, {
        template: TIP_NAVS.map(item => replaceTpl(infoListItemTpl, item)).join(' ')
      }) }
    `;
    return oContainer;
  }
}

export default MineInfo;
