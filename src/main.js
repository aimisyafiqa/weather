// Import necessary modules from Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Function to create the main application window
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800, // Set the width of the window
        height: 600, // Set the height of the window
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration
            contextIsolation: false, // Disable context isolation for compatibility
        },
    });
    // Load the HTML file for the application
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

// Create the window when the app is ready
app.on('ready', createWindow);

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Re-create a window when the app is activated (e.g., clicked in the dock on macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});