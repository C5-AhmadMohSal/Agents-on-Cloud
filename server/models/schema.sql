-- DROP DATABASE E_Store ; 

CREATE DATABASE E1_Store ; 

USE E1_Store;


CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    firstName VARCHAR(255) NOT NULL , 
    lastName VARCHAR(255) NOT NULL , 
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    productImage VARCHAR(255),
    price VARCHAR(255),
    user_id INT , 
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE cart(
    id INT AUTO_INCREMENT NOT NULL , 
    user_id INT , 
    product_id INT , 
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    FOREIGN KEY (product_id) REFERENCES products(id) ,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);



CREATE TABLE favorites (
    id INT AUTO_INCREMENT NOT NULL, 
    user_id INT, 
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0 
);