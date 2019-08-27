drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
    item_id int not null,
    product_name varchar (25) not null,
    department_name varchar (25) not null,
    price decimal (10,4) not null,
    stock_quantity int default 10,
    primary key (item_id)
);

insert into products (item_id,product_name,department_name,price);
values ('Khaleesi Wig','Beauty',40.99),('Blanket','Home and Kitchen', 20.99),('82 in Smart TV', 'Electronics',200.05),('Rick and Morty Sweater','Clothing', 20.99),('Game of Thrones','Books',10.99),('Holes','Books',10.99),('Nike Running Shoes', 'Clothing', 40.99),('Portable Charger', 'Electronics', 10.99),('Air Fryer', 'Home and Kitchen', 60.99),('Kylie Cosmetics','Beauty',10.99);