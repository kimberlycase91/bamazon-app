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
    whatToDo();
});

function whatToDo() {
    inquirer.prompt([
        {
            name: "whatToDo",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
        .then(function (answer) {
            console.log(answer);
            var command = answer.whatToDo;


            switch (command) {
                case "View Products for Sale":
                    console.log("Okay, view products...\n");
                    viewProducts();
                    break;

                case "View Low Inventory":
                    console.log("Okay, view low inventory...\n");
                    viewLow();
                    break;

                case "Add to Inventory":
                    console.log("Okay, add to inventory...\n");
                    addToInventory();
                    break;

                case "Add New Product":
                    console.log("Okay, add new product...\n");
                    addNewProduct();
                    break;

            };
        })
};

function viewProducts() {
    console.log("Checking Inventory...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
};

function viewLow() {
    console.log("Low inventory: \n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

function addToInventory() {
    console.log("Add to inventory: \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                name: "itemToAdd",
                type: "number",
                message: "Which item would you like to update?"
            },
            {
                name: "howMuch",
                type: "number",
                message: "How many would you like to add?"
            }
        ])
            .then(function (answer) {
                var selectedItem = answer.itemToAdd;
                var selectedQuantity = answer.howMuch;
                selectProduct(selectedItem, selectedQuantity);
            });
    })};

    function selectProduct(id, amount) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
            if (err) throw err;
            var newQuantity = res[0].stock_quantity + amount;
            updateStock(id, newQuantity);
            console.log("Updating stock...\n");
            connection.end();
        })
    };

    function updateStock(id, amount) {
        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: amount }, { item_id: id }], function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated! \n");
            console.log("item number " + id + " has a new quantity of " + amount);
        })
    }

    function addNewProduct() {
        inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "New Product Name: "
        },
        {
            name: "department",
            type: "input",
            message: "New Product Department: "
        },
        {
            name: "price",
            type: "number",
            message: "New Product Price: "
        },
        {
            name: "quantity",
            type: "number",
            message: "New Product Quantity: "
        }
        ])
        .then(function(answer){
            var name = answer.name;
            var department = answer.department;
            var price = answer.price;
            var quantity = answer.quantity;
            pushNewProduct(name, department, price, quantity);
        })
    }
    
    function pushNewProduct (name, department, price, quantity) {
        console.log("Add new product");
        connection.query("INSERT INTO products SET ?", {
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: quantity
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        }
        )
        connection.end();
    };