// This file just handles initializing and closing the database connection
//Be sure to change the password in the createConnection function to whatever password you use for your mysql connections.  
import mysql from 'mysql2';

//Create a database connection 
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        /////////////////////////// CHANGE PASSWORD TO YOUR SPECIFIC MYSQL PASSWORD ///////////
        password:process.env.SQL_PASS,
        database:'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);


// Log a message when connected to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database.');
});


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

// Export the database connection 
export default db;