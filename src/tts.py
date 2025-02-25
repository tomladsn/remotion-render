import requests
from TTS.api import TTS

# Load Coqui TTS model
tts = TTS("tts_models/en/ljspeech/tacotron2-DDC")  

# Fetch data from your server
url = "http://localhost:3000/scrape?url=https://x.com/MattWalshBlog/status/1893745437665792303"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    text = data.get("postContent", "No content available.")  # Extract post content

    # Generate voice-over
    tts.tts_to_file(text=text, file_path="tweet_audio.wav")
    print("Speech saved as tweet_audio.wav")
else:
    print("Failed to fetch tweet data.")
