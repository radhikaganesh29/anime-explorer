
# Anime Explorer

Anime Explorer is a responsive and user-friendly web application that allows users to browse, search, and manage a personal list of favorite anime titles. The application fetches real-time data from the Jikan API (a public REST API for MyAnimeList) and presents it in a clean, modern interface.

This project demonstrates modern frontend development practices using the Next.js framework, Tailwind CSS for utility-based styling, and persistent client-side storage through localStorage.

**Live Site**: [https://anime-explorer-xi.vercel.app](https://anime-explorer-xi.vercel.app)

---

## Features

### Anime Discovery
- Displays a curated list of top-rated anime upon page load.
- Implements infinite scroll to load more anime dynamically as the user browses.
- Users can search for anime titles using the search bar; results are retrieved directly from the Jikan API.

### Favorites Functionality
- Each anime card includes a toggleable favorite button.
- Favorited items are stored in localStorage, allowing persistence across sessions.
- A dedicated "Favorites" page lists all saved titles.
- Users can remove anime from the favorites list directly from this page.

### Detail Pages
- Each anime links to a detailed page that includes:
  - Cover image
  - Synopsis
  - Score
  - Status
  - Episode count
- These details are presented in a structured, card-based layout for clarity and visual appeal.

### User Interface and Responsiveness
- The site is built with Tailwind CSS, providing a modern and responsive UI.
- Layouts and components adapt gracefully across screen sizes (mobile, tablet, and desktop).
- Fixed navigation ensures consistent access to navigation links even during scroll.

---

## Technologies Used

| Technology      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Next.js         | React-based framework for server-side rendering, routing, and optimizations |
| Tailwind CSS    | Utility-first CSS framework for styling                                     |
| Jikan API       | REST API used to fetch anime data                                           |
| Vercel          | Hosting platform for seamless deployment                                    |
| localStorage    | Browser-based persistence of favorite selections                           |

---

## Installation and Local Development

To run Anime Explorer locally, follow the steps below:

### Prerequisites
- Node.js and npm installed on your machine

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/radhikaganesh29/anime-explorer.git
   cd anime-explorer
   npm install
   npm run dev
