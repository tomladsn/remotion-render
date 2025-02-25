import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { Audio, interpolate, useCurrentFrame } from "remotion";
interface TweetProps {
  posterName?: string;
  postContent?: string;
  postDate?: string;
  profileImage?: string;
}

export const Tweet: React.FC<TweetProps> = ({
  posterName = 'Unknown',
  postContent = 'No content available.',
  postDate = 'Unknown date',
  profileImage,
}) => {
  const frame = useCurrentFrame();
  const totalDuration = 600; // 20 seconds * 30 FPS

  // Calculate how many characters should be visible at the current frame
  const charsToShow = Math.floor(interpolate(frame, [0, totalDuration], [0, postContent.length], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', fontFamily: 'sans-serif', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
      <div
        style={{
          width: 1000,
          border: '2px solid #e1e8ed',
          borderRadius: 10,
          padding: 20,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center'
        }}
      >
              {profileImage && (
        <img
          src={profileImage}
          alt={`${posterName}'s profile`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      )}
        {/* Poster Name & Date */}
        <div style={{ fontWeight: 'bold', fontSize: '38px', marginBottom: 10 }}>{posterName}</div>
        <div style={{ color: '#8899A6', fontSize: '30px', marginBottom: 20 }}>{postDate}</div>

        {/* Post Content */}
        <div style={{ fontSize: '35px', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
        <p>{postContent.slice(0, charsToShow)}</p>

{/* Play voice-over */}
<Audio src={staticFile("aud.wav")} volume={1} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Tweet;
