// TweetVideo.tsx
import React, { useState, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { promises as fs } from 'fs';

// Function to read data from the JSON file
const readTweetData = async () => {
  try {
    const data = await fs.readFile('src/tweetData.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read tweet data:', err);
    throw err;
  }
};

const TweetVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [tweetData, setTweetData] = useState({
    profileImage: '',
    posterName: '',
    postContent: '',
    date: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await readTweetData();
        setTweetData({
          profileImage: data.profileImage,
          posterName: data.posterName,
          postContent: data.postContent,
          date: data.date,
        });
      } catch (error) {
        console.error('Failed to load tweet data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Duration of the animation in seconds
  const animationDuration = 2;

  // Calculate the opacity based on the current frame
  const opacity = interpolate(
    frame,
    [0, animationDuration * fps],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const translateY = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  if (isLoading) {
    return (
      <div style={{ backgroundColor: 'white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity,
      transform: `translateY(${translateY}px)`,
      textAlign: 'center',
      color: 'black'
    }}>
      <img
        src={tweetData.profileImage}
        alt="Profile"
        style={{ borderRadius: '50%', width: 100, height: 100, marginBottom: 20 }}
      />
      <h2 style={{ fontSize: 30, marginBottom: 10 }}>{tweetData.posterName}</h2>
      <p style={{ fontSize: 24, marginBottom: 20 }}>{tweetData.postContent}</p>
      <p style={{ fontSize: 20, color: 'gray' }}>{tweetData.date}</p>
    </div>
  );
};

export default TweetVideo;
