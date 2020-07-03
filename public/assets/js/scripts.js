
const scrape = document.getElementsByClassName('scrape-button');
const clear = document.getElementsByClassName('clear-button')[0];
const saveBtnArray = document.getElementsByClassName('save-button');
const deleteBtnArray = document.getElementsByClassName('delete-button');

for (i of scrape) {
  i.addEventListener('click', scrapeArticles);
}
clear.addEventListener('click', clearArticles);
// LOOP THROUGH BUTTONS ON SCREEN TO ADD CLICK LISTENERS TO EACH ONE
for (i of saveBtnArray) {
  i.addEventListener('click', saveArticle);
}
for (i of deleteBtnArray) {
  i.addEventListener('click', deleteArticle);
}

function scrapeArticles() {
  $.ajax({
    method: 'GET',
    url: '/scrape'
  }).then(function (data) {
    location.reload();
  });
}

function clearArticles() {
  $.ajax({
    method: 'GET',
    url: '/clear'
  }).then(function (data) {
    location.reload();
  });
}

function saveArticle(e) {
  let id = {
    id: e.target.attributes[2].textContent
  };
  console.log(id);
  $.ajax({
    method: 'PUT',
    url: '/save',
    data: id
  }).then(function (data) {
    location.reload();
  });
}

function deleteArticle(e) {
  let id = {
    id: e.target.attributes[2].textContent
  };
  console.log(id);
  $.ajax({
    method: 'PUT',
    url: '/delete',
    data: id
  }).then(function (data) {
    location.reload();
  });
}
