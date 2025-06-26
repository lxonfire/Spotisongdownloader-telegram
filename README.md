# 🎶 Spotify Downloader Bot

A powerful Telegram bot that allows users to search and download songs from Spotify directly to their chat. Built with Node.js and the Telegraf framework.

## ✨ Features

- 🔍 **Search Songs**: Search for any song directly within Telegram
- 📥 **Download from URL**: Download songs using Spotify track URLs
- 🎵 **High Quality Audio**: Get songs in MP3 format with metadata
- 🖼️ **Album Art**: Includes album artwork and track information
- 📱 **Interactive Interface**: User-friendly inline keyboard navigation
- ⚡ **Fast Processing**: Quick search and download capabilities

## 🚀 Quick Deploy

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lxonfire/Spotisongdownloader-telegram)

### Deploy to Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lxonfire/Spotisongdownloader-telegram)

### Deploy to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/lxonfire/Spotisongdownloader-telegram)

### Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/lxonfire/Spotisongdownloader-telegram)

## 📋 Prerequisites

- Node.js (v14 or higher)
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Basic knowledge of environment variables

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/lxonfire/Spotisongdownloader-telegram.git
   cd Spotisongdownloader-telegram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   bot=YOUR_TELEGRAM_BOT_TOKEN
   PORT=3000
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

### Production Deployment

#### Environment Variables Required:
- `bot`: Your Telegram bot token from BotFather
- `PORT`: Port number (default: 3000)

## 📱 Bot Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/start` | Initialize the bot and see welcome message | `/start` |
| `/help` | Show help and usage instructions | `/help` |
| `/search <query>` | Search for songs by name/artist | `/search daku` |
| `/download <spotify_url>` | Download song directly from Spotify URL | `/download https://open.spotify.com/track/...` |

## 🎯 Usage Examples

### Search and Download
```
/search shape of you ed sheeran
```
The bot will show search results with navigation buttons to browse and select your desired track.

### Direct Download
```
/download https://open.spotify.com/track/71XxylHoSigwo354LSy5p6?si=fa0b9772252b4ca0
```
The bot will process and send the audio file directly.

## 🏗️ Project Structure

```
Spotisongdownloader-telegram/
├── 📄 README.md
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 index.js (main bot file)
```

## 🔧 Dependencies

- **telegraf**: Telegram Bot API framework
- **express**: Web framework for health checks
- **axios**: HTTP client for API requests
- **form-data**: Multipart form data handling
- **@nechlophomeriaa/spotifydl**: Spotify search functionality
- **dotenv**: Environment variable management

## 🚀 Deployment Guides

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Render Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy!

### Railway Deployment

1. Connect your GitHub to Railway
2. Add environment variables
3. Deploy automatically on push

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 🐛 Issues & Support

If you encounter any issues:

1. Check the [Issues](https://github.com/lxonfire/Spotisongdownloader-telegram/issues) page
2. Create a new issue with detailed description
3. Include error logs and steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits & Acknowledgments

- **Developer**: [@Abdul_Kioum](https://t.me/Abdul_Kioum) - Original creator and maintainer
- **Spotify API**: For music metadata
- **Telegraf**: Telegram Bot framework
- **Community**: Thanks to all contributors and users

## ⚠️ Disclaimer

This bot is for educational purposes only. Please respect Spotify's Terms of Service and copyright laws. The developers are not responsible for any misuse of this software.

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/lxonfire/Spotisongdownloader-telegram?style=social)
![GitHub forks](https://img.shields.io/github/forks/lxonfire/Spotisongdownloader-telegram?style=social)
![GitHub issues](https://img.shields.io/github/issues/lxonfire/Spotisongdownloader-telegram)
![GitHub license](https://img.shields.io/github/license/lxonfire/Spotisongdownloader-telegram)

## 🔗 Links

- [Repository](https://github.com/lxonfire/Spotisongdownloader-telegram)
- [Developer](https://t.me/Abdul_Kioum)
- [Issues](https://github.com/lxonfire/Spotisongdownloader-telegram/issues)  
- [Wiki](https://github.com/lxonfire/Spotisongdownloader-telegram/wiki)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://t.me/Abdul_Kioum">Abdul Kioum</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
