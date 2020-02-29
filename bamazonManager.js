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

inquirer.prompt([
    {
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
])
.then(function (answer) {
switch (answer) { 
case "View Products for Sale":
viewProducts();
break;

case "View Low Inventory":
viewLow();
break;

case "Add to Inventory":
addToInventory();
break;

case "Add New Product":
addNewProduct();
break;
}
});
});

function viewProducts() {
    console.log("Checking Inventory...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}