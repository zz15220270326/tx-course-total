import '@/styles/search.scss';

import '@/assets/js/common.js';

// components
import Header from '@/components/common/header';

import SearchContainer from '@/components/container/search';
import SearchInput from '@/components/container/search/sub/search-input';

// utils
import { getComponentTpl } from '@/utils/tools';
import StoragePool from '@/plugins/storage';
import { SEARCH_KEYS } from '@/configs/data';

const App = () => {
  const oApp = document.getElementById('app');

  // components
  const searchContainer = new SearchContainer({
    onHotWordClick,
  });
  const searchInput = new SearchInput({
    placeholder: '找知识、找培训、找老师',
    closeText: '取消',

    onSearch,
    onBack,
  });

  // storagePool
  const recentSearched = new StoragePool({ key: SEARCH_KEYS.RECENT_SEARCHED });

  const init = () => {
    render(oApp);
  }

  function render(root) {
    root.innerHTML = `
      <!-- search-input -->
      ${
        getComponentTpl(new Header({
          template: getComponentTpl(searchInput),
        })) 
      }
      <!-- search-container -->
      ${
        getComponentTpl(
          searchContainer
        )
      }
    `;
  }

  function onSearch(searchValue) {
    const recentSearchedList = recentSearched.getItem();
    if (recentSearchedList.every(item => item !== searchValue)) {
      recentSearchedList.unshift(searchValue);
    }
    recentSearched.setItem(recentSearchedList);
    // window.location.search = setObjectToQuery(item);
  }

  function onBack() {
    history.go(-1);
  }

  function onHotWordClick(item) {
    searchInput.oSearchInput.value = String(item.name).trim();
    searchInput.oSearchInput.focus();
    onSearch(item.name);
  }

  init();
}

App();
