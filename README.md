# Native IG

<div align="center">

<div style="margin-bottom: 20px">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/195px-Instagram_logo_2022.svg.png" alt="Instagram Logo" width="100" height="100"/>
</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Upstash](https://img.shields.io/badge/Upstash-Redis-red)](https://upstash.com/)

</div>

<p align="center">
  <img src="https://img.shields.io/badge/100%25-Free-brightgreen" alt="Free" />
  <img src="https://img.shields.io/badge/No%20Login-Required-blue" alt="No Login Required" />
  <img src="https://img.shields.io/badge/High-Quality-orange" alt="High Quality" />
</p>

A modern, lightning-fast web application for downloading Instagram Reels with ease and simplicity. No registration required, just paste and download! 🚀

## ✨ Features

- 🎯 **Simple & Intuitive**: Clean interface for the best user experience
- 🚀 **Fast & Free**: Download Instagram reels quickly without any cost
- 👤 **No Registration**: No account needed, just paste the link and download
- 📹 **High Quality**: Get reels in their original quality
- 🔒 **Secure**: Your data is never stored or shared
- 🌐 **API Available**: Integrate with your own applications

## 📝 Description

Native IG is your go-to solution for downloading Instagram videos hassle-free. Simply paste the URL of any public Instagram post and get the video file in MP4 format. We also provide a robust API that you can integrate into your own applications, returning JSON responses with video URLs and metadata.

> **Note**: Instagram stories are currently not supported.

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

**1.** Clone the repository:
```bash
git clone https://github.com/code3-dev/native-ig.git
```

**2.** Install dependencies:
```bash
cd native-ig
npm install
```

**3.** Run the application:
```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

## 🔌 API Reference

### Endpoint: `/api/video`

#### Request
\`GET /api/video?postUrl={POST_URL}\`

Parameters:
- `postUrl` : Instagram Post or Reel link **(required)**

#### Example Request
```bash
curl -i "http://localhost:3000/api/video?postUrl=https://www.instagram.com/p/xxxxxx"
```

#### Example Response
```json
{
  "status": "success",
  "data": {
    "filename": "native-ig-1712666263.mp4",
    "width": "800",
    "height": "800",
    "videoUrl": "https://scontent.cdninstagram.com/..."
  }
}
```

## ⚡ Rate Limiting with Upstash

To protect our service and ensure optimal performance, we've implemented rate limiting using Upstash Redis. Here's how to set it up:

1. Create an account on [upstash.com](https://upstash.com/)
2. Create a new Redis database
3. Navigate to the REST API section
4. Copy the provided environment variables
5. Create `.env.local` in the project root
6. Configure your environment:

```env
USE_UPSTASH="true"
UPSTASH_REDIS_REST_URL="YOUR-UPSTASH-URL"
UPSTASH_REDIS_REST_TOKEN="YOUR-UPSTASH-TOKEN"
```

> Rate limit configurations can be found in `src/features/ratelimit/constants.ts`
> IP-based rate limiting can be customized in `src/middleware.ts`

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact via email: [h3dev.pira@gmail.com](mailto:h3dev.pira@gmail.com)
- Reach out on Telegram: [@h3dev](https://t.me/h3dev)
- Follow us on Instagram: [@h3dev.pira](https://instagram.com/h3dev.pira)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Hossein Pira

[![Follow on GitHub](https://img.shields.io/github/followers/code3-dev?style=social)](https://github.com/code3-dev)
[![Follow on Instagram](https://img.shields.io/badge/Follow%20on-Instagram-E4405F.svg)](https://instagram.com/h3dev.pira)

</div>
