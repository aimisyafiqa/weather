const fs = require('fs'); // Import the file system module for file operations
const path = require('path'); // Import the path module for handling file paths

document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements
    const btnCreate = document.getElementById('btnCreate'); // Button to create a file
    const btnRead = document.getElementById('btnRead'); // Button to read a file
    const btnDelete = document.getElementById('btnDelete'); // Button to delete a file
    const btnUpdate = document.getElementById('btnUpdate'); // Button to update a file
    const fileName = document.getElementById('fileName'); // Input for the file name
    const fileContents = document.getElementById('fileContents'); // Textarea for file contents
    const filesDir = path.join(__dirname, 'files'); // Directory where files will be stored

    // Create File
    btnCreate.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`); // Construct file path
        fs.writeFile(filePath, fileContents.value, (err) => { // Write to the file
            if (err) return alert('Error creating file'); // Handle error if file creation fails
            alert(`${fileName.value}.txt created!`); // Success message
        });
    });

    // Read File
    btnRead.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`); // Construct file path
        fs.readFile(filePath, 'utf8', (err, data) => { // Read the file
            if (err) return alert('File not found'); // Handle error if file is not found
            fileContents.value = data; // Display file contents in textarea
        });
    });

    // Update File
    btnUpdate.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`); // Construct file path
        fs.access(filePath, fs.constants.F_OK, (err) => { // Check if the file exists
            if (err) return alert("File does not exist. Please create it first."); // Handle error if file does not exist
            fs.writeFile(filePath, fileContents.value, (err) => { // Update the file
                if (err) return alert('Error updating file'); // Handle error if update fails
                alert(`${fileName.value}.txt updated!`); // Success message
            });
        });
    });

    // Delete File
    btnDelete.addEventListener('click', () => {
        const filePath = path.join(filesDir, `${fileName.value}.txt`); // Construct file path
        fs.unlink(filePath, (err) => { // Delete the file
            if (err) return alert('File not found'); // Handle error if file is not found
            alert(`${fileName.value}.txt deleted`); // Success message
            fileContents.value = ''; // Clear file contents from textarea
            fileName.value = ''; // Clear file name input
        });
    });
});
