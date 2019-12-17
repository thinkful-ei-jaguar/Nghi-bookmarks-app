import $ from 'jquery';

import './index.css';

import api from './api';
import store from './store';
import bookmark from './bookmark';

function renderPage() {
  // Get list from api and push to store
  bookmark.updateList();
  // Listen to events
  bookmark.activeEventHandlers();
  // Show DOM
  bookmark.render();
}

$(renderPage);




