# Personal Budget API

## Project Description
This project focuses on building an API that enables users to manage a personal budget based on the principles of Envelope Budgeting. The API allows clients to create, read, update, and delete budget envelopes, and track the balance of each envelope. It adheres to best practices for REST endpoint naming conventions, utilizes proper response codes, and includes data validation mechanisms to prevent users from overspending their budget.

## Project Objectives
- Develop an API using Node.js and Express
- Implement CRUD operations for budget envelopes
- Create endpoints to update envelope balances
- Utilize Git version control for tracking project progress
- Master command line navigation and file manipulation
- Utilize Postman for testing API endpoints

## Prerequisites
Before starting this project, ensure you have knowledge and experience with the following:
- Command line navigation and file manipulation
- JavaScript programming language
- Node.js and Express framework
- Git version control and GitHub for repository management
- Postman for testing API endpoints

## Getting Started
1. Clone this repository to your local machine using Git:
    ```bash
    git clone https://github.com/Adrian-Apostu/personal-budget-api
    ```
2. Navigate to the project directory:
    ```bash
    cd personal-budget-api
    ```
3. Install project dependencies using npm:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```
5. Use Postman or any API testing tool to interact with the API endpoints.

## API Endpoints
### Envelope Endpoints
- `GET /envelopes`: Retrieve all budget envelopes
- `GET /envelopes/:id`: Retrieve a specific envelope by ID
- `POST /envelopes`: Create a new envelope
- `PUT /envelopes/:id`: Update an existing envelope
- `DELETE /envelopes/:id`: Delete an existing envelope

### Balance Endpoints
- `PUT /envelopes/:id/update-balance`: Update the balance of a specific envelope

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
