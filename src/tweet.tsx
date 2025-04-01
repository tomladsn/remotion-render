import { title } from "process";
import { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video } from "remotion";

const API_KEYS = {
  pexels: "akUc9Kqe1bQLADZfTwqlCfXm9SL1mH06CzMCFPPBzdFfK4VkUq54CePG",
  pixabay: "49368787-d11ffb6abacbe78a4ec5ff1ab"
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

export const Tweet: React.FC<TweetProps> = ({
  posterName = "Unknown",
  postContent = "No content available.",
  postDate = "Unknown date",
  profileImage,
  postImage = "",
  titleName = "unknown",
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (postImage === 'Nil') {
        const keyword = postContent.split(" ")[0] || "nature";
        const url = await fetchStockVideo(keyword);
        setVideoUrl(url);
      }
    };

    loadVideo();
  }, [postContent, postImage]);

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
      {postImage && postImage !== 'Profile image selector not found' ? (
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
          width: 900, // Increased width
          height: 500, // Increased height
          background: "linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(40, 40, 40, 0.9))", // Darker background for better contrast
          color: "#FFFFFF", // Brighter text color
          borderRadius: 25, // Slightly larger border radius
          padding: 40, // Increased padding
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.8), 0px 0px 15px rgba(0, 255, 255, 0.3)", // Enhanced shadow
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          backdropFilter: "blur(15px)", // Increased blur
          WebkitBackdropFilter: "blur(15px)",
          overflow: "hidden", // Ensure no overflow
        }}
      >
        {/* Profile Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
          {profileImage && (
            <img
              src={profileImage}
              alt={`${posterName}'s profile`}
              style={{
                width: 80, // Larger profile image
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #fff", // Thicker border for visibility
              }}
            />
          )}
          <div>
          <div style={{ fontWeight: "bold", fontSize: 28, color: "#ffffff" }}>{titleName}</div>
            <div style={{ fontWeight: "bold", fontSize: 28, color: "#ffffff" }}>{posterName}</div>
            <div style={{ color: "#ffffff", fontSize: 20 }}>{postDate}</div>
          </div>
        </div>

        {/* Post Content */}
        <div
          style={{
            fontSize: 24, // Larger text
            lineHeight: 1.8,
            marginTop: 10,
            color: "#ffffff", // Brighter text color
            maxHeight: "none", // Ensure no scroll
            overflow: "hidden", // Prevent overflow
            borderBottomRightRadius: "50px", // Border radius at bottom right
             padding: 20,
           
          }}
        >
          {postContent}
        </div>
      </div>

    </AbsoluteFill>
  );
};

export default Tweet;
