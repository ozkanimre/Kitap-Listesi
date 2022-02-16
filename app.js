"use strict"


//getting data from localStorage and adding keys to sorted array , with sorted keys array we can have sorted objects
let unreadKeys = [], readKeys = [];
let readBooksArray = {}, unReadBooksArray = {};
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key.includes('r')) {
    readKeys.push(key);
  } else {
    unreadKeys.push(key);
  }
}
readKeys.sort();
unreadKeys.sort();
for (let i = 0; i < readKeys.length; i++) {
  readBooksArray[readKeys[i]] = localStorage.getItem(readKeys[i]);
}
for (let i = 0; i < unreadKeys.length; i++) {
  unReadBooksArray[unreadKeys[i]] = localStorage.getItem(unreadKeys[i]);
}


//delete function
function reply_click(clicked_id) {
  confirm(`Are you sure ?`) ? localStorage.removeItem(clicked_id) : "";
  document.location.reload();
}


//read books form submit function
const readBookForm = document.querySelector("#readBookForm");
readBookForm.addEventListener('submit', onSubmit1);
function onSubmit1(e) {
  e.preventDefault();
  const bookName = document.querySelector("#readBookName");
  const bookRate = document.querySelector("#readBookRate");
  let msg = document.querySelector("#msgReadBook");
  if (bookName.value === "" || bookRate.value === "") {
    msg.classList.add("alert");
    msg.classList.add("alert-danger");
    msg.textContent = "Please fill the blanks.";
    setTimeout(() => msg.classList.remove("alert"), 3000);
    setTimeout(() => msg.classList.remove("alert-danger"), 3000);
    setTimeout(() => msg.textContent = "", 3000);
  } else {
    addReadListItem(bookName.value,bookRate.value);
    bookName.value = '';
  }
}

//read books local storage add function 
function addReadListItem(bookName,bookRate) {
  if (readKeys.length === 0) {
    localStorage.setItem(`r0-${bookRate}`, bookName);
  } else {
    let str = readKeys[readKeys.length - 1];
    let strArray = str.split("-");
    var matches = strArray[0].match(/(\d+)/);
    localStorage.setItem(`r${Number(matches[0])+1}-${bookRate}`, bookName);
  }

  document.location.reload()
}

//read books html listing
for (const key in readBooksArray) {
  let ul = document.querySelector("#readBookList");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(readBooksArray[key]));
  li.classList.add("list-group-item");
  ul.appendChild(li);
}

//adding delete button and book rate to readbooks list html items 
let lilist = document.getElementById("readBookList").getElementsByTagName("li");
for (let i = 0; i < readKeys.length; i++) {
  let litem = lilist[i].innerHTML;
  let rate = readKeys[i].split("-");
  lilist[i].innerHTML = `<span class="badge bg-secondary rounded-pill">${rate[1]}</span> ` + litem + `<button id="${readKeys[i]}" onClick="reply_click(this.id)" class="badge float-end bg-danger border-0"> Del </button>`;
}
/* -------------------------------------------------------- */


//unread books form submit function
const unReadBookForm = document.querySelector('#unReadBookForm');
unReadBookForm.addEventListener('submit', onSubmit2);
function onSubmit2(e) {
  e.preventDefault();
  const bookName = document.querySelector("#unReadBookName");
  let msg = document.querySelector("#msgUnReadBook");

  console.log(msg);
  if (bookName.value === "") {
    msg.classList.add("alert");
    msg.classList.add("alert-danger");
    msg.textContent = "Please enter a book name.";
    setTimeout(() => msg.classList.remove("alert"), 3000);
    setTimeout(() => msg.classList.remove("alert-danger"), 3000);
    setTimeout(() => msg.textContent = "", 3000);
    bookName.value = '';
  } else {
    addUnReadListItem(bookName.value);
  }
}

//unread books localStorage add function

function addUnReadListItem(bookName) {
  if (unreadKeys.length === 0) {
    localStorage.setItem(`u0`, bookName);
  } else {
    let str = unreadKeys[unreadKeys.length - 1];
    var matches = str.match(/(\d+)/);
    localStorage.setItem(`u${Number(matches[0])+1}`, bookName);
  }

  document.location.reload()
}



//unread books html listing
for (const key in unReadBooksArray) {
  let ul = document.querySelector("#unReadBookList");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(unReadBooksArray[key]));
  li.classList.add("list-group-item");
  ul.appendChild(li);
}




//adding delete button to unreadbooks list items 
let lilist2 = document.getElementById("unReadBookList").getElementsByTagName("li");
for (let i = 0; i < unreadKeys.length; i++) {
  let litem = lilist2[i].innerHTML;
  lilist2[i].innerHTML = litem + `<button id="${unreadKeys[i]}" onClick="reply_click(this.id)" class="badge float-end bg-danger border-0"> Del </button>`;
}








