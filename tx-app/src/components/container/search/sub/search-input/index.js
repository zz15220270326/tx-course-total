import './index.scss';

import getIndexTpl from './tpls/index.tpl';

import Component from '@/components/Component';
import { replaceTpl } from '@/utils/tools';
import { fadeIn, fadeOut } from '@/plugins/animate';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  componentDidMount() {
    this.bindEvent();
  }

  render() {
    const {
      placeholder = '找知识、找培训、找老师',
      closeText = '取消',
    } = this.props;
    const { isFocus } = this.state;

    const indexTpl = getIndexTpl();

    const oContainer = document.createElement('div');
    oContainer.className = `search-input-container`;
    oContainer.innerHTML = `
      ${ replaceTpl(indexTpl, {
        placeholder,
        closeText,
        showCloseBtn: isFocus ? 'block' : 'none',
      }) }
    `;
    return oContainer;
  }

  bindEvent() {
    this.oSearchInput = document.getElementsByClassName('J_SearchInput')[0];
    this.oContainer = this.oSearchInput.parentNode;
    this.oClearBtn = this.oContainer.getElementsByClassName('icon-close')[0];
    this.oBackBtn = this.oContainer.getElementsByClassName('J_CloseSearch')[0];
    
    this.oSearchInput.addEventListener('focus', this.switchFocusStatus.bind(this, true), false);
    this.oSearchInput.addEventListener('blur', this.switchFocusStatus.bind(this, false), false);
    this.oSearchInput.addEventListener('keypress', this.onInputChange.bind(this), false);
    this.oClearBtn.addEventListener('click', this.onClearInput.bind(this), false);
    this.oBackBtn.addEventListener('click', this.onBackClick.bind(this), false);
  }

  switchFocusStatus(isFocus) {
    if (!!isFocus) {
      this.oClearBtn.style.display = 'block';
      fadeIn(this.oClearBtn, 300);
    } else {
      fadeOut(this.oClearBtn, 300, () => {
        this.oClearBtn.style.display = 'none';
      });
    }
  }

  onInputChange(e) {
    const code = e.keyCode,
          { onSearch } = this.props;
    
    if (code === 13) {
      const searchValue = this.oSearchInput.value.trim();

      typeof onSearch === 'function' && onSearch(searchValue);

      this.oSearchInput.value = '';
    }
  }

  onBackClick() {
    const { onBack } = this.props;

    typeof onBack === 'function' && onBack();
  }

  onClearInput() {
    this.oSearchInput.value = '';
    this.oSearchInput.blur();
  }
}

export default SearchInput;
