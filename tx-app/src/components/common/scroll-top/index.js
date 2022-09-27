import './index.scss';

import getIndexTpl from './tpls';

import Component from '@/components/Component';
import { replaceTpl, throttle } from '@/utils/tools';
import {
  fadeIn,
  fadeOut,
} from '@/plugins/animate';

import backTopImg from '@/assets/imgs/scroll-top.png';

class ScrollTop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.bindEvent();
  }

  render() {
    const {
      img = backTopImg
    } = this.props;
    const indexTpl = getIndexTpl();

    const oScrollTop = document.createElement('div');
    oScrollTop.className = `scroll-top J_ScrollTop`;
    oScrollTop.style.display = 'none';
    oScrollTop.innerHTML = replaceTpl(indexTpl, {
      img
    });
    return oScrollTop;
  }
  bindEvent() {
    this.oScrollTop = document.getElementsByClassName('J_ScrollTop')[0];

    this.oScrollTop.addEventListener('click', throttle(this.onScrollTopClick.bind(this)), {
      capture: false,
    });
    window.addEventListener('scroll', throttle(this.onScrollTopShow.bind(this)), false);
  }
  onScrollTopClick() {
    const {
      duration = 2000,
    } = this.props;
    const scrollTop = document.documentElement.scrollTop;
    const speed = 10 * scrollTop / duration;

    let timer = setInterval(() => {
      const top = document.documentElement.scrollTop;

      if (top <= 0) {
        clearInterval(timer);
        timer = null;
      } else {
        document.documentElement.scrollTop -= speed;
      }
    }, 1);
    
  }

  onScrollTopShow() {
    const scrollTop = document.documentElement.scrollTop,
          { top = 500 } = this.props;

    if (top <= scrollTop) {
      fadeIn(this.oScrollTop, 200);
    } else {
      fadeOut(this.oScrollTop, 200);
    }
  }
}

export default ScrollTop;
