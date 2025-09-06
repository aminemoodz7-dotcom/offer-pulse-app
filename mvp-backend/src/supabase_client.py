from supabase import create_client, Client
import os

# Initialize Supabase client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def ad_exists(ad_url: str) -> bool:
    """
    Check if an ad has already been sent by querying the 'sent_ads' table.

    Parameters:
    ad_url (str): The URL of the ad to check.

    Returns:
    bool: True if the ad exists, False otherwise.
    """
    response = supabase.table("sent_ads").select("*").eq("url", ad_url).execute()
    return len(response.data) > 0

def add_ad(ad_data: dict) -> None:
    """
    Add a new ad to the 'sent_ads' table.

    Parameters:
    ad_data (dict): A dictionary containing ad details (title, price, url, image).
    """
    supabase.table("sent_ads").insert(ad_data).execute()

def get_alerts() -> list:
    """
    Retrieve user-defined alerts from the 'alerts' table.

    Returns:
    list: A list of alerts with user-defined criteria.
    """
    response = supabase.table("alerts").select("*").execute()
    return response.data