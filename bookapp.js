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
    btitle.textContent = book.title;
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

  static addBook(Book) {
    const bookArr = Storage.getBooks();
    bookArr.push(Book);
    localStorage.setItem('books', JSON.stringify(bookArr));
  }

  static deleteBook() {
    const bookArr = Storage.getBooks();
    bookArr.forEach((Book, index) => {
      if (bookArr[index] === Book) {
        bookArr.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(bookArr));
  }
}

// events
document.addEventListener('DOMContentLoaded', Display.createBooks);

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = tInput.value;
    const authorName = aInput.value;
    const bookArr = new Book(bookTitle, authorName);

    // Add Book to UI
    Display.showBookList(Book);

    // Add book to store
    Storage.addBook(Book);

    // Clear fields
    Display.clearInputs();
  }
)

// Event: Remove a Book
listContainer.addEventListener('click', (e) => {
    // Remove book from UI
    Display.removeBook(e.target);
  
    // Remove book from store
    Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });


// window.addEventListener('load', () => {

//   let i = 0;
//   while (i < bookArr.length) {
//     showBookList(i);
//     i += 1;
//   }
//   localStorage.setItem('books', JSON.stringify(bookArr));
// });


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


