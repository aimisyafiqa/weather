const fs = require('fs');
const path = require('path');

document.addEventListener("DOMContentLoaded", () => {
    const btnCreate = document.getElementById('btnCreate');
    const btnRead = document.getElementById('btnRead');
    const btnDelete = document.getElementById('btnDelete');
    const btnUpdate = document.getElementById('btnUpdate'); // New Update button
    const fileName = document.getElementById('fileName');
    const fileContents = document.getElementById('fileContents');
    const filesDir = path.join(__dirname, 'files');

    // Create File
    btnCreate.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`);
        fs.writeFile(filePath, fileContents.value, (err) => {
            if (err) return alert('Error creating file');
            alert(`${fileName.value}.txt created!`);
        });
    });

    // Read File
    btnRead.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return alert('File not found');
            fileContents.value = data;
        });
    });

    // Update File
    btnUpdate.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) return alert("File does not exist. Please create it first.");
            fs.writeFile(filePath, fileContents.value, (err) => {
                if (err) return alert('Error updating file');
                alert(`${fileName.value}.txt updated!`);
            });
        });
    });

    // Delete File
    btnDelete.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`);
        fs.unlink(filePath, (err) => {
            if (err) return alert('File not found');
            alert(`${fileName.value}.txt deleted`);
            fileContents.value = '';
            fileName.value = '';
        });
    });
});
