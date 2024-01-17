# Cashback Calculator Project

This project is a cashback calculator implemented using React Native for the frontend and Firebase for backend services.

## Overview

The cashback calculator application allows users to calculate rewards based on their expenditure and store their card details securely. It utilizes Firebase for authentication and Firestore for storing user-related information and card details.

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js and npm
- React Native CLI
- Firebase Account

## Firebase Setup

1. **Create Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Firebase Configuration Setup**
   - Obtain your Firebase configuration details (API keys, authDomain, etc.) from the Firebase console.

3. **Set Up Authentication**
   - Enable Firebase Authentication (email/password) in the Firebase console.

4. **Set Up Firestore**
   - Enable Firestore in the Firebase console to use it as the database.

## Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/cashback-calculator.git
   cd cashback-calculator

Install Dependencies

npm install

Configuration Setup

Create a .env file at the project root and add your Firebase configuration details.

API_KEY=your_api_key
AUTH_DOMAIN=your_auth_domain
DATABASE_URL=your_database_url
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_sender_id
APP_ID=your_app_id

Run the Application: 

npm start

 
## The following screenshots show the working of the application

1.	The **WelcomeScreen** component is a React Native page with a background image and stylized elements, providing a welcoming interface for a cashback calculator app. It includes a title, subtitle, description, and buttons for user login and signup, all styled for an engaging and intuitive user experience.

 



2.	The SignupScreen component in React Native handles user registration, capturing details like name, email, password, and date of birth. It uses Firebase authentication and Firestore to store user data, including sending a verification email, and provides a user-friendly form for signup with error handling.

 
3.	The LoginScreen component in React Native handles user login, including authentication using Firebase, fetching user data from Firestore based on the login credentials, and providing options for password reset. It integrates with navigation and updates the Wallet screen with user-specific data upon successful login.

 
4.	The Wallet component in React Native displays the user's wallet information, including a list of stored cards, available credit balance, and provides options for adding new cards, navigating to card details, and accessing additional features through icon buttons at the bottom. It integrates with Firebase Firestore for data retrieval and navigation between screens.

 
5.	The CardIssuerSelector React Native component allows users to select a card issuer from a list fetched from Realtime Firebase. It includes a search bar for filtering issuers, and upon selection, it navigates to the 'AddCard' screen with the chosen issuer and the user's UID.

 

6.	The AddCard React Native component enables users to select and add cards to their wallet. It fetches card data from Realtime Firebase, allows card selection with a checkbox, and adds selected cards to the user's Firestore-based wallet upon confirmation. The component includes a search bar for card filtering and displays card details, including images.

 
7.	The CardDetails React Native component displays detailed information about a specific card fetched from Realtime Firebase, including its name, issuer, rewards percentages for various categories, and an optional image. The component uses a ScrollView for vertical scrolling and presents the details in a visually organized layout.

 
8.	The Category React Native component fetches card categories from Realtime Firebase, allowing users to select a category. It then displays the top percentage cards in that category, providing users with information on the cards and allowing them to navigate to a rewards calculation screen for a selected card within the chosen category. The component utilizes FlatList for rendering categories and top percentage cards in a visually organized layout.

 

9.	The RewardsCalculation React Native component allows users to input the amount spent and percentage to calculate rewards. Users can save the calculated reward, updating both the user's overall reward balance and saving the reward amount in a subcollection within their wallet in Firestore. The component provides a straightforward interface for reward calculation and saving.

 
![image](https://github.com/Yakshita1802/Cashback-Calculator-Mobile-App/assets/101899906/bf7c19c8-27b7-4410-88bb-171b0ddc684f)

