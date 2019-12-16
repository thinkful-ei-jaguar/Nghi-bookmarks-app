const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


function viewStore() {
}

function addBookmark(formData) {
  // Add bookmark to STORE
  STORE.bookmarks.push(formData);
  console.log(STORE.bookmarks);
  debugger;
}








export default {
  STORE,
  viewStore,
  addBookmark
};