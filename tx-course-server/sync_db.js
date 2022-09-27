const { readFileSync } = require('fs');
const { resolve } = require('path');

const sequelize = require('./connections/mysql');

const { UserList } = require('./tables/common/User');
const { RcItemList, HotItemList } = require('./tables/app/Index');
const { HotWordList } = require('./tables/app/Search');

// [
//   {
//     "id": 0,
//     "name": "ps",
//     "desc": "",
//     "type": "热",
//     "index": 0,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 687085,
//     "name": "吉他",
//     "desc": "",
//     "type": "新",
//     "index": 1,
//     "mt": 1002,
//     "st": 2024,
//     "tt": 3330,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 1209298,
//     "name": "钢琴",
//     "desc": "",
//     "type": "新",
//     "index": 2,
//     "mt": 1002,
//     "st": 2024,
//     "tt": 3330,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "王红元",
//     "desc": "",
//     "type": "热",
//     "index": 3,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "android",
//     "desc": "",
//     "type": "",
//     "index": 4,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "四级",
//     "desc": "",
//     "type": "",
//     "index": 5,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "平面设计",
//     "desc": "",
//     "type": "",
//     "index": 6,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "前端",
//     "desc": "",
//     "type": "",
//     "index": 7,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "react",
//     "desc": "",
//     "type": "",
//     "index": 8,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   },
//   {
//     "id": 0,
//     "name": "新概念英语",
//     "desc": "",
//     "type": "",
//     "index": 9,
//     "mt": 0,
//     "st": 0,
//     "tt": 0,
//     "hook_id": 0,
//     "material_id": 0,
//     "module": "",
//     "touch_point_id": 0
//   }
// ].forEach((item) => {
//   HotWordList.create({
//     ...item,
//     id: item.index,
//     uid: 1,
//     status: 1,
//   });
// });

// 重写HOT-CATs
// const hotCatesList = JSON.parse(readFileSync(resolve(__dirname, 'files/hot-cate-items.json'), 'utf8'));
// hotCatesList.forEach(item => {
//   HotItemList.create({
//     id: item.id,
//     link: item.link,
//     img_src: item.img_src,
//     type: item.type,
//     name: item.name,
//     status: 1,
//   });
// });

// connect mysql-database
sequelize.sync({
  //// force: true,
}).then(() => {
  console.log('connect to mysql successfully');
}).catch(err => {
  console.log(err);
});
