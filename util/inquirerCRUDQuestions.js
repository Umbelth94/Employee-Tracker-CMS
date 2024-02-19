import inquirer from 'inquirer';
import db from '../lib/dbConnection.js';
import { fetchDepartments, updateDepartmentsList, } from './dbQueries.js';
export async function addDepartmentPrompt(){
    try { 
        const answers = await inquirer.prompt({
            type:'input',
            name:'department',
            message:'What is the name of the new department?',
        })

        return answers;
    } catch(error) {
        console.error('Error adding department', error);
    }
}

export async function addRolePrompt() {
    try {
        // Fetch departments from the database
        const departmentsList = await updateDepartmentsList();

        // Prompt the user to add a new role
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the new role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role?',
            },
            {
                type: 'list', // Use list type for department selection
                name: 'department_id',
                message: 'Select the department for the new role:',
                choices: departmentsList
            }
        ]);

        return answers;
    } catch (error) {
        console.error('Error in addRolePrompt:', error);
        throw error;
    }
}