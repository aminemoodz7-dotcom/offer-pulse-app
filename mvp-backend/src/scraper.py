import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_leboncoin(model, max_price, location):
    url = f"https://www.leboncoin.fr/recherche?category=2&text={model}&price_max={max_price}&location={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    ads = []

    for item in soup.find_all('li', class_='ad-list__item'):
        title = item.find('h2', class_='ad-list__title').text.strip()
        price = item.find('span', class_='ad-list__price').text.strip()
        ad_url = item.find('a')['href']
        image = item.find('img')['src']
        ads.append({'title': title, 'price': price, 'url': ad_url, 'image': image})

    return ads

def scrape_vinted(model, max_price, location):
    url = f"https://www.vinted.fr/catalog?search_text={model}&price_max={max_price}&location={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    ads = []

    for item in soup.find_all('div', class_='item-box'):
        title = item.find('h3', class_='item-box__title').text.strip()
        price = item.find('span', class_='item-box__price').text.strip()
        ad_url = item.find('a')['href']
        image = item.find('img')['src']
        ads.append({'title': title, 'price': price, 'url': ad_url, 'image': image})

    return ads

def scrape_facebook_marketplace(model, max_price, location):
    url = f"https://www.facebook.com/marketplace/search/?query={model}&max_price={max_price}&location={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    ads = []

    for item in soup.find_all('div', class_='marketplace-item'):
        title = item.find('span', class_='marketplace-item__title').text.strip()
        price = item.find('span', class_='marketplace-item__price').text.strip()
        ad_url = item.find('a')['href']
        image = item.find('img')['src']
        ads.append({'title': title, 'price': price, 'url': ad_url, 'image': image})

    return ads

def scrape_all(model, max_price, location):
    leboncoin_ads = scrape_leboncoin(model, max_price, location)
    vinted_ads = scrape_vinted(model, max_price, location)
    facebook_ads = scrape_facebook_marketplace(model, max_price, location)
    
    return leboncoin_ads + vinted_ads + facebook_ads