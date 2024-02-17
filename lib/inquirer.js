import inquirer from 'inquirer';
import select from '@inquirer/select';


function displayMainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What do you want to do?',
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
            }
        ])
        .then((data) => {
            // Get the selected choice
            const choice = data.choice;

            // Perform actions based on the selected choice
            switch (choice) {
                case 'View All Departments':
                    console.log('Viewing all departments...');
                    // Call function to view all departments
                    break;
                case 'View All Roles':
                    console.log('Viewing all roles...');
                    // Call function to view all roles
                    break;
                case 'View All Employees':
                    console.log('Viewing all employees...');
                    // Call function to view all employees
                    break;
                case 'Add A Department':
                    console.log('Adding a department...');
                    // Call function to add a department
                    break;
                case 'Add A Role':
                    console.log('Adding a role...');
                    // Call function to add a role
                    break;
                case 'Add An Employee':
                    console.log('Adding an employee...');
                    // Call function to add an employee
                    break;
                case 'Update An Employee Role':
                    console.log('Updating an employee role...');
                    // Call function to update an employee role
                    break;
                case 'Exit':
                    console.log('Exiting...');
                    return; // Exit the program
            }

            // After completing the action, display the main menu again
            displayMainMenu();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
}

// Start the program by displaying the main menu
displayMainMenu();