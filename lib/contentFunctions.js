// This is the 'routing' that is 

import 'dotenv/config'
import {  updateEmployeesRoleQuery } from '../util/dbQueries.js';
import { addRoleQuery, addDepartmentQuery, addEmployeeQuery } from './createQueries.js';
import { fetchDepartments, fetchRoles, fetchEmployees } from './readQueries.js';

class contentFunctions {
    static async viewAllDepartments() {
        console.log('viewing departments');
        try {
            const results = await fetchDepartments();
            console.table(results);
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
    
    static async viewAllRoles() {
        console.log('viewing all roles');
        try {
            const results = await fetchRoles();
            console.table(results);
            return results; // Return the data if needed
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
        
    
    static async viewAllEmployees() {
        console.log('viewing all employees');
        try {
            const results = await fetchEmployees();
            console.table(results);
        } catch (error) {
            console.error('Error occured:', error);
            throw error;
        }
    }

    static async addDepartment(){
        console.log('adding a department');
        try {
            const departmentTable = await addDepartmentQuery();
        } catch (error) {
            console.error('Error adding department:', error);
        }}
        //Create a new inquirer prompt to get the information, then return it.
    

    static async addRole(){
        console.log('adding a new role');
        try {
            const roleTable = await addRoleQuery();
  
        } catch(error){
            console.error('Error adding role:', error);
        }
    }

    static async addEmployee(){
        console.log('adding a new employee');
        try{
            const employeeTable = await addEmployeeQuery();
        }
        catch(error){
        console.error('Error adding employee:', error);
        }
    }

    static async updateEmployeeRole(){
        console.log('updating new employee role');
        try {
            const employeeUpdate = await updateEmployeesRoleQuery();
        }
catch(error){
    console.error('Error updating employee role:', error);
}};
};

export default contentFunctions;