import db from '../lib/dbConnection.js';
import { fetchDepartments, fetchRoles } from '../lib/readQueries.js';

//Thees queries are all intermediate functions that manipulate queries before sending them elsewhere, which is why they are tucked away in this util folder.  


//Update roles and return an array of the departments to display them in the inquirer prompt
export async function updateDepartmentsList() {
    try {
        const fetchedDepartments = await fetchDepartments();
        //Map the roles into a new array for inquirer prompt
        return fetchedDepartments.map(department => ({
            name: department.name,
            value: department.id
        }));
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

//Update roles and return an array of the roles to display them in the inquirer prompt
export async function updateRolesList() {
    try {
        const fetchedRoles = await fetchRoles();
        //Map the roles into a new array for inquirer prompt
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
        //Map the roles into a new array for inquirer prompt
        return managerChoices.map(manager => ({
            name: manager.name,
            value: manager.id
        }))}
        catch (error) {
            console.error('Error fetching managers:', error);
            throw error;
        }};

// Fetch employees to use in the updateEmployeesList function
async function fetchEmployeesForList(){
    try {
        const employees = await new Promise((resolve, reject) => {
            db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

//Update the employees for use in an inquirer prompt
export async function updateEmployeesList() {
    try {
        const fetchedEmployees = await fetchEmployeesForList();
        return fetchedEmployees.map(employee => ({
            name: employee.name,
            value: employee.id
        }));
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

