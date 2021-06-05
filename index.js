var  express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var productsRouter = require('./routes/product.route');
var categoriesRouter = require('./routes/category.route');

app.use('/api', productsRouter);
app.use('/api', categoriesRouter);

app.use(function(req, res, next) {
    res.status(err.status || 404).json({
      message: "No such route exists"
    })
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: "Error"
    })
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
