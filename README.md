# Judge My Music

# Table of Contents

1. [Project Overview](#project-overview)
   - [Features](#features)
2. [Technical Architecture](#technical-architecture)
   - [Technologies Used](#technologies-used)
3. [Data Collection and Preprocessing](#data-collection-and-preprocessing)
4. [Application Development](#application-development)
5. [Technical Implementation](#technical-implementation)
   - [Music Analysis](#music-analysis)
   - [Roast Generation](#roast-generation)
6. [Results and Performance](#results-and-performance)
7. [How to Use](#how-to-use)
8. [Acknowledgments](#acknowledgments)


## Project Overview

Spotify Roast Index is an interactive web application that analyzes a user's Spotify listening habits and playfully "roasts" their music preferences. It provides insights into the user's top artists, top tracks, and their musical personality, while also offering amusing roasts based on their music choices.

### Features

- **Musical Personality Roast:** Receive a humorous roast based on your Spotify data.
- **Top Artists and Tracks:** Discover your top artists and tracks.
- **Genre Analysis:** Find out your most-listened-to music genre.
- **Random Roasts:** Enjoy witty roasts that add a fun twist to your music insights.

## Technical Architecture

### Technologies Used

- **Frontend Framework:** [Vite](https://vitejs.dev/guide/)
- **API Integration:** [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- **Browser Storage:** Local Storage ([Learn More](https://javascript.info/localstorage))
- **Web Scraping:** [Selenium](https://www.selenium.dev/documentation/)

## Data Collection and Preprocessing

The application gathers user data from the Spotify Web API and preprocesses it to provide meaningful insights and roasts. The technical details of data collection, formatting, and transformation are available in the codebase.

## Application Development

The application is built with a combination of HTML, CSS, and JavaScript. It leverages the Vite framework for efficient development. Technical challenges and their solutions are documented within the codebase.

## Technical Implementation

### Music Analysis

The Roast Index analyzes your music preferences based on your top artists, top tracks, and genres. This is achieved through integration with the Spotify Web API.

### Roast Generation

Roasts are generated dynamically based on your music data. The application selects amusing roasts to entertain and engage users.

## Results and Performance

The application has received positive feedback for its fun and interactive nature. However, there are areas for improvement, such as enhancing security measures for user data and refining the data analysis algorithm for more accurate insights.

## How to Use

To use this application, follow these steps:

1. Clone this GitHub repository.
2. Set up the required environment variables.
3. Run the application using Vite or your preferred development server.
4. Authorize the application to access your Spotify data.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api) for providing access to user data.
- [Vite](https://vitejs.dev/guide/) for the efficient frontend framework.
- [Selenium](https://www.selenium.dev/documentation/) for web scraping functionality.

---

Feel free to contribute, report issues, and have fun exploring your musical personality with Spotify Roast Index!
