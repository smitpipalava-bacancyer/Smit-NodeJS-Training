const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', category: 'tech', price: 999 },
  { id: 2, name: 'Phone', category: 'tech', price: 499 },
  { id: 3, name: 'Desk', category: 'furniture', price: 299 },
  { id: 4, name: 'Chair', category: 'furniture', price: 199 },

  { id: 5, name: 'Tablet', category: 'tech', price: 399 },
  { id: 6, name: 'Monitor', category: 'tech', price: 299 },
  { id: 7, name: 'Keyboard', category: 'tech', price: 99 },
  { id: 8, name: 'Mouse', category: 'tech', price: 49 },
  { id: 9, name: 'Headphones', category: 'tech', price: 149 },
  { id: 10, name: 'Smartwatch', category: 'tech', price: 199 },

  { id: 11, name: 'Bookshelf', category: 'furniture', price: 249 },
  { id: 12, name: 'Bed', category: 'furniture', price: 799 },
  { id: 13, name: 'Sofa', category: 'furniture', price: 899 },
  { id: 14, name: 'Dining Table', category: 'furniture', price: 599 },
  { id: 15, name: 'Wardrobe', category: 'furniture', price: 699 },

  { id: 16, name: 'Camera', category: 'tech', price: 1099 },
  { id: 17, name: 'Speaker', category: 'tech', price: 179 },
  { id: 18, name: 'Router', category: 'tech', price: 129 },
  { id: 19, name: 'Gaming Console', category: 'tech', price: 499 },
  { id: 20, name: 'Microphone', category: 'tech', price: 89 }
];


app.get('/api/products', (req, res) => {
    const { category, sort, page = 1, limit = 10 } = req.query;
    let result = [...products];

    // /api/products?category=tech
    if (category) {
        result = result.filter((element) => element.category.toLowerCase() === category.toLowerCase());
    }

    // /api/products?sort=price & /api/products?sort=-price
    if(sort){
        sort[0] === "-" ? result.sort((a,b)=>b.price - a.price) : result.sort((a,b)=>a.price - b.price);
    }

    //  /api/products?page=2&limit=2
    if(page){
        if(limit * page > products.length){
            result = "Products has been finished!!"
        }else{
            result = result.slice(((page-1 )* limit),(page * limit));

            console.log(result);
        }   
    }
    const total = result.length;
    res.json({ data: result, total, page: +page, limit: +limit });
});

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})


