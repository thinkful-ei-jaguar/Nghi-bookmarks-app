import $ from 'jquery';

import api from './api';
import store from './store';

function bookmarkHTML(element) {
  // HTML template for each bookmark
  return `<li class="js-bookmark-item">
      <div class="js-close-view">
          <span class="js-title">${element.title}</span>
          <span class="js-rating">${element.rating}</span>
      </div>
      <div class="js-open-view">
          <section class="js-bookmark-header">
              <span class="js-title">${element.rating}</span>
              <button class="js-remove"></button>
          </section>
          </section class="js-bookmark-detail">
              <button class='js-visit-page'>Visit Page</button>
              <span class="js-rating">${element.rating}</span>
              <p class="js-description">${element.description}</p>
          </section>
      </div>
      </li>`;
}

function printList() {
  // Print bookmark list
  api.viewList()
    .then(
      data => {
        data.array.forEach(element => {
          store.STORE.bookmarks.push(element);
          bookmarkHTML(element);
        });
      }
    );
}



function activeEventHandlers() {
}

export default {
  activeEventHandlers,
  printList
};