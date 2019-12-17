import $ from 'jquery';

import './index.css';

import api from './api';
import store from './store';
import bookmark from './bookmark';

function renderPage() {
  // Get bookmark list from API
  api.viewList()
    .then(data => {
      console.log(data);
      // Push bookmarks to store
      data.forEach((element) => {
        store.addBookmark(element);
      });
      // Set store default properties if hasn't done so already
      store.setStoreProperties();
      bookmark.render();
    });
  bookmark.activeEventHandlers();
  bookmark.render();
}

$(renderPage);




