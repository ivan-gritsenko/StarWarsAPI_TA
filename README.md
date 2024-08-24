# Star Wars Character Viewer

This project is a React-based web application that allows users to explore characters from the Star Wars universe. The app features infinite scrolling, a dynamic modal with a flow chart, and is fully tested.

## Features

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Provides static typing to help prevent bugs.
- **Material-UI**: A popular React UI framework for implementing Material Design.
- **Vite**: A fast and efficient build tool for modern web projects.
- **React Window**: Virtualized list for efficient rendering of large data sets, supporting infinite scrolling.
- **React Flow**: A library for creating and visualizing node-based flows.

## Functionality

- **Infinite Scrolling**: The list of Star Wars characters loads more data as you scroll down, implemented using `react-window`.
- **Character Details**: When a user clicks on a character from the list, a modal (rendered via `ReactDOM.createPortal`) appears, displaying a flow chart of the character, the films they appear in, and the starships they use.
- **API Integration**: The app fetches data from the [Star Wars API](https://sw-api.starnavi.io/).
- **Component Testing**: Tests are implemented for core components like the app itself and the virtualized list.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <your-repo-url>
cd star-wars-character-viewer
npm install
```

## Usage

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view it in your browser.

## Testing

To run the tests:

```bash
npm run test
```

## API

The application integrates with the Star Wars API hosted at https://sw-api.starnavi.io/ to fetch character data.
