const {
  CourseCateList,
  StudyCateList,
  TeachCateList
} = require('../../tables/app/Cate');

class CateService {
  async getCourseCateList() {
    const courceCateList = await CourseCateList.findAll({
      where: {
        status: 1,
      }
    });

    return courceCateList;
  }
  async getCourseCateDetail({ cat_id }) {
    const courseCateItem = await CourseCateList.findOne({
      where: {
        cat_id,
        status: 1,
      },
    });
    const sList = await this.getStudyDetail(courseCateItem),
          s_list = JSON.parse(JSON.stringify(sList));

    // const s_t_list = [];

    for (let index in s_list) {
      let sItem = s_list[index];
      const tList = await this.getTeachDetail(sItem);
      // s_t_list.push(tList);
      s_list[index]['t_list'] = tList;
    }

    return {
      ...courseCateItem.dataValues,
      s_list,
      // s_t_list
    };
  }

  async _getCateDetail({ cat_id }, TableModel) {
    const studyCateList = await TableModel.findAll({
      where: {
        parent_id: cat_id,
      },
    });

    return studyCateList;
  }
  async getStudyDetail(courseCateItem) {
    const list = await this._getCateDetail(courseCateItem, StudyCateList);

    return list;
  }
  async getTeachDetail(courseCateItem) {
    const list = await this._getCateDetail(courseCateItem, TeachCateList);

    return list;
  }
}

module.exports = new CateService();
