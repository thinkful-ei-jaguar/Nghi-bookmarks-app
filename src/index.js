import $ from 'jquery';

import './index.css';

import api from './api';
import store from './store';
import bookmark from './bookmark';

function renderPage() {
  //bookmark.activeEventHandlers();
  // bookmark.render();
  api.viewList()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
}

$(renderPage);




