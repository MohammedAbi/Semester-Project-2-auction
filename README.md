# Semester Project 2: Auction Website

## Product Showcase

![Image](https://github.com/user-attachments/assets/ac151289-57e3-4644-b4ee-0c998afe3e39)
This image provides a glimpse of the auction website's user interface, showcasing how users can interact with the platform, browse listings, and place bids. The design follows modern web standards with a clean, user-friendly layout using TailwindCSS, offering a seamless experience for both mobile and desktop users.

## Description

This project is a front-end application for an auction website where users can list and bid on items. It interfaces with an existing API to manage auction data, such as creating listings, placing bids, and managing user profiles.

## Features

- **User Registration & Login**: Registered users can sign in and manage their profile.
- **Item Listings**: Users can create listings with titles, descriptions, media, and deadlines.
- **Bidding**: Registered users can place bids on items listed by others.
- **User Profile**: Registered users can update their avatar and view their total credits.
- **Search Bar**: Users can search for listings efficiently.

## Technologies Used

- React
- Vite (build tool)
- TailwindCSS (CSS framework)
- ESLint (for linting)
- PostCSS (CSS processing)
- React Router DOM (for routing)

## Folder Structure

The project follows a component-based architecture in React. The folder structure is organized as follows:

- `src/` – Main application directory
  - `App.jsx` – Root component that sets up routing and rendering
  - `index.css` – Global CSS styles
  - `main.jsx` – Entry point for the React app
  - `components/` – Contains reusable components for the app
    - Examples: `Header.jsx`, `Footer.jsx`, `Hero.jsx`, `ListingView.jsx`, `Profile.jsx`, etc.
  - `pages/` – Contains page-level components
    - Example: `Home.jsx`
  - `components/model/` – Contains modal components like `BidModal.jsx`
  - `components/validation/` – Contains validation logic for bids (`ValidateBid.jsx`)

## Setup & Running the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MohammedAbi/Semester-Project-2-auction.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build the project**:

   ```bash
   npm run build
   ```

5. **Preview the build**:
   ```bash
   npm run preview
   ```

## API Endpoints

Base URL

```bash
export const API_BASE_URL = "https://v2.api.noroff.dev"
```

Authentication Endpoints

```bash
export const API_AUTH = {
  BASE: `${API_BASE_URL}/auth`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
}
```

Listings Endpoints

```bash
export const API_LISTINGS = {
  BASE: (includeSeller = false, includeBids = false) =>
    `${API_BASE_URL}/auction/listings?_seller=${includeSeller}&_bids=${includeBids}`,
  SINGLE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  FILTER: (tag, active) =>
    `${API_BASE_URL}/auction/listings?_tag=${tag}&_active=${active}`,
  CREATE: `${API_BASE_URL}/auction/listings`,
  UPDATE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  DELETE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  BID: (id) => `${API_BASE_URL}/auction/listings/${id}/bids`,
  SEARCH: (query) => `${API_BASE_URL}/auction/listings/search?q=${query}`,
}
```

Profiles Endpoints

```bash
export const API_PROFILES = {
  BASE: `${API_BASE_URL}/auction/profiles`,
  SINGLE: (name) => `${API_BASE_URL}/auction/profiles/${name}`,
  UPDATE: (name) => `${API_BASE_URL}/auction/profiles/${name}`,
  LISTINGS: (name) => `${API_BASE_URL}/auction/profiles/${name}/listings`,
  BIDS: (name) => `${API_BASE_URL}/auction/profiles/${name}/bids`,
  WINS: (name) => `${API_BASE_URL}/auction/profiles/${name}/wins`,
  SEARCH: (query) => `${API_BASE_URL}/auction/profiles/search?q=${query}`,
}
```

API Key
Create a .env file in the root of your project:

```bash
VITE_API_KEY=your-api-key
```

## Links

- **Prototype (Mobile)**: [View on Figma](<https://www.figma.com/proto/R0URBxhEJp5wTglXpvMhoZ/Aution-House---Official-Tailwind-CSS-Styles-(Community)?node-id=3224-47&t=flKtHp2wXhfjaUAv-1>)
- **Prototype (Desktop)**: [View on Figma](<https://www.figma.com/proto/R0URBxhEJp5wTglXpvMhoZ/Aution-House---Official-Tailwind-CSS-Styles-(Community)?node-id=3404-752&t=flKtHp2wXhfjaUAv-1>)
- **GitHub Project Board**: [View GitHub Project](https://github.com/users/MohammedAbi/projects/8)
- **GitHub Repository**: [View Repo](https://github.com/MohammedAbi/Semester-Project-2-auction/tree/main)
