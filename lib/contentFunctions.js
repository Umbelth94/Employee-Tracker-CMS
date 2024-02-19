import 'dotenv/config'
import mysql from 'mysql2';
import inquirer from 'inquirer';
import db from './dbConnection.js';
import { addDepartmentPrompt, addRolePrompt }  from '../util/inquirerCRUDQuestions.js';

class contentFunctions {
    static async viewAllDepartments() {
        console.log('viewing departments');
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM departments ORDER BY id`, function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
            console.table(results);
            return results; // Return the data if needed
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
    
    static async viewAllRoles() {
        console.log('viewing all roles');
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
            console.table(results);
            return results; // Return the data if needed
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
        
    
    static async viewAllEmployees() {
        console.log('viewing all employees');
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
            console.table(results);
        } catch (error) {
            console.error('Error occured:', error);
            throw error;
        }
    }

    static async addDepartment(){
        console.log('adding a department');
        try {
            // Ask for the name of the department
            const answers = await addDepartmentPrompt();
            // Run a query to insert the name of the department into the database
            await new Promise((resolve, reject) => {
                db.query(`INSERT INTO departments (name) VALUES ('${answers.department}')`, function (err, results) {
                    if (err) {
                        console.error('Error adding department:', err);
                        reject(err);
                    } else {
                        console.log(`${answers.department} Department added!`);
                        resolve(results);
                    }
                });
            })
        } catch (error) {
            console.error('Error adding department:', error);
        }}
        //Create a new inquirer prompt to get the information, then return it.
    

    static async addRole(){
        console.log('adding a new role');
        try {
            // Ask the user to add new role, salary, and select a department
            const answers = await addRolePrompt();
            // Run a query to insert the values from answers into the database
            await new Promise(function(resolve, reject) {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department_id}')`, function (err, results) {
                    if (err) {
                        console.error('Error adding role:', err);
                        reject(err);
                    } else {
                        console.log(`${answers.title} Role added!`);
                        resolve(results);
                    }
                });
            })
        } catch(error){
            console.error('Error adding role:', error);
        }
    }

    static async addEmployee(){
        try{
            // Fetch roles from the database
            const roles = await new Promise((resolve, reject) => {
                db.query('SELECT id, title, salary FROM roles', (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
    
            // Prepare role choices for the prompt
            const rolesChoices = roles.map(role => ({
                name: `${role.title} - $${role.salary}`,
                value: role.id
            }));
    
            // Fetch employees who can act as managers
            const managers = await new Promise((resolve, reject) => {
                db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
    
            // Prepare manager choices for the prompt
            const managerChoices = managers.map(manager => ({
                name: manager.name,
                value: manager.id
            }));
    
            // Add an option for no manager
            managerChoices.unshift({ name: 'None', value: null });
    
            // Prompt the user for employee details
            const answers = await inquirer.prompt([
                {
                    type:'input',
                    name:'first_name',
                    message:'What is the first name of the new employee?',
                },
                {
                    type:'input',
                    name:'last_name',
                    message:'What is the last name of the new employee?',
                },
                {
                    type:'list',
                    name:'role_id',
                    message:'Select the role for the new employee:',
                    choices: rolesChoices
                },
                {
                    type:'list',
                    name:'manager_id',
                    message:'Select the manager for the new employee:',
                    choices: managerChoices
                }
            ]);

              // Insert the new employee into the database
              await new Promise(function(resolve, reject) {
                db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`, function (err, results) {
                    if (err) {
                        console.error('Error adding employee:', err);
                        reject(err);
                    } else {
                        console.log(`${answers.first_name} ${answers.last_name} added!`);
                        resolve(results);
                    }
                });
            })
    }
    catch(error){
        console.error('Error adding employee:', error);
    }
}

    static async updateEmployeeRole(){
        console.log('updating new employee role');
        try {
            // Fetch existing employees from the database
            const employees = await new Promise((resolve, reject) => {
                db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });

            // Prepare employee choices for the prompt
            const employeeList = employees.map(employee => ({
                name:employee.name,
                value: employee.id
            }))

            // Fetch roles from the database
            const roles = await new Promise((resolve, reject) => {
                db.query('SELECT id, title, salary FROM roles', (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
    
            // Prepare role choices for the prompt
            const rolesChoices = roles.map(role => ({
                name: `${role.title} - $${role.salary}`,
                value: role.id
            }));

            // Prompt the user for employee details
            const answers = await inquirer.prompt([{
                type: 'list',
                name: 'employee',
                message: 'Select an employee to update:',
                choices: employeeList
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role for the employee:',
                choices: rolesChoices
            }])

            // Update the employee's role in the database
            await new Promise(function(resolve,reject){
                db.query('UPDATE employees SET role_id = ? WHERE id = ?',[answers.role_id, answers.employee], function (err, results) {
                    if (err) {
                        console.error('Error updating employee role:', err);
                        reject(err);
                    } else {
                        console.log(`${answers.employee} role updated!`);
                        resolve(results);
                    }
                });
            })
    }
    catch(error){
        console.error('Error updating employee role:', error);
    }
}}


export default contentFunctions;