import os
import requests

class TelegramBot:
    def __init__(self, token, chat_id):
        self.token = token
        self.chat_id = chat_id
        self.base_url = f"https://api.telegram.org/bot{self.token}/sendMessage"

    def send_message(self, title, price, url, image_url):
        message = f"*{title}*\nPrice: {price}\nLink: {url}\n![Image]({image_url})"
        payload = {
            'chat_id': self.chat_id,
            'text': message,
            'parse_mode': 'Markdown'
        }
        response = requests.post(self.base_url, json=payload)
        return response.status_code == 200

    def send_photo(self, title, price, url, image_url):
        message = f"*{title}*\nPrice: {price}\nLink: {url}"
        payload = {
            'chat_id': self.chat_id,
            'photo': image_url,
            'caption': message,
            'parse_mode': 'Markdown'
        }
        response = requests.post(f"https://api.telegram.org/bot{self.token}/sendPhoto", json=payload)
        return response.status_code == 200

def create_telegram_bot():
    token = os.getenv("TELEGRAM_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    return TelegramBot(token, chat_id)