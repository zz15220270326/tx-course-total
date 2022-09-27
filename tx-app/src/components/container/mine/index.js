import './index.scss';
import getIndexTpl from './tpls/index.tpl';

import MineInfo from './sub/info';
import MineLists from './sub/lists';

import Component from '@/components/Component';
import { replaceTpl, getComponentTpl } from '@/utils/tools';
import UserModel from '@/services/UserModel';

const userModel = new UserModel();

class MineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        id: -1,
        username: '',
        nickname: '',
        avatar: '',
      },
    };
  }

  componentDidMount() {
    this.initDOM();
    this.getUserInfo();
  }

  get mineInfo() {
    const { userInfo } = this.state;
    
    return new MineInfo({
      userInfo
    });
  }

  get mineLists() {
    const {  } = this.props;

    return new MineLists({});
  }

  render() {
    const indexTpl = getIndexTpl();
    const { userInfo } = this.state;

    const oContainer = document.createElement('div');
    oContainer.className = `mine-container J_MineContainer`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      template: `
        <!-- 上面的用户信息 -->
        ${ getComponentTpl(new MineInfo({ userInfo })) }
        <!-- 下面的列表集合信息 -->
        ${ getComponentTpl(new MineLists({  })) }
      `,
    });
    return oContainer;
  }

  initDOM() {
    this.oContainer = document.getElementsByClassName('J_MineContainer')[0];
    this.oMineInfo = this.oContainer.getElementsByClassName('J_MineInfo')[0];

  }

  update(field) {
    switch (field) {
      case 'mine-info':
        if (this.oMineInfo) {
          this.oMineInfo.outerHTML = this.mineInfo.render().outerHTML;
        }
        break;
      case 'mine-lists':
        break;
      default:
        break;
    }
  }

  async getUserInfo() {
    try {
      const { data } = await userModel.getUserInfo(1);
      if (data) {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            ...data,
          }
        }, () => {
          this.update('mine-info');
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default MineContainer;
