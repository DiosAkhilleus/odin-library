console.log('works');



let form = document.getElementById('libform');
form.addEventListener('submit', handleForm);
form.addEventListener('submit', submit);

// document.querySelector('#libform').addEventListener('submit', submit);

function handleForm(event) {  event.preventDefault();  }

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBook (newBook) { // adds a new book with the user's form input to the myLibrary array
    myLibrary.push(newBook);
}






function remove(event) { // removes the targeted row on the library table
    event.target.style="color:red";
    let td = event.target.parentNode;
    let tr = td.parentNode;
    td.parentNode.removeChild(td);
}



function submit() { // takes user form input, creates a book with it, stores the book in the myLibrary array, and adds it to the displayed table
    let form = document.getElementById('libform');
    let newBook = Array.from(document.querySelectorAll('#libform input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    let stat = document.querySelector('#libform select');
    let value = stat.options[stat.selectedIndex].value;
    newBook.status = value;

    addBook(newBook);

    let table = document.getElementById('table');
    let newRow = table.insertRow(table.length);
    let t = newRow.insertCell(0);
    let a = newRow.insertCell(1);
    let p = newRow.insertCell(2);
    let s = newRow.insertCell(3);
    let del = newRow.insertCell(4);
    del.setAttribute('class', 'remove');

    let title = newBook.title;
    let author = newBook.author;
    let pages = newBook.pages;
    let status = newBook.status;

    t.innerHTML = `${title}`;
    a.innerHTML = `${author}`;
    p.innerHTML = `${pages}`;
    s.innerHTML = `${status}`;
    del.innerHTML = 'Remove';

    setRems();
    form.reset();
}


//this adds event listeners to each "remove" element in the table

function setRems () {
    let rem = document.getElementsByClassName('remove');
    for(let i = 0; i < rem.length; i++){
        rem[i].addEventListener('click', remove);
    }
}


