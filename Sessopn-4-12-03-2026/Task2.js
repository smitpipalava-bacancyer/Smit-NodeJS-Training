// 2. Express Error Middleware Flow 
// Look at this route handler: 

app.get('/user/:id', async (req, res, next) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        throw new Error("User not found");
    }
    res.json(user);
});

// a) If getUserById() throws an error, will Express automatically send it to error middleware? Why or why not?
// Ans :- No . Express will not automatically send it to error middleware because this function is asynchronous so it returns the promise. and if the operation to find the user with Id gets failed then it reject the promise and it returns the unhandlededPromise error..



// b) Modify the code so the error correctly reaches Express error middleware.
app.get('/user/:id', async (req, res, next) => {
    const user = await getUserById(req.params.id);
    try{
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    }catch(err){
        next(err);
    }
})


// c) What is the correct signature of an Express error middleware?
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: err.message
    })
})