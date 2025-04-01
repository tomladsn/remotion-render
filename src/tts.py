import requests
from TTS.api import TTS


tts = TTS("tts_models/en/ljspeech/tacotron2-DDC")  

url = "http://localhost:3000/scrape?url=https://x.com/DavidHundeyin/status/1904654839201562656"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    text = data.get("postContent", "No content available.")  

    tts.tts_to_file(text=text, file_path="tweet_audio.wav")
    print("Speech saved as tweet_audio.wav")
else:
    print("Failed to fetch tweet data.")
