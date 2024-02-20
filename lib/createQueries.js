// All of these query functions update or add to the database.

import db from './dbConnection.js';

import { addRolePrompt, addDepartmentPrompt, addEmployeePrompt, updateEmployeeRolePrompt } from '../util/inquirerCRUDQuestions.js'


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

//Add employee to the database
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

//Doesn't technically ADD anything but it changes content, and is the only one function that updates so I didn't think it deserved it's own file.
export async function updateEmployeesRoleQuery() {
    try {
        const updatedEmployees = await updateEmployeeRolePrompt();
        const { role_id, employee_id } = updatedEmployees; // Destructure role_id and employee_id from updatedEmployees
        const results = await new Promise((resolve, reject) => {
            db.query(`UPDATE employees SET role_id = '${role_id}' WHERE id = '${employee_id}'`, function (err, results) {
                if (err) {
                    console.error('Error updating employee role:', err);
                    reject(err);
                } else {
                    console.log(`Employee role updated!`);
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.error('Error updating employee role:', error);
        throw error;
    }
};