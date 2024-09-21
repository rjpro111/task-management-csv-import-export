const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const Task = require('../models/Task');

const exportTasksToCSV = async (tasks, filePath) => {
    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
            { id: 'title', title: 'Title' },
            { id: 'description', title: 'Description' },
            { id: 'dueDate', title: 'Due Date' },
            { id: 'priority', title: 'Priority' },
            { id: 'status', title: 'Status' },
            { id: 'assignedUsers', title: 'Assigned Users' }
        ]
    });

    const records = tasks.map(task => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString(),
        priority: task.priority,
        status: task.status,
        assignedUsers: task.assignedUsers.join(';') // Assuming multiple users separated by semicolon
    }));

    await csvWriter.writeRecords(records);
};

const importTasksFromCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const tasks = [];
        const errors = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                tasks.push(row);
            })
            .on('end', () => {
                resolve(tasks);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = {
    exportTasksToCSV,
    importTasksFromCSV
};
