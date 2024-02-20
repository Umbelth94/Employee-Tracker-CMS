# Employee-Tracker-CMS
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A Content Management System that runs in the terminal to handle various database queries for a fake company.  This app was built as an excercise to learn more about MySQL and get even more experience with Inquirer.  I also got to work with asynchronous functionality which, admittedly, was a lot to wrap my head around.  I was basically forced to do it though, as MySQL and Inquirer don't play nice together without it.  I was also mindful about utilizing modulization whenever certain files got a little too large. This is a practice that I am only just now starting to get used to so I'm sure that I could have done a better job, but I'm proud of how it turned out and everything seems to work just fine, so I'll call that a success.  I learned a lot about MySQL queries, learned about hiding certain variables in a .env file, and ended up with what I THINK is a solid base understanding of asynchronous programming.  


## Installation
When you download this repo, the first thing you will need to do is run `npm install` in the terminal to grab all the required packages. 

In order to actually have any data to play around with, you will also need to install the database files via MySQL.  Make sure you have MySQL Shell 8.3.0 installed.  
* From the root directory of this repo, open your terminal and start up mysql by typing `mysql -u root -p`
* Type in your mysql password 
* If you have successfuly started MySQL shell, you will see a mysql> prompt preceding your command line inputs.
* Install the database by typing `source db/schema.sql`
* Seed the database by typing `source db/seeds.sql`
* Exit the MySQL shell by typing `quit`

All you will need to do now is start the app by typing `Node index.js` from the root folder of the directory

## Usage

Use the arrow keys to navigate through the various menu options.  If any of the options require more inputs, you should be prompted to enter any remaining information.

## License
[MIT](https://opensource.org/licenses/MIT)

This project is licensed under the MIT license.

## Future Plans
Add features to: 
* Update employee managers
* View employees by manager
* View employees by department
* Delete departments, roles, and employees
* View the total utilized budget of a department - in other words, the combined salaries of all employees in that department

I am also planning to add some verification through Inquirer that will not allow users to input the wrong types of data.  

## Questions
Any questions, feel free to contact me at: 
- [Email](mailto:Umbelth94@gmail.com)
- [GitHub](https://github.com/Umbelth94)