# bamazon-app
An amazon-like store front that uses mySQL and node.js to perform CRUD operations.


## What does it do?
Bamazon is able to display the current 'store inventory' from SQL, allows the customer to select an item to purchase, and gives them their total, and updates the inventory.

## How to use the app:
As a customer:
To launch the app type node bamazonCustomer.js
This will connect to the database, display the current products, and prompt the user to select the id of the product desired, then the quantity. 

## How does it work?
Bamazon uses the mysql npm to access data in the database and display it in the console, and uses inquirer npm to prompt the user. 

Upon connecting, the table from the SQL database is displayed in the console. When the user inputs the item number and quantity, the app first checks that there is enough of the item in stock. If there is, it subtracts the purchase, updates the current stock and displays the final price to the user.