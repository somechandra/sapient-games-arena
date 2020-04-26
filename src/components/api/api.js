export const apiCall = (link, optObj) =>
  fetch(link, optObj).then(response => response.json());
