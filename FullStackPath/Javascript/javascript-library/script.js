const myLibrary = [];
const addBtn = document.querySelector('#add-book');
const libraryTableBody = document.querySelector('table tbody');

addBtn.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = generateUniqueId();
}

function addBookToLibrary() {
    const title = prompt("What is the name of the book? ");
    const author = prompt("What is the name of the author? ");
    const pages = prompt("How many pages are there in the book? ");
    const read = askYesNoQuestion('Did you read it already?');
  
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooksToTable(myLibrary);
}

function askYesNoQuestion(question) {
    let answer = prompt(question + " (yes or no)");
    if (answer.toLowerCase() === "yes") {
        return true;
    } else if (answer.toLowerCase() === "no") {
        return false;
    } else {
    // If the user enters an invalid response, prompt again
        alert("Please enter 'yes' or 'no'");
        return askYesNoQuestion(question);
    }
}


function displayBooksToTable(data) {
    libraryTableBody.innerHTML = '';
    data.forEach(item => {
        let tr = document.createElement('tr');

        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let read = document.createElement('td');
        let actionCell = document.createElement('td');
        let deleteBtn = document.createElement('button');

        title.textContent = item.title;
        author.textContent = item.author;
        pages.textContent = item.pages;
        read.textContent = item.read;

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        actionCell.appendChild(deleteBtn);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        tr.appendChild(read);
        tr.appendChild(actionCell);
        libraryTableBody.appendChild(tr);
    });
    
}


function generateUniqueId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

// function displayBooksToTable(data) {
//     let table = '<table>';
//     table += '<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th></tr>';  
//     data.forEach(item => {
        
//         table += `<tr><td>${item.title}</td><td>${item.author}</td><td>${item.pages}</td><td>${item.read}</td><td><button id="remove" value="${item.id}">Remove</button></td></tr>`;
//     });
//     table += '</table>';

//     return table;
// }

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

// addBookToLibrary();
// console.log(myLibrary);

// addBookToLibrary();
// console.log(myLibrary);