const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./4_Bibliothek/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const books = [
    {
        isbn: "978-3551551931",
        title: "Harry Potter and the Goblet of Fire",
        year: 2005,
        author: "J.K. Rolling"
    },
    {
        isbn: "978-0062077011",
        title: "To Kill a Mockingbird",
        year: 1960,
        author: "Harper Lee"
    },
    {
        isbn: "978-0141182605",
        title: "1984",
        year: 1949,
        author: "George Orwell"
    },
    {
        isbn: "978-0062315007",
        title: "The Great Gatsby",
        year: 1925,
        author: "F. Scott Fitzgerald"
    },
    {
        isbn: "978-0140449334",
        title: "Pride and Prejudice",
        year: 1813,
        author: "Jane Austen"
    },
    {
        isbn: "978-0061120084",
        title: "The Catcher in the Rye",
        year: 1951,
        author: "J.D. Salinger"
    }
];

const lentBooks = [
    {
        id: 1,
        customer_id: 1,
        isbn: "978-3551551931",
        borrowed_at: "01.01.2022",
        returned_at: "01.02.2023"
    },
    {
        id: 2,
        customer_id: 2,
        isbn: "978-0062077011",
        borrowed_at: "01.01.2022",
        returned_at: "01.02.2023"
    },
    {
        id: 3,
        customer_id: 3,
        isbn: "978-0141182605",
        borrowed_at: "01.01.2022",
        returned_at: "01.02.2023"
    }
]

function findBook(isbn) {
    return books.find((book) => book.isbn === isbn);
}

function findLentBook(id) {
    return lentBooks.find((lend) => lend.id == id);
}

//Teil 1
app.get('/books', (request, response) => {
    response.json(books);
});

app.get('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const book = findBook(isbn);

    if(!isbn || !book) {
        response.sendStatus(404);
    } else {
        response.json(book);
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/books', (request, response) => {
    const newBook =  request.body;

    if(!newBook.isbn && !newBook.title && !newBook.year && !newBook.author) {
        response.sendStatus(406);
    } else {
        books.push(newBook);
        response.json(newBook);
    }
});

app.post('/books/:isbn', (request, response) => {
    const newBook =  request.body;
    const isbn = request.params.isbn;

    if(!newBook.isbn && !newBook.title && !newBook.year && !newBook.author) {
        response.sendStatus(406);
    } else {
        for(let i = 0; i < books.length; i++) {
            if(isbn === books[i].isbn) {
                books[i] = newBook;
                response.json(newBook).statusCode(201);
                break;
            }
        }
    }
});

app.delete('/books/delete/:isbn', (request, response) => {
    const isbn = request.params.isbn;

    for(let i = 0; i <= books.length; i++) {    
        if(isbn === books[i].isbn) {
            response.json(books.splice(i, 1)).statusCode(200);
            break;
        }
    }
    response.sendStatus(404);
});

//Teil 2
app.get('/lends', (request, response) => {
    response.json(lentBooks);
})

app.get('/lends/:id', (request, response) => {
    const id = request.params.id;
    response.json(findLentBook(id));
})

app.post('/lends', (request, response) => {
    const newLendBooks = request.body;
    newLendBooks.id = newLendBooks.customer_id;
    
    if(!newLendBooks.id && !newLendBooks.customer_id && !newLendBooks.isbn && !newLendBooks.borrowed_at && !newLendBooks.returned_at) {
        response.sendStatus(406);
    } else {
        lentBooks.push(newLendBooks);
        response.json(newLendBooks);
    }
})

app.patch('/lends/:id', async (request, response) => {
    const newDates = request.body;
    const id = request.params.id;
    
    let lendBook = findLentBook(id);
    await Object.assign(lendBook, newDates)
    response.json(lendBook);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});