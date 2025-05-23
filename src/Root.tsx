import { Composition } from 'remotion';
import Tweet from './tweet';
import { useEffect, useState } from 'react';
import Tew from './tew'
interface TweetProps {
  posterName: string;
  postContent: string;
  postDate: string;
  profileImage?: string; // <-- Add profile image URL
  postImage?: string; // <-- Add post image URL
  titleName?: string; // <-- Add title name
}

// Default placeholder tweet
const defaultTweet: TweetProps = {
  posterName: 'Loading...',
  postContent: 'Fetching tweet data...',
  postDate: '...',
};

export const RemotionRoot: React.FC = () => {
  const [tweetData, setTweetData] = useState<TweetProps>(defaultTweet);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/scrape?url=https://x.com/DavidHundeyin/status/1904654839201562656'
        );
    
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const data = await response.json();
        console.log("Fetched data:", data); // <-- Add this to debug the response
    
        setTweetData({
          posterName: data.posterName || 'Unknown',
          postContent: data.postContent || 'No content available.',
        postDate: data.date || 'Unknown date', 
          profileImage: data.profileImage || '',
          postImage: data.postImage || '', // Default to an empty string if not provided
          titleName: data.titleName || 'Unknown',
        });
        console.log("Fetched data:", data);        
      } catch (err) {
        console.error("Error fetching tweet:", err);
        setError('Failed to fetch tweet.');
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Composition
        id="TweetVideo"
        component={Tew}
        durationInFrames={610}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={tweetData} // Always pass default data
      />
    </>
  );
};
