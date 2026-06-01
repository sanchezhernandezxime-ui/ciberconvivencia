CREATE DATABASE ciberconvivencia;
USE ciberconvivencia;
CREATE TABLE testimonios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  testimonio TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
