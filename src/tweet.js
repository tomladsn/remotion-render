// saveTweetData.js
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

const fetchAndSaveTweetData = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/scrape?url=https://x.com/MattWalshBlog/status/1893745437665792303'
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    // Save the data to a JSON file
    writeFileSync('tweetData.json', JSON.stringify(data, null, 2));
    console.log('Tweet data saved to tweetData.json');
  } catch (err) {
    console.error('Error fetching tweet data:', err);
  }
};

fetchAndSaveTweetData();
