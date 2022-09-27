import HTTP from '@/utils/http';

const PREFIX = '/app/plan-page';

class PlanModel extends HTTP {
  constructor(options) {
    super(options);
  }
  /**
   * 获取上课时长
   */
  getCourseTimeInfo() {
    return this.request({
      method: 'GET',
      url: PREFIX + '/get-top-info'
    });
  }
  /**
   * 获取课程进度信息
   */
  getCourseProgressInfo() {
    return this.request({
      method: 'GET',
      url: PREFIX + '/get-course-progress-info'
    });
  }
}

export default PlanModel;
