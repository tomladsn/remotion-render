import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";

const API_KEYS = {
  pexels: "akUc9Kqe1bQLADZfTwqlCfXm9SL1mH06CzMCFPPBzdFfK4VkUq54CePG",
  pixabay: "49368787-d11ffb6abacbe78a4ec5ff1ab",
};

interface VideoFile {
  link: string;
}

interface PexelsVideo {
  video_files: VideoFile[];
}

interface PexelsResponse {
  videos: PexelsVideo[];
}

interface PixabayVideo {
  videos: {
    large: {
      url: string;
    };
  };
}

interface PixabayResponse {
  hits: PixabayVideo[];
}

const fetchStockVideo = async (keyword: string): Promise<string | null> => {
  try {
    const pexelsResponse = await fetch(
      `https://api.pexels.com/videos/search?query=${keyword}&orientation=portrait`,
      { headers: { Authorization: API_KEYS.pexels } }
    );
    const pexelsData: PexelsResponse = await pexelsResponse.json();
    if (pexelsData.videos.length) return pexelsData.videos[0].video_files[0].link;
  } catch (error) {
    console.error("Pexels API Error:", error);
  }

  try {
    const pixabayResponse = await fetch(
      `https://pixabay.com/api/videos/?key=${API_KEYS.pixabay}&q=${keyword}`
    );
    const pixabayData: PixabayResponse = await pixabayResponse.json();
    if (pixabayData.hits.length) return pixabayData.hits[0].videos.large.url;
  } catch (error) {
    console.error("Pixabay API Error:", error);
  }

  return null;
};

interface TweetProps {
  posterName?: string;
  postContent?: string;
  postDate?: string;
  profileImage?: string;
  postImage?: string;
  titleName?: string;
}

export const Tew: React.FC<TweetProps> = ({
  posterName = "Unknown",
  postContent = "No content available.",
  postDate = "Unknown date",
  profileImage,
  postImage = "",
  titleName = "unknown",
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { fps } = useVideoConfig();

  useEffect(() => {
    const loadVideo = async () => {
      if (postImage === "Nil") {
        const keyword = postContent.split(" ")[0] || "nature";
        const url = await fetchStockVideo(keyword);
        setVideoUrl(url);
      }
    };

    loadVideo();
  }, [postContent, postImage]);

  const segmentSize = 150;
  const words = postContent.trim().split(/\s+/);
  const wordSegments: string[] = [];
  
  for (let i = 0; i < words.length; i += segmentSize) {
    wordSegments.push(words.slice(i, i + segmentSize).join(" "));
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {postImage && postImage !== "Profile image selector not found" ? (
        <img
          src={postImage}
          alt="Post background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            filter: "blur(10px)",
          }}
        />
      ) : (
        videoUrl && (
          <Video
            src={videoUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        )
      )}

      <div
        style={{
          position: "relative",
          width: 1000,
          height: 1200,
          background: "linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(40, 40, 40, 0.9))",
          color: "#FFFFFF",
          borderRadius: 25,
          padding: 40,
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.8), 0px 0px 15px rgba(0, 255, 255, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          overflow: "hidden",
        }}
      >
        {/* Profile Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
          {profileImage && (
            <img
              src={profileImage}
              alt={`${posterName}'s profile`}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #fff",
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: "bold", fontSize: 28, color: "#ffffff" }}>{titleName}</div>
            <div style={{ fontWeight: "bold", fontSize: 28, color: "#ffffff" }}>{posterName}</div>
            <div style={{ color: "#ffffff", fontSize: 20 }}>{postDate}</div>
          </div>
        </div>

        {/* Post Content with Transition */}
        <TransitionSeries>
  {wordSegments.map((segment, index) => (
    <React.Fragment key={index}>
      <TransitionSeries.Sequence durationInFrames={fps * 10}>
        <div
          style={{
            fontSize: 22,
            lineHeight: 1.2,
            margin: 10,
            marginTop: 100,
            color: "#ffffff",
            height: 300,
            position: "relative",
            borderBottomRightRadius: "50px",
            padding: 20,
            opacity: 1,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {segment}
        </div>
      </TransitionSeries.Sequence>

      {index < wordSegments.length - 1 && (
        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
      )}
    </React.Fragment>
  ))}
</TransitionSeries>
 <div
        style={{
            width: "80%",
          position: "absolute",
          bottom: 0,
          left: 0,
          overflow: "hidden",
        }}>
    <img
      src={postImage}
      style={{
        width: 200,               // Set your desired square size (e.g., 200px)
        height: 200,
        objectFit: "cover",       // Ensures the image covers the square without distortion
        borderRadius: 20,         // Optional: rounded corners
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)", // Optional: subtle shadow
        display: "block",
      }}
    />
        </div>
      </div>
    
    </AbsoluteFill>
  );
};

export default Tew;
