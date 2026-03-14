// 1. Error Handling Logic (Async/Await Trap) 
// Consider the following code: 
async function getUser() {
    try {
        const user = database.findById(5);
        return user.name;
    } catch (err) {
        console.error("Error occurred");
    }
}
getUser();


// a) Why will the catch block NOT handle database errors in this code?
/*Ans :- the catch block NOT hande database errors because findById() method returns promise and it is not awaited so it is will not wait to resolve or reject the promise and executed

*/
// b) Rewrite the function so errors are handled correctly using async/await.

async function getUser() {
    try {
        const user = await database.findById(5);
        if(!user){
            throw new Error("user not exist!!");
        }
        return user.name;
    } catch (err) {
        console.error("Error occurred");
    }
}
getUser();


// c) What type of error is this: synchronous or asynchronous?

// Ans :- asynchronous