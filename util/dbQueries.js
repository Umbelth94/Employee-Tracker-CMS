import db from '../lib/dbConnection.js';
import { addRolePrompt, addDepartmentPrompt, addEmployeePrompt } from './inquirerCRUDQuestions.js'

//Add role to the database
export async function addRoleQuery() { 
    try {
        // Prompt user for role title
        const answers = await addRolePrompt();
        //Send db query to add answers to the database
        const results = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department_id}')`, function (err, results) {
                if (err) {
                    console.error('Error adding role:', err);
                    reject(err);
                } else {
                    console.log(`${answers.title} Role added!`);
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};

//Add department to the database
export async function addDepartmentQuery() {
    try {
        // Prompt user for department name
        const answers = await addDepartmentPrompt();
        //Send db query to add answers to the database
        const results = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO departments (name) VALUES ('${answers.department}')`, function (err, results) {
                if (err) {
                    console.error('Error adding department:', err);
                    reject(err);
                } else {
                    console.log(`${answers.department} Department added!`);
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
}

//Fetch existing departments from the database
export async function fetchDepartments() {
    try {
        const departments = await new Promise((resolve, reject) => {
            db.query('SELECT id, name FROM departments', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

//Update departments and return an array of the departments
//(Specifically for use with inquirer when displaying list of updated departments)
export async function updateDepartmentsList() {
    try {
        const fetchedDepartments = await fetchDepartments();
        return fetchedDepartments.map(department => ({
            name: department.name,
            value: department.id
        }));
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

//Fetch roles from database
async function fetchRoles() {
    try {
        const departments = await new Promise((resolve, reject) => {
            db.query('SELECT id, title, salary FROM roles', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

export async function updateRolesList() {
    try {
        const fetchedRoles = await fetchRoles();
        return fetchedRoles.map(role => ({
            name: `${role.title} - $${role.salary}`,
            value: role.id
        }));
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }};

// Fetch employees who can act as managers
async function fetchManagers() {
     try {
        const managers = await new Promise((resolve, reject) => {
        db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
    return managers;
}
    catch (error) {
        console.error('Error fetching managers:', error);
        throw error;
    };
}

export async function updateManagersList() {
    try {
        const managerChoices = await fetchManagers();
        return managerChoices.map(manager => ({
            name: manager.name,
            value: manager.id
        }))}
        catch (error) {
            console.error('Error fetching managers:', error);
            throw error;
        }};

export async function addEmployeeQuery() {
    try {
        const answers = await addEmployeePrompt();
        const results = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`, function (err, results) {
                if (err) {
                    console.error('Error adding employee:', err);
                    reject(err);
                } else {
                    console.log(`${answers.first_name} ${answers.last_name} added!`);
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
}