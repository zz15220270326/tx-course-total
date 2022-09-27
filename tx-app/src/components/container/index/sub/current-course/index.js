import getIndexTpl from './tpls';
import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';
import { CURRENT_COURSE_INFO } from '@/configs/data';

import './index.scss';

class CurrentCourse extends Component {
  constructor(options) {
    super(options);
  }
  render() {
    const indexTpl = getIndexTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `current-course J_CurrentCourse`;

    const innerHTML = replaceTpl(indexTpl, {
      ...CURRENT_COURSE_INFO,
    });

    oContainer.innerHTML = innerHTML;

    return oContainer;
  }
}

export default CurrentCourse;
