DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(10) NOT NULL,
primary key(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebook", "office supplies", 5, 10), ("pens", "office supplies", 5, 20), ("pencils", "office supplies", 3, 15), ("cheetohs", "food", 1, 20), ("monster", "beverages", 2, 100), ("couch", "furniture", 150, 12), ("table", "furniture", 100, 10), ("ice cream squishy", "toys", 20, 20), ("leggos", "toys", 30, 20), ("cat sweater", "clothing", 12, 30);



