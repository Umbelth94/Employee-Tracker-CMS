import inquirer from 'inquirer';
import db from '../lib/dbConnection.js';
import { updateDepartmentsList, updateRolesList, updateManagersList, updateEmployeesList } from './dbQueries.js';
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

export async function addEmployeePrompt() {
    try { 
        //Prepare updated lists of roles and managers
        const rolesList = await updateRolesList();
        const managersList = await updateManagersList();

        //Add an option for no manager
        managersList.unshift({name: 'None', value: null}); 

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
                choices: rolesList,
            },
            {
                type:'list',
                name:'manager_id',
                message:'Select the manager for the new employee:',
                choices: managersList
            }
        ]);
        return answers;
    } catch (error) {
        console.error('Error in addEmployeePrompt:', error);
        throw error;
    }
};

export async function updateEmployeeRolePrompt() {
    try {
        // Fetch updated lists of employees and roles
        const employeesList = await updateEmployeesList();
        const rolesList = await updateRolesList();

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select the employee to update:',
                choices: employeesList
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role for the employee:',
                choices: rolesList
            }
        ]);
        return answers;
    } catch (error) {
        console.error('Error while updating employee:', error);
        throw error;
    }
};