Tweet Video Renderer

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>Welcome to the Tweet Video Renderer project! This project leverages Remotion to generate high-quality animated videos from tweet data.

Commands

Install Dependencies

npm i

Start Preview

npm run dev

Render Video

npx remotion render src/index.tsx out.mp4

Upgrade Remotion

npx remotion upgrade

Features

Dynamic rendering of tweet content with smooth animations.

Background blur effect for a stylish look.

Auto-scrolling for long tweets.

Supports profile pictures and post images.

Fully customizable with React and Remotion.


Configuration

You can customize the tweet rendering by modifying the Tweet component in src/tweet.tsx.

Props

Common Issues

TypeError: undefined was passed to staticFile()

Ensure that the postImage value is properly defined before passing it to staticFile(). If postImage is optional, use a fallback:

backgroundImage: postImage ? `url(${staticFile(postImage)})` : "none",

Docs

Get started with Remotion by reading the fundamentals page.

Help

We provide help on our Discord server.

Issues

Found an issue with the Tweet Video Renderer? File an issue here.

License

This project follows the Remotion licensing terms. Read the terms here.

