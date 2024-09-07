-- create database

CREATE DATABASE task_management;

-- create table

CREATE TABLE tbl_task (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_title VARCHAR(255),
    task_description TEXT,
    used_technology JSON,
    task_status VARCHAR(100),
    task_priority VARCHAR(100),
    task_start_date DATE,
    task_end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);