class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.id = this.generateUniqueId();
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }

    toggleReadStatus() {
        this.readStatus = this.readStatus === 'Read' ? 'Not Read' : 'Read';
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.libraryTableBody = document.querySelector('table tbody');
    }

    addBookToLibrary(title, author, pages, readStatus) {
        const book = new Book(title, author, pages, readStatus);
        this.myLibrary.push(book);
    }

    findBookIndexById(id) {
        return this.myLibrary.findIndex(book => book.id === id);
    }

    deleteBookById(id) {
        const index = this.findBookIndexById(id);
        if (index !== -1) {
            this.myLibrary.splice(index, 1);
            console.log(`Book with ID ${id} deleted.`);
        } else {
            console.log(`Book with ID ${id} not found.`);
        }
    }

    displayBooksToTable() {
        this.libraryTableBody.innerHTML = '';
        this.myLibrary.forEach(book => {
            const tr = document.createElement('tr');
    
            const title = document.createElement('td');
            const author = document.createElement('td');
            const pages = document.createElement('td');
            const deleteCell = document.createElement('td');
            const statusCell = document.createElement('td');

            title.textContent = book.title;
            author.textContent = book.author;
            pages.textContent = book.pages;

            const statusBtn = document.createElement('button');
            statusBtn.textContent = book.readStatus;
            statusBtn.classList.add('status-btn', book.readStatus === 'Read' ? 'read' : 'not-read');
            statusBtn.addEventListener('click', ()=> {
                book.toggleReadStatus();
                this.displayBooksToTable();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', ()=> {
                this.deleteBookById(book.id);
                this.displayBooksToTable();
            });

            tr.appendChild(title);
            tr.appendChild(author);
            tr.appendChild(pages);
    
            statusCell.appendChild(statusBtn);
            deleteCell.appendChild(deleteBtn);
            tr.appendChild(statusCell);
            tr.appendChild(deleteCell);
            
            this.libraryTableBody.appendChild(tr);
        });
    }
}

class FormDetailsToBook {
    constructor(_library) {
        this.library = _library;
        this.bookForm = document.getElementById('book-form');
        this.bookForm.addEventListener('submit',this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
    
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const pages = document.getElementById('pages').value.trim();
        const readStatus = document.getElementById('readStatus').value;
    
        if (title && author && pages) {
            this.library.addBookToLibrary(title, author, pages, readStatus);
            this.clearForm();
            this.library.displayBooksToTable();
        }
    }

    clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('readStatus').value = 'Not Read';
    }
}

const library = new Library();
const bookForm = new FormDetailsToBook(library);

window.addEventListener("DOMContentLoaded", function() {
    library.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, 'Not Read');
    library.displayBooksToTable();
}, false);
