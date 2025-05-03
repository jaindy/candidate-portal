# Technical Kata 01 - Web Development
## Project Name: Candidate Portal

This project involves building a web application where users can input details such as their name, city, and year of joining. The app will have the following functionality:
1. Input Form: Users can enter their name, city, and year of joining.
2. Constraints on Year: The year field will have a constraint to limit the entry to the last 5 years.
3. Save and Retrieve Data: The data will be saved to a database through a RESTful API using C#. The data can be retrieved using a GET request.
4. API Security: The web service will require an API key for authentication.

## Technologies Used

1. Frontend: React (with Vite for development)
2. Backend: C# (ASP.NET Core Web API)
3. Database: SQL Server
4. API Security: API Key authentication
5. State Management: React's useState for state management
6. API Testing: Configure Scalar
7. Design Pattern: Repository Design pattern

## Functionality 

1. Web App Form:
This form enables users to input their name, city, and year of joining. Frontend-side form validation is implemented, while data annotations are used on the backend for validation. Used OpenAPI to test the WEB API functionality. Implemented global Exception to handle the exception.

2. Save Data (Used axios for making POST Request): 
When the "Save" button is clicked, the form data is sent to the backend API via a POST request. The backend API saves the data into a SQL database.

3. Retrieve Data (Used axios for making GET Request):
When the "Retrieve" button is clicked, a GET request is sent to fetch all the saved data from the database. The data is displayed in a list on the frontend 5 entry per page. 

4. API Key Authentication:
The backend API requires a valid API Key for both POST and GET requests.Configured proxy for sending the API key from frontend so that it will not display in the browser console. In the backend, added middleware to validate the API key.

## Flow of the Application
## Screenshot
