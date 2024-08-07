const myLibrary = [];
const tableContainer = document.querySelector('#table-container');
const addBtn = document.querySelector('#add-book')

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = prompt("What is the name of the book? ");
    const author = prompt("What is the name of the author? ");
    const pages = prompt("How many pages are there in the book? ");
    const read = askYesNoQuestion('Did you read it already?');
  
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    tableContainer.innerHTML = displayBooksToTable(myLibrary);
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
    let table = '<table>';
    table += '<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th></tr>';  
    data.forEach(item => {
        table += `<tr><td>${item.title}</td><td>${item.author}</td><td>${item.pages}</td><td>${item.read}</td></tr>`;
    });
    table += '</table>';
    return table;
}

addBtn.addEventListener('click', addBookToLibrary);
// addBookToLibrary();
// console.log(myLibrary);

// addBookToLibrary();
// console.log(myLibrary);