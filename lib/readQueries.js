// All of these query functions are used to create the tables in the console

import db from './dbConnection.js';

//Fetch existing departments from the database
export async function fetchDepartments() {
    try {
        const departments = await new Promise((resolve, reject) => {
            db.query('SELECT id, name FROM departments ORDER BY id', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.table(departments);
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

//Fetch roles from database
export async function fetchRoles() {
    try {
        const results = await new Promise((resolve, reject) => {
            //Returns a table but replaces the department_id with the corresponding department_name
            db.query(
            `SELECT roles.id, roles.title, roles.salary, departments.name AS department_name 
            FROM roles 
            JOIN departments ON roles.department_id = departments.id`, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return results; 
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function fetchEmployees() {
    try {
        const results = await new Promise((resolve, reject) => {
            //Returns a table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
            db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department_name, roles.salary, CONCAT(managers.first_name,' ', managers.last_name) AS manager 
            FROM employees 
            JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON roles.department_id = departments.id 
            LEFT JOIN employees managers ON employees.manager_id = managers.id`, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.error('Error occured:', error);
        throw error;
    }
}

