import inquirer from 'inquirer';
import 'dotenv/config'
// import contentFunctions from './lib/contentFunctions.js';
import { fetchDepartments, fetchRoles, fetchEmployees } from './lib/readQueries.js';
import { addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeesRoleQuery  } from './lib/createQueries.js';
import { printTable, Table } from 'console-table-printer'

async function displayMainMenu() {
    //console.clear();
    
    try { 
        const data = await inquirer.prompt(
            [{
                type: 'list',
                name: 'choice',
                message: 'What do you want to do?',
                prefix:'',
                loop:false,
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee Role',
                    'Exit'
                ]
            }])

            await processChoice(data.choice);

            displayMainMenu();
        } catch (error) {
            console.error('Error occured:', error);
        }

    // Perform actions based on the selected choice
    async function processChoice(choice){
        switch (choice) {
            case 'View All Departments':
                const depts = await fetchDepartments();
                // For future table aesthetics
                // const p = new Table({
                //     columns: [
                //         {name: `id`, color:'yellow'},
                //         {name: 'name', color:'green'},
                //     ]
                // });
                // for (let i = 0; i < depts.length; i++){
                //     //Add a modulo function to alternate colors
                //     p.addRow({id: `${depts[i].id}`, name: `${depts[i].name}`})
                // }
                // p.printTable();
                printTable(depts);
                break;
            case 'View All Roles':
                const roles = await fetchRoles();
                printTable(roles);
                // Call function to view all roles
                break;
            case 'View All Employees':
                const emps = await fetchEmployees();
                printTable(emps);
                // Call function to view all employees
                break;
            case 'Add A Department':
                await addDepartmentQuery();
                // Call function to add a department
                break;
            case 'Add A Role':
                await addRoleQuery();
                // Call function to add a role
                break;
            case 'Add An Employee':
                await addEmployeeQuery();
                // Call function to add an employee
                break;
            case 'Update An Employee Role':
               await updateEmployeesRoleQuery();
                // Call function to update an employee role
                break;
            case 'Exit':
                console.log('Exiting...');
                process.exit(); //Close database connection and exit the program
                break; // Exit the program
        }
    }
};

// Start the program by displaying the main menu
displayMainMenu();