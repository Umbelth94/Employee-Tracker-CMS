import inquirer from 'inquirer';
import contentFunctions from './contentFunctions.js';


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
                await contentFunctions.viewAllDepartments();
                break;
            case 'View All Roles':
                await contentFunctions.viewAllRoles();
                // Call function to view all roles
                break;
            case 'View All Employees':
                contentFunctions.viewAllEmployees();
                // Call function to view all employees
                break;
            case 'Add A Department':
                contentFunctions.addDepartment();
                // Call function to add a department
                break;
            case 'Add A Role':
                contentFunctions.addRole();
                // Call function to add a role
                break;
            case 'Add An Employee':
                contentFunctions.addEmployee();
                // Call function to add an employee
                break;
            case 'Update An Employee Role':
                contentFunctions.updateEmployeeRole();
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