import fs from 'fs';
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/scrape?url=https://x.com/DavidHundeyin/status/1904654839201562656';

const fetchTweetData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    
    // Save the data in a JSON file for Remotion to use
    fs.writeFileSync('tweetData.json', JSON.stringify(data, null, 2));

    console.log('✅ Data fetched and saved!');
  } catch (error) {
    console.error('❌ Error fetching tweet:', error);
    process.exit(1); // Stop execution if API fails
  }
};

await fetchTweetData();
