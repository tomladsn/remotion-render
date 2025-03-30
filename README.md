Tweet Video Renderer

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>Welcome to the Tweet Video Renderer project! This project utilizes Remotion to generate animated videos based on tweet-like content.

Commands

Install Dependencies

npm i

Start Preview

npm run dev

Render Video

npx remotion render

Upgrade Remotion

npx remotion upgrade

Features

Render tweet-styled videos with profile images, tweet content, and background images.

Supports dynamic animations for long tweet texts.

Blur background effect for aesthetic visuals.

Fully customizable via props.


Usage

Replace the default tweet content by modifying Tweet.tsx props. Example:

<Tweet 
  posterName="John Doe" 
  postContent="This is a sample tweet rendered as a video." 
  postDate="March 30, 2025" 
  profileImage="/path/to/profile.jpg" 
  postImage="/path/to/background.jpg" 
/>

Docs

Get started with Remotion by reading the fundamentals page.

Help

We provide help on our Discord server.

Issues

Found an issue with this project? File an issue here.

License

Note that for some entities a company license is needed. Read the terms here.

