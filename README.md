# GiftLink Frontend

## Project Overview

**GiftLink** is a web application that connects users who wish to give away household items they no longer need with those who enjoy recycling and finding free household items instead of purchasing new ones.

This repository contains the **frontend** part of the GiftLink application, built using **React.js**. The frontend provides a user-friendly interface for browsing available items, searching listings, viewing item details, and managing user accounts.

## Features

- 🏠 **Home Page** – Welcomes users with project information and a call-to-action.
- 🔍 **Search Functionality** – Users can search for available items using multiple filters.
- 📄 **Listings Page** – Displays all available items with images and descriptions.
- 🛒 **Item Details Page** – Shows item-specific information, including contact details.
- 👤 **User Authentication** – Secure **registration, login, and profile management**.
- 📌 **Editable Profile Page** – Users can manage their information and listed items.
- 🌍 **Responsive Design** – Fully optimized for **mobile, tablet, and desktop views**.

## Technologies Used

- **React.js** – Frontend framework
- **React Router** – Client-side routing
- **Tailwind CSS** – Styling and responsiveness
- **Context API** (TBD) – State management
- **JWT Authentication** – Secure login/logout mechanism

## Project Setup

### 🔧 Prerequisites

Ensure you have the following installed on your system:

- Node.js (v18+ recommended)
- npm or yarn

### 🚀 Installation Steps

```sh
# Clone the repository
git clone https://github.com/your-username/giftlink-frontend.git

# Navigate to project directory
cd giftlink-frontend

# Install dependencies
npm install  # or yarn install

# Start the development server
npm run dev  # or yarn dev
```

## Directory Structure

```plaintext
 giftlink-frontend/
 ├── public/               # Static assets (favicon, images, etc.)
 ├── src/
 │   ├── components/       # Reusable UI components
 │   ├── pages/            # Pages for the App (Home, Listings, Login, etc.)
 │   ├── context/          # Global state management (Context API)
 │   ├── App.jsx           # Main application file
 │   ├── main.jsx          # ReactDOM rendering entry point
 ├── .env                  # Environment variables (API keys, etc.)
 ├── package.json          # Dependencies and project metadata
 ├── README.md             # Documentation (this file)
 └── vite.config.js        # Vite configuration
```

## API Integration

This project integrates with a backend API for authentication, user management, and item listings. The backend URL is not provided in this repository.

Expected API endpoints (to be configured in `.env`):

- **Authentication APIs** – `/api/auth/register`, `/api/auth/login`, `/api/auth/update`
- **Listings APIs** – `/api/gifts`, `/api/gifts/:productId`
- **Search API** – `/api/search`

## Deployment

To deploy the frontend, use **Vercel, Netlify, or GitHub Pages**:

```sh
npm run build
```

Then, upload the **`dist/`** folder to a static hosting service.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License**.

---

💡 _Happy coding!_ 🚀
