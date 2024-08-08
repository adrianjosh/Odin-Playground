const myLibrary = [];
const libraryTableBody = document.querySelector('table tbody');
const bookForm = document.getElementById('book-form');

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = this.generateUniqueId();
}

Book.prototype.generateUniqueId = function() {
    return '_' + Math.random().toString(36).substring(2, 9);
};

Book.prototype.toggleReadStatus = function() {
    this.readStatus = this.readStatus === "Read" ? "Not Read" : "Read";
};

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value.trim();
    const readStatus = document.getElementById('readStatus').value;

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, readStatus);
        clearForm();
        displayBooksToTable();
    }
});

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('readStatus').value = 'Not Read';
}

function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
}

function displayBooksToTable() {
    libraryTableBody.innerHTML = '';
    myLibrary.forEach(book => {
        let tr = document.createElement('tr');

        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let deleteCell = document.createElement('td');
        let statusCell = document.createElement('td');
        let deleteBtn = document.createElement('button');
        let statusBtn = document.createElement('button');

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-id', book.id);
        deleteBtn.addEventListener('click', function() {
            deleteBookById(book.id);
            displayBooksToTable();
        });

        statusBtn.textContent = book.readStatus;
        statusBtn.classList.add('status-btn', book.readStatus === 'Read' ? 'read' : 'not-read');
        statusBtn.addEventListener('click', function() {
            book.toggleReadStatus();
            displayBooksToTable();
        });
        
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);

        statusCell.appendChild(statusBtn);
        deleteCell.appendChild(deleteBtn);
        tr.appendChild(statusCell);
        tr.appendChild(deleteCell);
        
        libraryTableBody.appendChild(tr);
    });
    
}

function findBookIndexById(id) {
    return myLibrary.findIndex(book => book.id === id);
}

function deleteBookById(id) {
    const index = findBookIndexById(id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        console.log(`Book with ID ${id} deleted.`);
    } else {
        console.log(`Book with ID ${id} not found.`);
    }
}


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, 'Not Read');
displayBooksToTable();