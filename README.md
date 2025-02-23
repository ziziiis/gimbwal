# Valentine's Proposal Website

A cute and interactive Valentine's proposal website with running button feature and background music.

## 🛠 Customization Guide

### Changing Messages
Edit the messages array in `script.js`:
```javascript
const messages = [
    {
        text: "Your first message",
        image: "URL to first image"
    },
    {
        text: "Your second message",
        image: "URL to second image"
    },
    {
        text: "Your third message",
        image: "URL to third image"
    }
];
```

### Changing Initial Content
1. Open `index.html`
2. Change the title text: `<h1 class="title">Your initial question</h1>`
3. Change the initial image: `<img src="your-image-url" alt="cute-gif">`

### Changing Final Message
In `script.js`, find the `yesBtn.addEventListener` and modify:
```javascript
title.innerHTML = "Your final message";
document.querySelector('img').src = "your-final-image-url";
```

### Changing Background Music
1. Open `index.html`
2. Find the `<audio>` tag
3. Replace the `src` attribute with your music URL

## 🎨 Features
- Interactive buttons
- Running "No" button
- Background music
- Falling hearts animation
- Mobile responsive
- iOS & Android compatible

## 🔧 Setup
1. Clone the repository
2. Deploy on Vercel or any static hosting
3. Share with your loved one!

## 👨‍💻 Author
**Nerox**
- Instagram: [@niorxugood](https://instagram.com/niorxugood)
- TikTok: [@niorxugood](https://tiktok.com/@niorxugood)

## 📝 License
Copyright © 2024 Nerox.
All rights reserved.

## 💝 Acknowledgments
Made with love for Valentine's Day confessions 💕
