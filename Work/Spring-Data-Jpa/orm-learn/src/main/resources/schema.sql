create table country( co_code varchar(2) primary key, co_name varchar(50));
 CREATE TABLE IF NOT EXISTS `ormlearn`.`stock` (
  `st_id` INT NOT NULL AUTO_INCREMENT,   `st_code` varchar(10),    `st_date` date,   `st_open` numeric(10,2),
  `st_close` numeric(10,2),    `st_volume` numeric,   PRIMARY KEY (`st_id`) );
CREATE TABLE department (
    dp_id INT AUTO_INCREMENT PRIMARY KEY,
    dp_name VARCHAR(45) NOT NULL
);

CREATE TABLE skill (
    sk_id INT AUTO_INCREMENT PRIMARY KEY,
    sk_name VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE employee (
    em_id INT AUTO_INCREMENT PRIMARY KEY,
    em_name VARCHAR(45) NOT NULL,
    em_salary DECIMAL(10,2),
    em_permanent TINYINT(1) NOT NULL,
    em_date_of_birth DATE,
    em_dp_id INT NOT NULL,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (em_dp_id)
        REFERENCES department(dp_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE employee_skill (
    es_em_id INT NOT NULL,
    es_sk_id INT NOT NULL,

    PRIMARY KEY (es_em_id, es_sk_id),

    CONSTRAINT fk_employee_skill_employee
        FOREIGN KEY (es_em_id)
        REFERENCES employee(em_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_employee_skill_skill
        FOREIGN KEY (es_sk_id)
        REFERENCES skill(sk_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
