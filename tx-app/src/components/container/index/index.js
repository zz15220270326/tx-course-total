import getTpl from './tpls';

// import components
import UserCard from './sub/user-card';
import CurrentCourse from './sub/current-course';
import HotCate from './sub/hot-cate';
import RecommendList from './sub/recommend-list';

import NavTitle from '@/components/common/nav-title';
import ScrollTop from '@/components/common/scroll-top';

import Component from '@/components/Component';
// utils
import { replaceTpl, getComponentTpl } from '@/utils/tools';
// configs
import { USER_INFO } from '@/configs/data';
// styles
import './index.scss';

const containerTpl = getTpl();

class IndexContainer extends Component {
  constructor(options) {
    super(options);
  }
  render() {
    const oContainer = document.createElement('div');
    oContainer.className = 'scroll-container J_MainContainer';

    const innerHTML = replaceTpl(containerTpl, {
      template: `
        ${ getComponentTpl(new UserCard({ ...USER_INFO, state: {}, })) }
        ${ getComponentTpl(new ScrollTop()) }
        ${ getComponentTpl(new CurrentCourse({})) }
        ${ getComponentTpl(new HotCate({})) }
        ${ getComponentTpl(new RecommendList({
          navTitle: new NavTitle({
            title: '精选推荐',
            suffix: '<span>选兴趣</span>',
          })
        })) }
      `,
    });
    oContainer.innerHTML = innerHTML;

    return oContainer;
  }
}

export default IndexContainer;
