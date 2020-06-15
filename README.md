# Hospital-API
 An API for the doctors of a hospital which has been allocated by the govt for testing and quarantine of COVID-19 patients
 
 #### Installation Guide
 1. Clone the repository to the system
 2. `npm install` - To install all libraries
 3. `npm test` - To run test cases
 4. `npm start` - To start the server
 
 
 ##### Testing with postman
 1. `POST` - `/doctors/register` - Doctor Registration (name, email, password)
 2. `POST` -  `/doctors/login` - Doctor LogIn (email, password)
 3. `POST` - `/patients/registration` - Patient Registration (name, phone)  - Provide token in the header
 4. `POST` - `/patients/:id/create_report` -  Creating report for patient (status)  -  Provide token in the header
 5. `GET` - `/patients/:id/all_reports` - Getting all the reports of patient  -  Provide token in the header
 6. `GET` - `/reports` - Provide status in the params
 
 ###### Technologies used
 nodeJS, ExpressJS, MongoDB
