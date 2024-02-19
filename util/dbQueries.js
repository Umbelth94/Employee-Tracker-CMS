import db from '../lib/dbConnection.js';
import { addRolePrompt, addDepartmentPrompt } from './inquirerCRUDQuestions.js'

//Add department to the database
export async function addDepartmentQuery() {
    try {
        const answers = await addDepartmentPrompt();
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