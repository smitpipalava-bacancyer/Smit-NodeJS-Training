const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const Users_File_URL = path.join(__dirname, "./Users.json");
const Products_File_URL = path.join(__dirname, "./Products.json");

const Status = {
    200: "Success",
    201: "Created",
    400: "Bad Request",
    404: "Not Found",
    500: "Server Error"
}

async function GeneralRequest(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        })

        req.on("end", () => {
            try {
                const parsedData = body ? JSON.parse(body) : {};
                resolve(parsedData);
            } catch (err) {
                reject(err);
            }
        })

        req.on("error", (err) => {
            reject(err);
        })
    })
}

function GeneralResponse(StatusCode, res, data, message) {
    res.writeHead(StatusCode, {
        "content-type": "application/json"
    })

    res.write(JSON.stringify({
        "status": Status[StatusCode],
        "message": message,
        "data": data
    }))

    res.end();
}


const server = http.createServer(async (req, res) => {
    const parsedurl = url.parse(req.url, true);
    const pathName = parsedurl.pathname;
    const query = parsedurl.query;


    if (req.method === "GET") {
        switch (pathName) {
            case "/users":
                if (query.id) {
                    // get the user with specific id which is in the query
                    console.log("it goes in /users/query.id");

                    getOneEntity(Users_File_URL, query.id, res);
                } else {
                    // get the all the users

                    console.log("it goes in else /users/query.id");
                    getAllData(Users_File_URL, res);
                }
                break;
            case "/products":
                if (query.id) {
                    // get the user with specific id which is in the query

                    console.log("it goes in /products/query.id");
                    getOneEntity(Products_File_URL, query.id, res);
                } else {
                    // get the all the users

                    console.log("it goes in else/products/query.id");
                    getAllData(Products_File_URL, res);
                }
                break;
            default:
                // send the 404 error to the client
                GeneralResponse(404, res, null, "Invalid URL!!");
                break;
        }
    } else if (req.method === "POST") {
        switch (pathName) {
            case "/users":
                // add the user in the Users..
                AddUser(Users_File_URL , req , res);
                break;
            case "/products":
                // add the product in the Products..
                AddProduct(Products_File_URL , req , res);
                break;
            default:
                // send the 404 error to the client
                GeneralResponse(404, res, null, "Invalid URL!!");
                break;
        }
    } else if (req.method === "DELETE") {
        switch (pathName) {
            case "/users":
                DeleteUser(Users_File_URL, query.id, res);
                // delete the user in the Users for special id..
                break;
            case "/products":
                // delete the product in the Products for special id..
                DeleteProduct(Products_File_URL, query.id, res);
                break;
            default:
                // send the 404 error to the client
                GeneralResponse(404, res, null, "Invalid URL!!");
                break;
        }

    } else if (req.method === "PUT") {
        switch (pathName) {
            case "/users":
                // update the user in the Users for special id..
                UpdateUser(Users_File_URL , query.id , req , res);
                break;
            case "/products":
                // update the product in the Products for special id..
                UpdateProduct(Products_File_URL , query.id , req , res);
                break;
            default:
                // send the 404 error to the client
                GeneralResponse(404, res, null, "Invalid URL!!");
                break;
        }
    }
});

function getAllData(FilePath, res) {
    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {
            const Entities = JSON.parse(data);

            if (Entities.length == 0) {
                GeneralResponse(404, res, null, "FILE IS EMPTY!!");
            } else {
                GeneralResponse(200, res, Entities, "DATA SUCCESSFULLY FETCHED!!");
            }
        }
    });
}

function getOneEntity(FilePath, queryId, res) {
    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {

            const Entities = JSON.parse(data);

            const Entity = Entities.filter((element) => element.id == queryId);

            if (Entity.length == 0) {
                GeneralResponse(404, res, null, "USER NOT FOUND!!");
            } else {
                GeneralResponse(200, res, Entity, "DATA SUCCESSFULLY FETCHED!!");
            }
        }
    });
}

async function AddUser(FilePath, req , res) {
    const requestData  = await GeneralRequest(req);

    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            return GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {
            const Entities = JSON.parse(data);

            // add new user
            Entities.push(requestData );

            console.log(Entities);

            fs.writeFile(FilePath, JSON.stringify(Entities),"utf-8",(err)=>{
                if (err) {
                    return GeneralResponse(500, res, null, "Error Adding Data");
                }

                return GeneralResponse(201, res, requestData, "USER ADDED SUCCESSFULLY");
            })
        }
    });
}

async function AddProduct(FilePath, req , res) {
    const requestData  = await GeneralRequest(req);

    console.log(requestData);

    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            return GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {
            const Entities = JSON.parse(data);

            // add new user
            Entities.push(requestData );

            console.log(Entities);

            fs.writeFile(FilePath, JSON.stringify(Entities),"utf-8",(err)=>{
                if (err) {
                    return GeneralResponse(500, res, null, "Error Adding Data");
                }

                return GeneralResponse(201, res, requestData, "Product ADDED SUCCESSFULLY");
            })
        }
    });
}

function DeleteUser(FilePath, queryId, res) {
    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {

            const Entities = JSON.parse(data);

            const Entity = Entities.filter((element) => element.id != queryId);

            // EDGE CASE: ID not found
            if (Entities.length === Entity.length) {
                return GeneralResponse(404, res, null, "USER NOT FOUND!!");
            }

            fs.writeFile(FilePath, JSON.stringify(Entity), "utf-8", (err) => {
                if (err) {
                    GeneralResponse(500, res, null, "Error writing file");
                } else {
                    GeneralResponse(200, res, Entity, "DATA SUCCESSFULLY DELETED!!");
                }
            });

        }
    });
}

function DeleteProduct(FilePath, queryId, res) {
    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {

            const Entities = JSON.parse(data);

            const Entity = Entities.filter((element) => element.id != queryId);

            // EDGE CASE: ID not found
            if (Entities.length === Entity.length) {
                return GeneralResponse(404, res, null, "PRODUCT NOT FOUND!!");
            }

            fs.writeFile(FilePath, JSON.stringify(Entity), "utf-8", (err) => {
                if (err) {
                    GeneralResponse(500, res, null, "Error writing file");
                } else {
                    GeneralResponse(200, res, Entity, "DATA SUCCESSFULLY DELETED!!");
                }
            });

        }
    });
}

async function UpdateUser(FilePath , queryId , req , res){
    const requestData  = await GeneralRequest(req);

    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            return GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {
            const Entities = JSON.parse(data);
            
            const oldData = Entities.find((element)=> element.id == queryId);

            const newData =[...Entities.filter((element)=> element.id != oldData.id), {...oldData ,...requestData}];

            fs.writeFile(FilePath, JSON.stringify(newData),"utf-8",(err)=>{
                if (err) {
                    return GeneralResponse(500, res, null, "Error Adding Data");
                }

                return GeneralResponse(201, res, newData, "USER UPDATED SUCCESSFULLY");
            })
        }
    });
}

async function UpdateProduct(FilePath , queryId , req , res){
    const requestData  = await GeneralRequest(req);

    fs.readFile(FilePath, "utf-8", (err, data) => {
        if (err) {
            return GeneralResponse(500, res, null, "Error Data Reading!!");
        } else {
            const Entities = JSON.parse(data);

            const oldData = Entities.find((element)=> element.id == queryId);

            const newData =[...Entities.filter((element)=> element.id != oldData.id), {...oldData ,...requestData}];

            fs.writeFile(FilePath, JSON.stringify(newData),"utf-8",(err)=>{
                if (err) {
                    return GeneralResponse(500, res, null, "Error Adding Data");
                }

                return GeneralResponse(201, res, newData, "PRODUCT UPDATED SUCCESSFULLY");
            })
        }
    });
}

server.listen(3000, () => {
    console.log("SERVER HAS BEEN STARTED!!!");
})