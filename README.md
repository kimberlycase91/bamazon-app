# bamazon-app
An amazon-like store front that uses mySQL and node.js to perform CRUD operations.


## What does it do?
Bamazon is able to display the current 'store inventory' from SQL, allows the 'customer' to select an item to purchase, and gives them their total, and updates the inventory. It also has the capability as a 'manager' to view products, filter products, add to inventory, and add new products. 

## How to use the app:
As a customer:
To launch the app type node bamazonCustomer.js
This will connect to the database, display the current products, and prompt the user to select the id of the product desired and the quantity, then will display the total and update the database.

As a manager:
to launch the app type node bamazonManager.js
This will connect to the database and prompt the user to select one of the following:
View products for sale (lists every available item)
View low inventory (list products that have less than 5 items in stock)
Add to inventory (displays a prompt that will let the manager "add more" of any item currently in the store)
Add new product (allows the manager to add a completely new product to the store using a series of prompts)

## How does it work?
Bamazon uses the mysql npm to access data in the database and display it in the console, and uses inquirer npm to prompt the user. 

Customer app:
Upon connecting to the database, the table from the SQL database is displayed in the console. When the user inputs the item number and quantity, the app first checks that there is enough of the item in stock. If there is, it subtracts the purchase, updates the current stock and displays the final price to the user.

Manager app: 
Upon connecting to the database, the app uses inquirer to display a list of choices. Each choice uses the sql npm to access and manipulate the database. 

[Customer Demo](https://github.com/kimberlycase91/bamazon-app/blob/master/bamazonCustomer%20Demo.mkv)
[Manager Demo](https://github.com/kimberlycase91/bamazon-app/blob/master/bamazonManager%20Demo.mkv)
