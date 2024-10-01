// varsheni 
// const { defineConfig } = require('cypress');
// const XLSX = require('xlsx'); // Import the xlsx library
// const dotenv = require('dotenv');
// dotenv.config({path:'./.env'});

// module.exports = defineConfig({
//   env:{
//     username:process.env.USER_NAME,
//     password:process.env.PASSWORD
//   },
//   e2e: {
//     watchForFileChanges: false,

//     setupNodeEvents(on, config) {
//       on('task', {
//         readExcelFile({ filePath, sheetName }) {
//           // Read the Excel file
//           const workbook = XLSX.readFile(filePath);
          
//           // Get the sheet data
//           const sheet = workbook.Sheets[sheetName];
//           if (!sheet) {
//             throw new Error(`Sheet with name ${sheetName} not found`);
//           } 
//           // Convert sheet to JSON
//           const jsonData = XLSX.utils.sheet_to_json(sheet);
          
//           // Return the JSON data
//           return jsonData;
//         }
//       });
      
//       // implement node event listeners here
//     },
//   },
// });

// Rishi 
// const { defineConfig } = require('cypress');
// const XLSX = require('xlsx'); // Import the xlsx library
// const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config({path:'./.env'});
// module.exports = defineConfig({
//   env: {
//     username: process.env.USER_NAME,
//     password: process.env.PASSWORD,
//   },
//   e2e: {
//     watchForFileChanges: false,
//     setupNodeEvents(on, config) {
//       on('task', {
//         readExcel({ filePath, sheetName }) {
//           // Adjust the filePath for Windows
//           const normalizedPath = filePath.replace(/\\/g, '\\\\');
//           // Read the Excel file
//           const workbook = XLSX.readFile(normalizedPath);
//           // Get the sheet data
//           const sheet = workbook.Sheets[sheetName];
//           if (!sheet) {
//             throw new Error(`Sheet with name ${sheetName} not found`);
//           }
//           // Convert sheet to JSON
//           const jsonData = XLSX.utils.sheet_to_json(sheet);
//           // Return the JSON data
//           return jsonData;
//         }
//       });
//       // Implement other node event listeners here if needed
//     },
//   },
// });

// Combined Config File
// Importing required modules for Cypress configuration
const { defineConfig } = require('cypress');
const XLSX = require('xlsx'); // Import the xlsx library
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const path = require('path');
const fs = require('fs');
// Defining Cypress configuration using the `defineConfig` function
module.exports = defineConfig({
  env: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD
  },
  e2e: {
    watchForFileChanges: false,
    retries: {
      runMode: 0,  // Retries 2 times in CLI mode
      openMode: 0, // Retries 2 times in interactive mode
    },
    setupNodeEvents(on, config) {
      on('task', {
        readExcelFile({ filePath, sheetName }) {
          // Read the Excel file
          const workbook = XLSX.readFile(filePath);
          // Get the sheet data
          const sheet = workbook.Sheets[sheetName];
          if (!sheet) {
            throw new Error(`Sheet with name ${sheetName} not found`);
          }
          // Convert sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          // Return the JSON data
          return jsonData;
        },
        readExcelFile({ filePath }) {
          try {
            // Resolving the full path of the Excel file
            const fullPath = path.resolve(filePath);
            // Reading the file from the specified path as a binary buffer
            const file = fs.readFileSync(fullPath);
            // Reading the workbook from the file buffer using the `xlsx` library
            const workbook = XLSX.read(file, { type: 'buffer' });
            // Extracting the first sheet name from the workbook (assuming data is in the first sheet)
            const sheetName = workbook.SheetNames[0];
            // Accessing the first sheet's data using its sheet name
            const sheet = workbook.Sheets[sheetName];
            // Converting the sheet data to JSON format for easy use in Cypress tests
            const data = XLSX.utils.sheet_to_json(sheet);
            // Returning the extracted data to Cypress
            return data;
          } catch (err) {
            // Logging an error message if reading the file fails
            console.error(`Error reading file: ${err.message}`);
            return null;
          }
        }
      });
      // implement node event listeners here
    },
    // experimentalMemoryManagement: true, // Improves Cypress memory handling
    // numTestsKeptInMemory: 0, // Reduces memory usage by keeping fewer tests in memory
  },
});



