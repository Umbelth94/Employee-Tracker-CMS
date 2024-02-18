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
('Michael', 'Johnson', 5), 
('Patricia', 'Mitchell', 4), 
('William', 'Wilson', 4), 
('Emily', 'Williams', 4),
('James', 'Scott', 2),
('Richard', 'Anderson', 6),
('David', 'Brown', 7), 
('Sarah', 'Jones', 8),
('Jessica', 'Garcia', 6), 
('Karen', 'Taylor', 9),
('Alice', 'Davis', 1), 
('Robert', 'Martinez', 2), 
('Laura', 'Hernandez', 4),
('Daniel', 'Lopez', 6), 
('Mary', 'Young', 6), 
('Karen', 'Parker', 8),
('Matthew', 'Johnson', 10);

# Updating manager id's AFTER the employees table is populated with id's
#Product Manager > Developers, Junior Developers
UPDATE employees SET manager_id = 2 WHERE id = 1 OR id = 13 OR id = 14 OR id = 7;
# Marketing Director > Marketing Specialists
UPDATE employees SET manager_id = 3 WHERE id = 4 OR id = 5 OR id = 6 OR id = 15 OR id = 8 OR id = 11 OR id = 16 OR id = 17;
#HR Manager > HR Associates
UPDATE employees SET manager_id = 9 where id = 10 OR id = 18;
#Maintenance Director > Maintenance Technician
UPDATE employees SET manager_id = 12 where id = 19;