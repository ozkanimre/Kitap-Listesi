"use strict"




//read books form submit function
//okunan kitaplar için form submit kontrolü
const addReadBook = document.querySelector("#addReadBook");
addReadBook.addEventListener('submit', onSubmit1);
function onSubmit1(e) {
  e.preventDefault();
  const bookName = document.querySelector("#readBookName");
  let msg = document.querySelector("#msgReadBook");
  if (bookName.value === "") {
    msg.classList.add("alert");
    msg.classList.add("alert-danger");
    msg.textContent = "Lütfen bir kitap ismi giriniz.";
    setTimeout(() => msg.classList.remove("alert"), 3000);
    setTimeout(() => msg.classList.remove("alert-danger"), 3000);
    setTimeout(() => msg.textContent = "", 3000);
  } else {
    addReadListItem(bookName.value);
    bookName.value = '';
  }
}

//read books local storage add function 
//okunan kitaplar localstorage eleman ekleme fonksiyonu
function addReadListItem(bookName) {
  let counter = 0;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("r")) {
      counter++;
    }
  }
  localStorage.setItem(`r${counter}`, bookName);
  document.location.reload()
}



/* -------------------------------------------------------- */
//unread books form submit function
//okunacak kitaplar için form submit kontrolü
const addUnReadBook = document.querySelector('#addUnReadBook');
addUnReadBook.addEventListener('submit', onSubmit2);
function onSubmit2(e) {
  e.preventDefault();
  const bookName = document.querySelector("#unReadBookName");
  let msg = document.querySelector("#msgUnReadBook");

  console.log(msg);
  if (bookName.value === "") {
    msg.classList.add("alert");
    msg.classList.add("alert-danger");
    msg.textContent = "Lütfen bir kitap ismi giriniz.";
    setTimeout(() => msg.classList.remove("alert"), 3000);
    setTimeout(() => msg.classList.remove("alert-danger"), 3000);
    setTimeout(() => msg.textContent = "", 3000);
    bookName.value = '';
  } else {
    addUnReadListItem(bookName.value);
  }
}

//unread books localStorage add function
//okunacak kitaplar localStorage eleman ekleme fonksiyonu
function addUnReadListItem(bookName) {
  let counter = 0;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("u")) {
      counter++;
    }
  }
  localStorage.setItem(`u${counter}`, bookName);
  document.location.reload()
}


//read and unread books html listing
//okunacak kitaplar html listelemesi
for (let i = 0; i < localStorage.length; i++) {
  for(let j = 0 ; j<localStorage.length; j++){ 
    if (localStorage.key(j)==`r${i}`) {
      let bookName = localStorage.getItem(`r${i}`);
      let ul = document.querySelector("#readBookList");
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(bookName));
      li.classList.add("list-group-item");
      ul.appendChild(li);
    } else if (localStorage.key(j)==`u${i}`) {
      let bookName = localStorage.getItem(`u${i}`);
      let ul = document.querySelector("#unReadBookList");
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(bookName));
      li.classList.add("list-group-item");
      ul.appendChild(li);
    }
  }
  
}
