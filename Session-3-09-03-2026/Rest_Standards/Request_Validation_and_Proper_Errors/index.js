const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

let users = [];

function validateUser(body) {
    const errors = [];
    if (!body.name && !body.email) {
        errors.push("name is required", "email is required");
    }

    if (body.name) {
        errors.push("name is required");
    }

    if (body.name.trim().length == 0) {
        errors.push("name cannot be empty");
    }

    if (!body.email) {
        errors.push("email is required");
    }

    if (!body.email.includes("@")) {
        errors.push("email must contain @");
    }

    return errors;
}



app.post('/api/users', (req, res) => {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
        const message = errors[0];

        let status;

        if (message.includes("required")) {
            status = 400;
        } else {
            status = 422;
        }

        return res.status(status).json({
            error: {
                message: message,
                code: status
            }
        });
    }
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json({ data: user });
});


app.listen(PORT, (req, res) => {
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})