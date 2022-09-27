const { readFileSync } = require('fs');
const { resolve } = require('path');

const crawlPlanInfo = JSON.parse(readFileSync(
  resolve(__dirname, '../../files/course-plan-info.json'),
  'utf8'
));

class PlanController {
  constructor() {}

  async getPlanTimeInfo(ctx, next) {
    try {
      const { todayStudyTimeInfo, overStudentsInfo } = crawlPlanInfo;

      ctx.body = {
        status: 'Success',
        error_code: 0,
        data: {
          todayStudyTimeInfo,
          overStudentsInfo,
        }
      };
    } catch (err) {
      ctx.body = {
        status: 'Error',
        error_code: 405,
        msg: err,
      };
    }
  }

  async getCourseProgressInfo(ctx, next) {
    try {
      const { coursePlanData } = crawlPlanInfo;

      ctx.body = {
        status: 'Success',
        error_code: 0,
        data: coursePlanData,
      };
    } catch (err) {
      ctx.body = {
        status: 'Error',
        error_code: 405,
        msg: err,
      };
    }
  }
}

module.exports = new PlanController();
