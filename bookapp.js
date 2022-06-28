// --------Variables for the Book List--------------

const tInput = document.getElementById('title');
const aInput = document.getElementById('author');
const addBtn = document.getElementById('add');
const listContainer = document.getElementById('book-list');

// -------Class Implementation to create objects-------

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// -----Function to create the elements in the DOM dynamically-----
class Display {
  static createBooks() {
    const bookArr = Storage.getBooks();

    bookArr.forEach((book) => Display.showBookList(book));
  }

  static showBookList(book) {
    const bookInfo = document.createElement('div');
    bookInfo.className = 'book';

    const btitle = document.createElement('h2');
    btitle.textContent = `"${book.title}" by`;
    bookInfo.appendChild(btitle);

    const author = document.createElement('h2');
    author.textContent = book.author;
    bookInfo.appendChild(author);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    bookInfo.appendChild(removeBtn);
    listContainer.appendChild(bookInfo);

    // removeBtn.addEventListener('click', () => {
    //   bookArr.splice(index, 1);
    //   listContainer.removeChild(bookInfo);
    //   localStorage.setItem('books', JSON.stringify(bookArr));
    // });
  }

  static removeBook(el) {
    if(el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }

  static clearInputs() {
    tInput.value = '';
    aInput.value = '';
  }
}

  // ----------Event Listener for add button-----

  // addBtn.addEventListener('click', (e) => {
  //   const booktitle = tInput.value;
  //   const authorName = aInput.value;
  //   tInput.value = '';
  //   aInput.value = '';
  //   const addBook = new Book(booktitle, authorName);

  //   showBookList(bookArr.length - 1);
  //   e.preventDefault();

  // });

// ----------Local Storage-----------


//Class Store books
class Storage {
  static getBooks() {
    let bookArr;
    if (localStorage.getItem('books') === null) {
      bookArr = [];
    } else {
      bookArr = JSON.parse(localStorage.getItem('books'));
    }

    return bookArr;
  }

  static addBook(book) {
    const bookArr = Storage.getBooks();
    bookArr.push(book);
    localStorage.setItem('books', JSON.stringify(bookArr));
  }

  static deleteBook(book) {
    const bookArr = Storage.getBooks();
    bookArr.forEach((book, index) => {
      if (bookArr[index] === book) {
        bookArr.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(bookArr));
  }
}

// window.addEventListener('load', () => {

//   let i = 0;
//   while (i < bookArr.length) {
//     showBookList(i);
//     i += 1;
//   }
//   localStorage.setItem('books', JSON.stringify(bookArr));
// });
