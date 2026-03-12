const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

let authors = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
let books = [{ id: 1, title: 'Clean Code', authorId: 1 }, { id: 2, title: 'Refactoring', authorId: 1 }, { id: 3, title: 'SICP', authorId: 2 }]


app.get("/api/authors", (req, res) => {
    res.status(200).json({ data: authors });
})

app.get("/api/authors/:id", (req, res) => {
    const ID = req.params.id;

    const author = authors.find(a => a.id === ID);

    if(!author){
        res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({data : author});
})

app.get("/api/authors/:id/books", (req, res) => {
    const ID = req.params.id;

    const authorExists = authors.some(a => a.id === ID);

    if (!authorExists) {
        return res.status(404).json({ message: "Author Not Found" });
    }

    const authorBooks = books.filter(book => book.authorId === ID);

    res.json({ data: authorBooks });
})

app.post("/api/authors/:id/books", (req, res) => {
    const ID = req.params.id;

    const { title } = req.body;

    if (!title || title.length === 0) {
        return res.status(400).json({ message: "Title is Missing" });
    }

    const authorExists = authors.some(element => element.id == ID);

    if (!authorExists) {
        return res.status(404).json({ message: "Author Not Found" });
    }

    books.push({ id: books.length + 1, title: title, authorId: ID });
    res.status(201).json({ message: "Book added successfully" });
})

app.get("/api/books", (req, res) => {
    res.json({ books });
})

app.listen(PORT, (req, res) => {
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})