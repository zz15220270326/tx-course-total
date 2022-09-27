import './index.scss';

import getIndexTpl from './tpls';
import getItemTpl from './tpls/item';
import getLabelItemTpl from './tpls/label-item';

import Component from '@/components/Component';
import {
  replaceTpl,
  throttle,
  isScrollToBottom,
} from '@/utils/tools';
import { imgLazyLoad } from '@/plugins/lazy-load';
import IndexModel from '@/services/IndexModel';
import noMoreTipImg from '@/assets/imgs/no-more-tip.png';
import NoMoreTip from '@/components/common/no-more-tip';

const indexTpl = getIndexTpl(),
      itemTpl = getItemTpl(),
      labelItemTpl = getLabelItemTpl();

const indexModel = new IndexModel({});

class RecommendList extends Component {
  constructor(options = {}) {
    super({
      ...options,
    });
    this.state = {
      page: 1,
      pageSize: 20,
      total: 0,
      title: '',
      dataList: [],
    };
    this.isFinished = false;
    this.noMoreTip = new NoMoreTip({
      img: noMoreTipImg,
      title: '暂时没有更多内容了～',
    });
  }

  componentDidMount() {
    const { page, pageSize } = this.state;

    this.bindEvent();
    this.getListData({ page, pageSize });
  }

  async getListData({ page, pageSize: page_size }) {
    const { data } = await indexModel.getRcItemList({
      page,
      page_size,
    });
    this.setIsFinished(data);
    if (!this.isFinished) {
      this.setPageInfo(data);
      this.setDataList(data);
      this.update(data.list);
    } else {
      this.setNoMoreTip();
    }
  }

  setIsFinished({ list }) {
    this.isFinished = !list.length;
  }

  setNoMoreTip() {
    this.oContainer.appendChild(this.noMoreTip.render());
  }

  setPageInfo({
    page,
    page_size: pageSize,
    total
  }) {
    this.setState({
      page,
      pageSize,
      total,
    }, () => {
      // console.log('update-page-info');
      // console.log(this.state);
    });
  }
  setDataList({ list }) {
    const { dataList } = this.state;

    const newDataList = [
      ...dataList,
      ...list
    ].filter(item1 => !dataList.some(item2 => item1.id === item2.id));

    this.setState({
      dataList: newDataList,
    });
  }

  render() {
    const oContainer = document.createElement('div');
    oContainer.className = `recommend-list J_RecommendList`;
    oContainer.innerHTML = replaceTpl(indexTpl, {
      title: '精选推荐',
      content: '',
    });
    return oContainer;
  }

  update(list = []) {
    const oListMain = this.oContainer.getElementsByClassName('J_RcListMain')[0];

    /**
     * 判断列表中是否有内容
     * 1. 有内容 - 在oListMain中添加
     * 2. 没有内容 - oContainer最下面添加一个"到底无数据"提示
     */
    if (!!list.length) {
      const newInnerHTML = list.map(listItem => (
        replaceTpl(itemTpl, {
          ...listItem,
          labels: listItem.labels.map(labelItem => {
            const labelPicInfo = String(labelItem.style).match(/\"(.+?)\"/);
            return replaceTpl(labelItemTpl, {
              label_name: labelItem.label_name,
              label_pic: labelPicInfo ? labelPicInfo[1].trim() : ''
            });
          }).join('')
        })
      )).join('');
      oListMain.innerHTML += newInnerHTML;
    }
  }

  bindEvent() {
    this.oContainer = document.getElementsByClassName('J_RecommendList')[0];
    const oImgs = this.oContainer.getElementsByClassName('cover-img');

    document.addEventListener('scroll', throttle(this.onListScroll.bind(this, oImgs), 150), false);

    setTimeout(() => {
      imgLazyLoad([...oImgs]);
    }, 200);
  }

  onListScroll(oImgs) {
    if (isScrollToBottom() && !this.isFinished) {
      this.setState({
        page: this.state.page + 1,
      }, () => {
        const { page, pageSize } = this.state;
        this.getListData({
          page,
          pageSize,
        }).then(() => {
          imgLazyLoad([...oImgs], {
            fade: true,
          });
        });
      });
    } else {
      setTimeout(() => {
        imgLazyLoad([...oImgs]);
      }, 200);
    }
  }
}

export default RecommendList;
