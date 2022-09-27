// tpls
import getIndexTpl from './tpls/index.tpl';
// components
import UserInfo from './sub/user-info';
import PayPlanList from './sub/pay-plan-list';
import FreePlanList from './sub/free-plan-list';

import NavTitle from '../common/nav-title';

import Component from '@/components/Component';
// models
import PlanModel from '@/services/PlanModel';
// utils
import { replaceTpl, getComponentTpl } from '@/utils/tools';

const planModel = new PlanModel();

class PlanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overStudentsInfo: '',
      todayStudyTimeInfo: '',
      infoData: [],
    };
  }

  componentDidMount() {
    this.initDOM();
    this.getTimeInfoData();
    this.getProgressInfoData();
  }

  get userInfo() {
    const overStudentsInfo = this.state.overStudentsInfo.match(/\d+/)[0],
          todayStudyTimeInfo = this.state.todayStudyTimeInfo.match(/\d+/)[0];

    return new UserInfo({
      overStudentsInfo,
      todayStudyTimeInfo,
    });
  }
  get payPlanList() {
    const list = this.state.infoData.filter(item => item.type === 'paid_course');

    return new PayPlanList({
      list
    });
  }
  get freePlanList() {
    const list = this.state.infoData.filter(item => item.type !== 'paid_course');

    return new FreePlanList({
      list
    });
  }

  render() {
    const indexTpl = getIndexTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `plan-container J_PlanContainer`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      template: `
        ${ getComponentTpl(new UserInfo({})) }
        ${ getComponentTpl(new NavTitle({ title: '付费课' })) }
        ${ getComponentTpl(new PayPlanList({})) }
        ${ getComponentTpl(new NavTitle({ title: '免费课' })) }
        ${ getComponentTpl(new FreePlanList({})) }
      `,
    });
    return oContainer;
  }

  initDOM() {
    this.oContainer = document.getElementsByClassName('J_PlanContainer')[0];
    this.oContent = this.oContainer.getElementsByClassName('container-content')[0];
  }

  update(field) {
    switch (field) {
      case 'user-info':
        const oUserInfo = this.userInfo.render(),
              oPrevUserInfo = this.oContent.getElementsByClassName('J_UserInfo')[0];
        if (!oPrevUserInfo) {
          return;
        } else {
          oPrevUserInfo.outerHTML = oUserInfo.outerHTML;
        }
        break;
      case 'plan':
        const oPayInfoList = this.payPlanList.render(),
              oPrevPayInfoList = this.oContent.getElementsByClassName('J_PayPlanList')[0],
              oFreeInfoList = this.freePlanList.render(),
              oPrevFreeInfoList = this.oContent.getElementsByClassName('J_FreePlanList')[0];
        if (oPrevPayInfoList) {
          oPrevPayInfoList.outerHTML = oPayInfoList.outerHTML;
        }
        if (oPrevFreeInfoList) {
          oPrevFreeInfoList.outerHTML = oFreeInfoList.outerHTML;
        }
        break;
      default:
        break;
    }
  }

  async getTimeInfoData() {
    try {
      const { data } = await planModel.getCourseTimeInfo(),
            { overStudentsInfo, todayStudyTimeInfo } = data;
      this.setState({
        overStudentsInfo,
        todayStudyTimeInfo,
      }, () => {
        this.update('user-info');
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getProgressInfoData() {
    try {
      const { data: infoData } = await planModel.getCourseProgressInfo();
      this.setState({
        infoData
      }, () => {
        this.update('plan');
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default PlanContainer;
