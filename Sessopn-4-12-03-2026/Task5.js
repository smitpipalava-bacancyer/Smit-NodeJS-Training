// 5. CRUD Logic Bug 


// Look at this Express code: 
router.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json'));
    res.json(users);
});

// a) Why is readFileSync considered a bad practice in production servers?
// Ans :- because this method / function read the file synchronously means the main thread will be block until the file fully read. so suppose in production we use this method and it takes much time to read the file then it is not acceptable.

// b) Rewrite the route using async/await with fs.promises.
const fs = require("fs").promises;

router.get('/users' ,async (req,res)=>{
    try{
        const data = await fs.readFile("./data/users.json");
        
        const users = JSON.parse(data);

        res.json(users);
    }catch(err){
        res.status(500).json({ error: "Failed to read users" });
    }
})

// c) What will happen to the Node.js event loop if many requests call this route simultaneously?

// Ans :- if many requests call this route simultaneously using readFileSync then it block the event loop because it goes to the libuv thread and it has only 4 thread so all become busy.. so Node.js executes one by one...