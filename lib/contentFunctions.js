import dotenv from 'dotenv';
import mysql from 'mysql2';
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:`Iamlamp69`,
        database:'employees_db'
    },
    console.log(`Connected to the books_db database.`)
);


class contentFunctions {
    static async viewAllDepartments() {
        console.log('viewing departments');
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM departments ORDER BY id`, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    resolve(results);
                }
            });
        });
    }
    
    static viewAllRoles(){
        console.log('viewing all roles');
    }

    static viewAllEmployees(){
        console.log('viewing all employees');
    }

    static addDepartment(){
        console.log('adding a department');
        //Create a new inquirer prompt to get the information, then return it.
    }

    static addRole(){
        console.log('adding a new role');
        //Create a new inquirer prompt to get the information, then return it.
    }

    static addEmployee(){
        console.log('adding an employee');
        //Create a new inquirer prompt to get the information, then return it.
    }

    static updateEmployeeRole(){
        console.log('updating new employee role');
        //Create a new inquirer prompt to get the information, then return it.  
    }

}

//Closes the database connection so that the program can exit
process.on('exit', () => {
    console.log('Closing database connection...');
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        } else {
            console.log('Database connection closed.');
            console.log('Come back soon!');
        }
    })
})
export default contentFunctions;