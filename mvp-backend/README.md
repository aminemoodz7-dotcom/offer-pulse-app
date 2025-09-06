# MVP Backend Project

This project is a backend application designed to scrape listings from multiple platforms, send notifications via Telegram or Discord, and store data in a Supabase database. The application checks for new ads every 2 minutes and processes them according to user-defined criteria.

## Project Structure

```
mvp-backend
├── src
│   ├── main.py            # Entry point of the application
│   ├── scraper.py         # Functions for scraping data from platforms
│   ├── telegram_bot.py    # Handles sending notifications
│   ├── supabase_client.py  # Manages interactions with Supabase
│   └── config.py          # Configuration settings and environment variables
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd mvp-backend
   ```

2. **Install dependencies:**
   Ensure you have Python 3.7 or higher installed. Then, run:
   ```
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   TELEGRAM_TOKEN=<your_telegram_token>
   TELEGRAM_CHAT_ID=<your_telegram_chat_id>
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   ```

4. **Run the application:**
   Execute the main script:
   ```
   python src/main.py
   ```

## Usage

The application will start scraping the specified platforms for new ads based on the criteria set in the database. Notifications will be sent to the configured Telegram or Discord channel whenever new ads are found.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.