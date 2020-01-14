CREATE DATABASE database_links;
USE database_links;


-----TABLA USERS

CREATE TABLE users (

    id int(11) NOT NULL,
    username VARCHAR (16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR (100) NOT NULL

);


ALTER TABLE USERS ADD PRIMARY KEY (id);

--ALTER TABLE users 
  --          MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

--describe USERS;


----- TABLA LINKS

CREATE TABLE links (

    id INT(11) NOT NULL,
    title VARCHAR (150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id int(11),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

alter table links add primary key (id);

--ALTER TABLE links 
   -- MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

