import time
from scraper import scrape_ads
from telegram_bot import send_notification
from supabase_client import SupabaseClient

def main():
    supabase_client = SupabaseClient()
    
    while True:
        # Scrape ads from multiple platforms
        ads = scrape_ads()
        
        for ad in ads:
            # Check if the ad has already been sent
            if not supabase_client.ad_already_sent(ad['url']):
                # Send notification to Telegram or Discord
                send_notification(ad)
                
                # Store the ad in Supabase
                supabase_client.store_ad(ad)
        
        # Wait for 2 minutes before the next check
        time.sleep(120)

if __name__ == "__main__":
    main()