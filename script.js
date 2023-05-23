let myLibrary = [];
let button = document.getElementById('newBookBtn');

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      hasRead ? 'read' : 'not read yet'
    }`;
  };
}

function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = +document.getElementById('pages').value;
  const hasRead =
    document.querySelector('input[name="hasRead"]:checked').value === 'true';
  if (title !== '' && author !== '' && pages > 0) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
  }

  clearCardList();
  addBooksToDom();
  clearFields();
}

function clearCardList() {
  const divs = document.querySelectorAll('.book-card');
  divs.forEach((div) => {
    div.remove();
  });
}
function addBooksToDom() {
  let container = document.querySelector('.container');
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let card = document.createElement('div');
    card.className = 'book-card';
    let cardHtml = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}
        <i data-book=${i} id="delete-button" class="fa-solid fa-trash"></i>
        </p>
        <p>Pages: ${book.pages}</p>
        <p>Has ${book.hasRead ? 'read' : 'not read'}</p>
        <button data-book=${i} id="btn-read-status" class="btn card-btn">Change read status</button>
    `;
    card.innerHTML = cardHtml;
    card.addEventListener('click', changeBookStatus);
    container.appendChild(card);
  }
  //   console.log(container);
  //   cardSection.appendChild(card);
}

function clearFields() {
  const title = (document.getElementById('title').value = '');
  const author = (document.getElementById('author').value = '');
  const pages = (document.getElementById('pages').value = '');
  const hasRead = (document.querySelector(
    'input[name="hasRead"]:checked'
  ).checked = false);
}

function changeBookStatus(e) {
  const element = e.target;
  if (element.id === 'delete-button') {
    deleteBook(element);
  }

  if (element.id === 'btn-read-status') {
    changeReadStatus(element);
  }
}

function deleteBook(element) {
  const index = element.dataset.book;
  myLibrary.splice(index, 1);
  clearCardList();
  addBooksToDom();
}

function changeReadStatus(element) {
  const index = element.dataset.book;
  myLibrary[index].hasRead = !myLibrary[index].hasRead;
  clearCardList();
  addBooksToDom();
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 500, false);
const book3 = new Book('The Twin Towers', 'J.R.R. Tolkien', 295, false);
const book4 = new Book('The Return of the King', 'J.R.R. Tolkien', 789, false);

// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);
// addBookToLibrary(book4);

// console.log(book1.info());

// addBooksToDom();

// Event Listeners
button.addEventListener('click', addBookToLibrary);
