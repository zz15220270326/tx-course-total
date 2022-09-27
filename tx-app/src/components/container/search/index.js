import './index.scss';

import HotWords from './sub/hot-words';

import Component from '@/components/Component';

import StoragePool from '@/plugins/storage';
import { SEARCH_KEYS } from '@/configs/data';
import { getComponentTpl } from '@/utils/tools';
import SearchModel from '@/services/SearchModel';

const searchModel = new SearchModel();

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentSearched: [],
      hotWords: [],
    }
  }

  componentDidMount() {
    this.initState();
    this.initDOM();
    this.getHotWordsData();
  }

  get hotWords() {
    const { hotWords } = this.state;

    return new HotWords({
      list: hotWords,
      onHotWordClick: this.onHotWordClick.bind(this),
    });
  }
  
  render() {
    const { hotWords } = this.state;

    const oContainer = document.createElement('div');
    oContainer.className = `search-container J_SearchContainer`;
    oContainer.innerHTML = `
      <!-- hot-words -->
      ${ getComponentTpl(new HotWords({
          list: hotWords,
          onHotWordClick: this.onHotWordClick.bind(this),
        }))
      }
    `;
    return oContainer;
  }

  initState() {
    const { RECENT_SEARCHED, HOT_WORDS } = SEARCH_KEYS;

    this.recentSearchedStorage = new StoragePool({ key: RECENT_SEARCHED });
    this.hotWordsStorage = new StoragePool({ key: HOT_WORDS });

    this.setState({
      recentSearched: this.recentSearchedStorage.getItem(),
      hotWords: this.hotWordsStorage.getItem(),
    });
  }

  initDOM() {
    this.oContainer = document.getElementsByClassName('J_SearchContainer')[0];

    this.oHotWords = this.oContainer.getElementsByClassName('J_HotWords')[0];
  }

  update(field) {
    const { RECENT_SEARCHED, HOT_WORDS } = SEARCH_KEYS;

    switch (field) {
      case HOT_WORDS:
        if (this.oHotWords) {
          this.oHotWords.outerHTML = this.hotWords.render().outerHTML;
        }
        break;
      case RECENT_SEARCHED:
        break;
      default:
        break;
    }
  }

  async getHotWordsData() {
    const { data } = await searchModel.getHotWordsData();

    this.setState({
      hotWords: data.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
      })),
    }, () => {
      this.update(SEARCH_KEYS.HOT_WORDS);
    });
  }

  onHotWordClick(item) {
    const { onHotWordClick } = this.props;

    typeof onHotWordClick === 'function' && onHotWordClick(item);
  }
}

export default SearchContainer;
