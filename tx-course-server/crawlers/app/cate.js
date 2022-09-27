const {
  TeachCateList,
  StudyCateList,
  CourseCateList
} = require("../../tables/app/Cate");
const { httpGet } = require("../../utils/http");

;(async () => {
  const res = await httpGet({
    url: 'https://m.ke.qq.com/cgi-bin/h5/category_manage',
    params: {
      bkn: 795163311,
      r: 0.4205
    },
    headers: {
      'Content-Type': 'application/json',
      referer: 'https://m.ke.qq.com/m-core/cate.html',
    },
  });
  const data = res.result;
  const { category_list } = data;

  if (Array.isArray(category_list) && category_list.length) {
    const courseCateList = category_list.map(item => ({
      cat_id: item.cat_id,
      name: item.n,
      short_name: item.short,
      order: item.o,
      status: 1,
    }));
    const studyCateList = category_list.reduce((list, c) => {
      const { s_list } = c;
      if (Array.isArray(s_list)) {
        const sList = s_list.map(s => {
          return {
            parent_id: c.cat_id,
            cat_id: s.cat_id,
            name: s.n,
            short_name: s.short,
            order: s.o,
            status: 1,
          };
        });
        list.push(...sList);
      }
      return list;
    }, []);
    const teacherCateList = category_list.reduce((list, c) => {
      const { s_list } = c;

      if (s_list instanceof Array) {
        s_list.forEach(s => {
          const { t_list } = s;
          if (t_list instanceof Array) {
            const tList = t_list.map(t => {
              return {
                parent_id: s.cat_id,
                cat_id: t.cat_id,
                name: t.n,
                short_name: t.short,
                order: t.o,
                status: 1,
              };
            });
            list.push(...tList);
          }
        });
      }

      return list;
    }, [])

    courseCateList.forEach(async (c) => {
      const cList = await CourseCateList.findAll();
      if (cList.every(cItem => cItem.cat_id != c.cat_id)) {
        CourseCateList.create(c);
      }
    });
    studyCateList.forEach(async (s1) => {
      const sList = await StudyCateList.findAll();
      if (sList.every(s2 => s2.cat_id != s1.cat_id)) {
        StudyCateList.create(s1);
      }
    });
    teacherCateList.forEach(async (t) => {
      TeachCateList.create(t);
    });
  }
})();

/* ---- */

// ;(async () => {
//   await TeachCateList.drop();
//   await StudyCateList.drop();
//   await CourseCateList.drop();
// })();