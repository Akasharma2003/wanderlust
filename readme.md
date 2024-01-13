# Airbnb Small Version - MERN Stack

This project is a simplified version of Airbnb, implemented using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It follows the MVC (Model-View-Controller) architecture to handle CRUD (Create, Read, Update, Delete) operations. This README.md file provides an overview of the project structure, setup instructions, and key functionalities.

## Project Structure

```
airbnb-small-version/
|-- client/
|   |-- public/
|   |-- src/
|       |-- components/
|       |-- pages/
|       |-- App.js
|       |-- index.js
|-- server/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- app.js
|   |-- server.js
|-- .gitignore
|-- package.json
|-- README.md
```

- **client/**: Frontend application built with EJS,CSS, JavaScript.
- **server/**: Backend server built with Node.js, Express.js, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB


## MVC Model Overview

- **Models**: MongoDB models for defining the data structure.
- **Views**: React components for rendering the user interface.
- **Controllers**: Express.js controllers for handling CRUD operations.

## Features

- **Property Listings**: Display a list of available properties.
- **Property Details**: View details of a specific property.
- **User Authentication**: Sign up, log in, and log out functionalities.
- **CRUD Operations**: Create, read, update, and delete property listings.
