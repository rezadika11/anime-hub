# AnimeHub

A modern anime discovery website built with Vue 3, TypeScript, and Tailwind CSS v4. Powered by the [Jikan API](https://jikan.moe/) (Unofficial MyAnimeList API).

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

## Features

- **Browse Anime**
  - Top Anime rankings
  - Seasonal anime
  - Upcoming releases

- **Search**
  - Real-time search with debouncing (500ms)
  - Search by Enter key
  - Clear search functionality

- **Pagination**
  - Navigate through pages
  - First, Previous, Next, Last buttons
  - Page number display with ellipsis

- **Anime Details**
  - Full anime information modal
  - Synopsis, genres, ratings
  - Statistics (rank, popularity, members, favorites)
  - Link to MyAnimeList

- **Responsive Design**
  - Mobile-first approach
  - Hamburger menu for mobile
  - Bottom sheet modal on mobile
  - 6-column grid layout

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **API**: Jikan API v4

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AnimeCard.vue      # Anime card component
│   ├── AnimeDetail.vue    # Anime detail modal
│   ├── AnimeGrid.vue      # Grid layout for anime list
│   ├── Header.vue         # Navigation header
│   ├── Pagination.vue     # Pagination component
│   └── SearchBar.vue      # Search input with debouncing
├── services/
│   └── jikanApi.ts        # API service for Jikan API
├── types/
│   └── anime.ts           # TypeScript interfaces
├── App.vue                # Root component
├── main.ts                # Entry point
└── style.css              # Global styles
```

## API Usage

This project uses the [Jikan API v4](https://docs.api.jikan.moe/), which is a free, open API for MyAnimeList data.

### Endpoints Used

- `GET /top/anime` - Top anime rankings
- `GET /seasons/{year}/{season}` - Seasonal anime
- `GET /seasons/upcoming` - Upcoming anime
- `GET /anime` - Search anime
- `GET /anime/{id}/full` - Full anime details

**Note**: Jikan API has a rate limit of 3 requests per second. Consider implementing caching for production use.

## Components

### AnimeCard
Displays anime information in a card format:
- Cover image
- Title
- Type, episodes, year
- Rating score
- Airing status

### AnimeDetail
Modal showing full anime details:
- Large cover image
- Titles (romaji, english, japanese)
- Score and status badges
- Genre tags
- Information grid (type, episodes, duration, rating)
- Synopsis and background
- Statistics
- MyAnimeList link

### SearchBar
Search input with:
- Debounced search (500ms)
- Enter key support
- Clear button
- v-model support

### Pagination
Pagination controls:
- First/Last page buttons
- Previous/Next navigation
- Page numbers with ellipsis
- Disabled state handling

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [MyAnimeList](https://myanimelist.net/) for the original data source
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
