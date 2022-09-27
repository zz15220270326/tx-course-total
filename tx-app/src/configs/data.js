/**
 * 用户信息
 */
export const USER_INFO = {
  avatar: 'http://thirdqq.qlogo.cn/g?b=oidb&k=o8R9ubaU15nCXmSOyTcMEA&s=640&t=1605155910',
  username: 'conte',
  desc: '畅学卡已到期，召唤好友续期',
};
/**
 * 当前课程信息
 */
export const CURRENT_COURSE_INFO = {
  course_img: 'https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLA8vJrwOUtiaA4V9vJzicuo8ALr2ljTZ2aVEYe9mqnANj3Kicukv7VWFHSYdRZ90uxR6E/600?',
  name: 'WEB前端高级工程师养成计划『全修精英特训』',
  title: 'WEB前端高级工程师养成计划',
  content: '正向预查、贪婪与非贪婪模式、replace方法',
};

/**
 * 底部栏数据
 */
export const TABBAR_DATA = [
  {
    name: '首页',
    path: '/',
    icon: 'icon-store',
  },
  {
    name: '找课',
    path: '/cate.html',
    icon: 'icon-search',
  },
  {
    name: '课程表',
    path: '/plan.html',
    icon: 'icon-all',
  },
  {
    name: '我的',
    path: '/mine.html',
    icon: 'icon-account'
  }
];

/**
 * MinePage: TIP_NAVS
 */
export const TIP_NAVS = [
  {
    name: '订单管理',
    icon: 'set',
  },
  {
    name: '收藏',
    icon: 'pin',
  }
];

/**
 * MinePage: MINE_LISTS_DATA
 */
export const MINE_LISTS_DATA = [
  {
    name: '畅学卡',
    link: 'https://m.ke.qq.com/m-core/freeLearningList.html',
    extra: {
      icon: 'gift',
      text: '召唤好友续期',
    },
  },
  {
    name: '余额',
    extra: {
      icon: 'wallet',
      text: '0'
    },
  },
  {
    name: '优惠劵',
    extra: {
      text: '0',
    },
  },
  {
    name: '课程分销',
    extra: {
      text: '¥0.00可提',
    },
  },
  {
    name: '上课流量免费',
  },
  {
    name: '联系客服',
  },
  {
    name: '设置',
  },
];

export const SEARCH_KEYS = {
  RECENT_SEARCHED: 'RECENT_SEARCHED',
  HOT_WORDS: 'HOT_WORDS',
};
