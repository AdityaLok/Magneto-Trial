-- Create Databases
CREATE DATABASE IF NOT EXISTS admin_db;
CREATE DATABASE IF NOT EXISTS customer_db;
CREATE DATABASE IF NOT EXISTS employee_db;

-- Helper: Create Tables in Given Database
-- ----------------------------------------

-- === ADMIN DB ===
USE admin_db;

CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    CONSTRAINT chk_admin_phone CHECK (phoneNumber REGEXP '^[0-9]{10,15}$')
);

CREATE TABLE IF NOT EXISTS user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    address TEXT,
    pinCode VARCHAR(10),
    phoneNumber VARCHAR(15) UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    productId VARCHAR(100),
    orderDateTime DATETIME
);

-- === CUSTOMER DB ===
USE customer_db;

CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    CONSTRAINT chk_customer_phone CHECK (phoneNumber REGEXP '^[0-9]{10,15}$')
);

CREATE TABLE IF NOT EXISTS user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    address TEXT,
    pinCode VARCHAR(10),
    phoneNumber VARCHAR(15) UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    productId VARCHAR(100),
    orderDateTime DATETIME
);

-- === EMPLOYEE DB ===
USE employee_db;

CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    CONSTRAINT chk_employee_phone CHECK (phoneNumber REGEXP '^[0-9]{10,15}$')
);

CREATE TABLE IF NOT EXISTS user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    address TEXT,
    pinCode VARCHAR(10),
    phoneNumber VARCHAR(15) UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    productId VARCHAR(100),
    orderDateTime DATETIME
); 


USE customer_db;

DROP TABLE orders;
select * from customer_db;

USE employee_db;
ALTER TABLE employee_db.credentials 
ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE, 
ADD CONSTRAINT chk_employeer_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

USE customer_db;

ALTER TABLE customer_db.user_details
ADD COLUMN city VARCHAR(255) NOT NULL AFTER address;

ALTER TABLE customer_db.credentials
DROP COLUMN phoneNumber;


CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(100),  -- references user_details.email
    productId VARCHAR(100),
    orderDateTime DATETIME,
    shippingAddress VARCHAR(255),
    shippingPin VARCHAR(10),
    shippingPhone VARCHAR(15),
    FOREIGN KEY (user_email) REFERENCES user_details(email) ON DELETE CASCADE
);

ALTER TABLE orders
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST BEFORE orderId,
ADD COLUMN user_email VARCHAR(100),
ADD COLUMN shippingAddress VARCHAR(255),
ADD COLUMN shippingPin VARCHAR(10),
ADD COLUMN shippingPhone VARCHAR(15);
SELECT * from orders;

TRUNCATE TABLE user_details;

ALTER TABLE user_details
ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;

ALTER TABLE user_details
ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE AFTER lastName;

ALTER TABLE credentials
ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;
TRUNCATE TABLE orders;

ALTER TABLE credentials DROP COLUMN email;
ALTER TABLE credentials
ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE AFTER lastName;