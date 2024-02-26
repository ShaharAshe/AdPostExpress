[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KnqVbps7)


# Second Hand Marketplace Web Application

## Overview

This repository contains the source code for a web application designed for a second-hand marketplace. Users can submit posts for items they want to sell, and administrators can manage and approve these posts.

# About As
1. - 💁 Name: Shahar Asher
   - 📫 Email: [shaharas@edu.hac.ac.il](mailto:shaharas@edu.hac.ac.il)
---
2. - 💁 Name: Yaniv Gabay
   - 📫 Email: [yanivga@edu.hac.ac.il](mailto:yanivga@edu.hac.ac.il)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)

## Features

- User authentication for secure login.
- Posting items for sale with title, description, price, contact information, etc.
- Administrator panel for post approval and management.
- Responsive design for a seamless user experience on various devices.
- Error handling and informative messages for users.

## Installation

- Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your web browser and visit [http://localhost:3000/](http://localhost:3000/).

3. Explore the features and functionalities of the Second Hand Marketplace!

## File Structure

- **`/controllers`**: Contains route handling logic.
- **`/models`**: Database models and configurations using Sequelize.
- **`/public`**: Static assets such as stylesheets, images, and client-side scripts.
- **`/routes`**: Express.js route definitions.
- **`/views`**: EJS templates for rendering HTML pages.
- **`app.js`**: Main application file.
- **`config`**: Configuration files.
