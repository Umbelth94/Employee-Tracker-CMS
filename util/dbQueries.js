import db from '../lib/dbConnection.js';

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