-- FIRST ENTER YOUR MYSQL THEN WRITE THESE: 

CREATE DATABASE blog_api;
USE blog_api;
CREATE TABLE user (id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), password VARCHAR(30));
CREATE TABLE comment (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, body TEXT, created_date TIMESTAMP() DEFAULT NOW());
CREATE TABLE blog (id INT PRIMARY KEY AUTO_INCREMENT, image_id TEXT, title VARCHAR(255), body TEXT, comment_id text);

-- NOW ENJOY :)