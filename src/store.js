/* eslint-disable no-prototype-builtins */
const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

function findByID(id) {
  // Find id of bookmark
  return STORE.bookmarks.find(element => element.id === id);
}

function setExpandProperty() {
  // Set all bookmarks with default property of false if this is our first time rendering page
  if(!STORE.bookmarks[0].hasOwnProperty('expanded')) {
    STORE.bookmarks.map(element => element.expanded = false);
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

function addBookmark(formData) {
  // Add bookmark to STORE
  STORE.bookmarks.push(formData);
}








export default {
  STORE,
  viewStore,
  addBookmark,
  setExpandProperty,
  findByID,
  checkExpandProperty
};