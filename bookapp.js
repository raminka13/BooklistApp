/* eslint-disable max-classes-per-file */

/* eslint no-use-before-define: ["error", { "classes": false }] */

// Book class constructor
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// UI class: Display books

class UI {
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach((book) => UI.addbooktoList(book));
  }

  static addbooktoList(book) {
    const list = document.querySelector('#book-list');

    const bookInfo = document.createElement('div');
    bookInfo.className = 'book';

    const btitle = document.createElement('h3');
    btitle.textContent = book.title;
    bookInfo.appendChild(btitle);

    const author = document.createElement('h3');
    author.textContent = ` by ${book.author} `;
    bookInfo.appendChild(author);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    bookInfo.appendChild(removeBtn);
    list.appendChild(bookInfo);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}
// Store: Handle Local Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Event to Display Book

document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event to Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  // Get values from the form
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  // Validation
  if (title === '' || author === '') {
    alert('Please fill in all fields');
  } else {
    // Start a new Book
    const book = new Book(title, author);

    // Add Book to UI
    UI.addbooktoList(book);

    // Add Book to LocalStorage
    Storage.addBook(book);

    // Clear fields
    UI.clearFields();
  }
});

// Event to Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from Storage
  Storage.removeBook(e.target.parentElement.firstChild.textContent);
});

// Event for SPA functionality

document.getElementById('list-btn').addEventListener('click', () => {
  document.getElementById('list').classList.add('show');
  document.getElementById('add').classList.remove('show');
  document.getElementById('contact').classList.remove('show');
  document.getElementById('list-btn').classList.add('active');
  document.getElementById('add-btn').classList.remove('active');
  document.getElementById('contact-btn').classList.remove('active');
});

document.getElementById('add-btn').addEventListener('click', () => {
  document.getElementById('add').classList.add('show');
  document.getElementById('list').classList.remove('show');
  document.getElementById('contact').classList.remove('show');
  document.getElementById('add-btn').classList.add('active');
  document.getElementById('list-btn').classList.remove('active');
  document.getElementById('contact-btn').classList.remove('active');
});

document.getElementById('contact-btn').addEventListener('click', () => {
  document.getElementById('contact').classList.add('show');
  document.getElementById('add').classList.remove('show');
  document.getElementById('list').classList.remove('show');
  document.getElementById('contact-btn').classList.add('active');
  document.getElementById('add-btn').classList.remove('active');
  document.getElementById('list-btn').classList.remove('active');
});
