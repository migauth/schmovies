#!/usr/bin/env python
"""
Simple script to check if the application is ready.
Used for Railway health checks.
"""
import os
import requests
import time
import sys

def check_health(url, retries=12, delay=5):
    """Check if the application is ready by making a request to the health endpoint."""
    print(f"Checking health at {url}")
    
    for i in range(retries):
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"Health check passed! Status: {response.status_code}")
                return True
            else:
                print(f"Health check failed. Status: {response.status_code}. Retrying in {delay} seconds...")
        except Exception as e:
            print(f"Health check error: {str(e)}. Retrying in {delay} seconds...")
        
        time.sleep(delay)
    
    print("Health check failed after all retries.")
    return False

if __name__ == "__main__":
    port = os.environ.get("PORT", "8000")
    url = f"http://localhost:{port}/health/"
    
    if check_health(url):
        sys.exit(0)
    else:
        sys.exit(1)