# LinkedIn Profile Picture Fetcher

A Next.js application that fetches and displays LinkedIn profile pictures using the Enrich Layer API.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Enrich Layer API key.

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the application**
[http://localhost:3000](http://localhost:3000)

## Environment Variables

This application requires an Enrich Layer API key. See `.env.example` for the required format.

- `ENRICH_LAYER_API_KEY`: Your Enrich Layer API key (get one at [enrichlayer.com](https://enrichlayer.com))

## Usage

1. Enter a LinkedIn profile URL (e.g., `https://www.linkedin.com/in/williamhgates`)
2. Click "Fetch Profile Image"
3. The profile picture will display above the form

## Future Improvements

With more time, I would improve or add the following:

- **Enhanced Error Handling**: More specific error messages and retry mechanisms
- **Testing**: Unit tests for validation logic and integration tests for API endpoints
- **Search History**: Keep track of search history, potentially caching responses somehow to avoid duplicate requests.
