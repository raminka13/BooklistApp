//--------Variables for the Book List--------------

const tInput = document.getElementById('title');
const aInput = document.getElementById('author');
const addBtn = document.getElementById('add');
const listContainer = document.getElementById('book-list');

//-------Array Declaration---------
let bookArr = [];

//-------Class Implementation to create objects-------

class createBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
};

//-----Function to create the elements in the DOM dynamically-----

function showBookList(index) {
  const bookInfo = document.createElement('div')
  bookInfo.className = 'book';
  
  const btitle = document.createElement('h2');
  btitle.textContent = bookArr[index].title;
  bookInfo.appendChild(btitle);

  const author = document.createElement('h2');
  author.textContent = bookArr[index].author;
  bookInfo.appendChild(author);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  bookInfo.appendChild(removeBtn);  
  listContainer.appendChild(bookInfo); 

  removeBtn.addEventListener('click', () => {
    bookArr.splice(index, 1);
    listContainer.removeChild(bookInfo);
    localStorage.setItem('books', JSON.stringify(bookArr));
  })
  
}

//----------Event Listener for add button-----

addBtn.addEventListener('click', (e) => {
  let booktitle = tInput.value;
  let authorName = aInput.value;
  tInput.value = '';
  aInput.value = '';
  let addBook = new createBook(booktitle, authorName);
  bookArr.push(addBook);
  showBookList(bookArr.length-1);
  e.preventDefault();
  localStorage.setItem('books', JSON.stringify(bookArr)); 
})


//----------Local Storage-----------

window.addEventListener('load', () => {
  if (localStorage.getItem('books')) {
    bookArr = JSON.parse(localStorage.getItem('books'));
  }
  let i = 0;
  while ( i < bookArr.length) {
    showBookList(i);
    i++;
  }
  localStorage.setItem('books', JSON.stringify(bookArr));
});






