
let form = document.getElementById('libform');
form.addEventListener('submit', handleForm);
form.addEventListener('submit', submit);

// document.querySelector('#libform').addEventListener('submit', submit);

function handleForm(event) {  event.preventDefault();  } // prevents page reloads on submit

let myLibrary = [
    { 
        title: "Hobbit", 
        author: "Tolkein", 
        pages: 234, 
        status: "Read"
    }
];

function Book(title, author, pages, status) { // Book constructor to use if necessary
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function populate() { // initial population of display with myLibrary data
    for(let i = 0; i < myLibrary.length; i++){
        let table = document.getElementById('table');
        let newRow = table.insertRow(table.length);
        newRow.setAttribute('id', `${myLibrary[i].title}`);
        let t = newRow.insertCell(0);
        let a = newRow.insertCell(1);
        let p = newRow.insertCell(2);
        let s = newRow.insertCell(3);
        let change = newRow.insertCell(4);
        let del = newRow.insertCell(5);
        s.setAttribute('id', Math.random());
        del.setAttribute('class', 'remove');
        change.setAttribute('class', 'switch');

        let title = myLibrary[i].title;
        let author = myLibrary[i].author;
        let pages = myLibrary[i].pages;
        let status = myLibrary[i].status;

        t.innerHTML = `${title}`;
        a.innerHTML = `${author}`;
        p.innerHTML = `${pages}`;
        s.innerHTML = `${status}`;
        change.innerHTML = 'Switch';
        del.innerHTML = 'Remove';
        setActions();
    }
}

function addBook (newBook) { // adds a new book with the user's form input to the myLibrary array
    myLibrary.push(newBook);
}

function remove(event) { // removes the targeted row on the library table
    let td = event.target.parentNode;
    let tr = td.parentNode;
    td.parentNode.removeChild(td);
}

function change(event) { // switches status of book in table and myLibrary array to either "Read" or "Unread" depending on what it currently is
    let td = event.target.parentNode;
    let el = td.id;
    let cell = document.getElementById(`${el}`).cells;

    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title == el && myLibrary[i].status == "Read") {
            myLibrary[i].status = "Unread";
            cell[3].innerHTML = `${myLibrary[i].status}`;
        }else {
            if(myLibrary[i].title == el && myLibrary[i].status == "Unread") {
                myLibrary[i].status = "Read";
                cell[3].innerHTML = `${myLibrary[i].status}`;
            } 
        }
    }
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
    newRow.setAttribute('id', `${newBook.title}`)
    let t = newRow.insertCell(0);
    let a = newRow.insertCell(1);
    let p = newRow.insertCell(2);
    let s = newRow.insertCell(3);
    let change = newRow.insertCell(4);
    let del = newRow.insertCell(5);
    s.setAttribute('id', Math.random());
    del.setAttribute('class', 'remove');
    change.setAttribute('class', 'switch');

    let title = newBook.title;
    let author = newBook.author;
    let pages = newBook.pages;
    let status = newBook.status;

    t.innerHTML = `${title}`;
    a.innerHTML = `${author}`;
    p.innerHTML = `${pages}`;
    s.innerHTML = `${status}`;
    change.innerHTML = 'Switch';
    del.innerHTML = 'Remove';

    setActions();
    form.reset();
}


//this adds event listeners to each "remove" and "switch" element in the table

function setActions () {
    let rem = document.getElementsByClassName('remove');
    let ch = document.getElementsByClassName('switch');
    for(let y = 0; y < ch.length; y++){
        ch[y].addEventListener('click', change);
    }
    for(let i = 0; i < rem.length; i++){
        rem[i].addEventListener('click', remove);
    }
}


