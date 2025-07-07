const express = require('express');
const app = express();
const port = 3000;

// Importing in-memory product data
let products = require('./data/products');

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Product API! Visit /products to get started.');
});



// ✅ GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// ✅ GET a product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// ✅ POST a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT (update) a product by ID
app.put('/products/:id', (req, res) => {
  const { name, price } = req.body;
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  products[index] = {
    id: products[index].id,
    name,
    price
  };

  res.json(products[index]);
});

// ✅ DELETE a product by ID
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
