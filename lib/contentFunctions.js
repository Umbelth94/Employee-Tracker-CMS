import 'dotenv/config'
import mysql from 'mysql2';
import inquirer from 'inquirer';
import db from './dbConnection.js';
import { addDepartmentPrompt, addRolePrompt,}  from '../util/inquirerCRUDQuestions.js';
import { addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeesRoleQuery } from '../util/dbQueries.js';

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
            const departmentTable = await addDepartmentQuery();
        } catch (error) {
            console.error('Error adding department:', error);
        }}
        //Create a new inquirer prompt to get the information, then return it.
    

    static async addRole(){
        console.log('adding a new role');
        try {
            const roleTable = await addRoleQuery();
  
        } catch(error){
            console.error('Error adding role:', error);
        }
    }

    static async addEmployee(){
        console.log('adding a new employee');
        try{
            const employeeTable = await addEmployeeQuery();
        }
        catch(error){
        console.error('Error adding employee:', error);
        }
    }

    static async updateEmployeeRole(){
        console.log('updating new employee role');
        try {
            const employeeUpdate = await updateEmployeesRoleQuery();
        }
catch(error){
    console.error('Error updating employee role:', error);
}};
};

export default contentFunctions;