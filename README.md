# Semester Project 2: Auction Website

## Description

This project is a front-end application for an auction website where users can list and bid on items. It interfaces with an existing API to manage auction data, such as creating listings, placing bids, and managing user profiles.

## Features

- **User Registration & Login**: Registered users can sign in and manage their profile.
- **Item Listings**: Users can create listings with titles, descriptions, media, and deadlines.
- **Bidding**: Registered users can place bids on items listed by others.
- **User Profile**: Registered users can update their avatar and view their total credits.

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

## Links

- **Prototype (Mobile)**: [View on Figma](<https://www.figma.com/proto/R0URBxhEJp5wTglXpvMhoZ/Aution-House---Official-Tailwind-CSS-Styles-(Community)?node-id=3224-47&t=flKtHp2wXhfjaUAv-1>)
- **Prototype (Desktop)**: [View on Figma](<https://www.figma.com/proto/R0URBxhEJp5wTglXpvMhoZ/Aution-House---Official-Tailwind-CSS-Styles-(Community)?node-id=3404-752&t=flKtHp2wXhfjaUAv-1>)
- **GitHub Project Board**: [View GitHub Project](https://github.com/users/MohammedAbi/projects/8)
- **GitHub Repository**: [View Repo](https://github.com/MohammedAbi/Semester-Project-2-auction/tree/main)
