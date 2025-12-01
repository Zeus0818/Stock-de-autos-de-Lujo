-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS admin_products_db;
USE admin_products_db;

-- Crear la tabla Products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

-- Ver registros
SELECT * FROM Products;
