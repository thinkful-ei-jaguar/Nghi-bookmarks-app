/* eslint-disable no-prototype-builtins */
const STORE = {bookmarks: []};

function findByID(id) {
  // Find id of bookmark
  return STORE.bookmarks.find(element => element.id === id);
}

function setStoreProperties() {
  // Set store default properties if haven't
  if(!STORE.hasOwnProperty('filter')) {
    STORE.adding = false;
    STORE.error = null;
    STORE.filter = 0;
    STORE.bookmarks.map(element => {
      element.expanded = false;
    });
  }
}

function checkExpandProperty(index) {
  const addClass = 'hide';
  if(STORE.bookmarks[index].expanded === true) {
    return addClass;
  }
}

function viewStore() {
}

function addBookmark(item) {
  // Add bookmark to STORE
  STORE.bookmarks.push(item);
}








export default {
  STORE,
  viewStore,
  addBookmark,
  setStoreProperties,
  findByID,
  checkExpandProperty
};