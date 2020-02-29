var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
})

//display the products currently in the database
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        takeOrder();
    });
};

//prompt user to enter id of product
function takeOrder() {
    inquirer.prompt(
        [

            {
                name: "itemID",
                type: "number",
                message: "Enter the item number of the product you would like to purchase."
            },
            {
                name: "itemQuantity",
                type: "number",
                message: "How many would you like?"
            }
        ]
    )
        .then(function (answer) {
            console.log("Okay, you would like to by " + answer.itemQuantity + " of item number: " + answer.itemID);
            var selectedItem = answer.itemID;
            var selectedQuantity = answer.itemQuantity;
            processOrder(selectedItem, selectedQuantity);
        })
};

function processOrder(id, quantity) {
    console.log("Processing Order...\n");
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        if (err) throw err;
        var currentQuantity = res[0].stock_quantity;
        if (quantity < currentQuantity) {
            var newQuantity = currentQuantity - quantity;
            updateStock(id, newQuantity);
            var totalPrice = res[0].price * quantity;
            console.log("Your total is: $" + totalPrice);
            connection.end();
        }
        else {
            console.log("Sorry, this item is out of stock!");
            connection.end();
        }
    });
};

function updateStock(id, newQuantity) {
connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: id}], function (err, res) {
    if (err) throw err;
    console.log(res.affectedRows + " products updated! \n");
            });  
            console.log("Products updated") 
}
