USE employees_db;

-- Seed departments
INSERT INTO departments (name) VALUES
('Engineering'), -- Department 1
('Marketing'), -- Department 2
('Sales'), -- Department 3 
('Human Resources'), -- Department 4
('Maintenance'); -- Department 5

-- Seed roles
INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 80000, 1), 
('Junior Software Engineer', 60000, 1),
('Product Manager', 100000, 1), 
('Marketing Specialist', 60000, 2), 
('Marketing Director', 120000, 2), 
('Sales Representative', 70000, 3), 
('HR Manager', 90000, 4), 
('HR Associate', 60000, 4), 
('Maintenance Director', 110000, 5), 
('Maintenance Technician', 50000, 5);

-- Seed employees
INSERT INTO employees (first_name, last_name, role_id) VALUES
('John', 'Doe', 1),
('Jane', 'Smith', 3), 
('Michael', 'Johnson', 3), 
('Patricia', 'Mitchell', 2), 
('William', 'Wilson', 1), 
('Emily', 'Williams', 4),
('James', 'Scott', 5),
('Richard', 'Anderson', 6),
('David', 'Brown', 7), 
('Sarah', 'Jones', 8), 
('Jessica', 'Garcia', 7), 
('Karen', 'Taylor', 9), 
('Alice', 'Davis', 1), 
('Robert', 'Martinez', 2), 
('Laura', 'Hernandez', 4),
('Daniel', 'Lopez', 6), 
('Mary', 'Young', 7), 
('Karen', 'Parker', 8),
('Matthew', 'Johnson', 9);

# Updating manager id's AFTER the employees table is populated with id's
UPDATE employees SET manager_id = 1 WHERE id = 13 OR id = 5;