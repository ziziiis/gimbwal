const bgMusic = document.getElementById('bgMusic');

// Auto-play music when page loads with lower volume
window.addEventListener('load', () => {
    bgMusic.volume = 0.3;  // Set volume to 30%
    bgMusic.play().catch(console.log);
});

const messages = [
    {
        text: "plss mau dong",
        image: "https://i.pinimg.com/736x/1e/7c/6f/1e7c6ff7a0c26f7eaefbce683656193d.jpg"
    },
    {
        text: "pls klik yg kiri",
        image: "https://i.pinimg.com/736x/90/73/a9/9073a9359bff531cd830ae7384752934.jpg"
    },
    {
        text: "terakhir, kalo \"no\" yauda deh",
        image: "https://i.pinimg.com/736x/a6/43/f5/a643f5a40db387585b56bc767b66fddb.jpg"
    }
];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(() => createHeart(), 300);

const title = document.querySelector('.title');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
let noCount = 0;

function runAway(e) {
    const noButton = e.target;
    const yesButton = document.querySelector('.yes-btn');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Get current button position
    const currentRect = noButton.getBoundingClientRect();
    
    // Calculate move distance based on device
    const moveDistance = isMobile ? 100 : 200;
    
    // Calculate direction away from cursor/touch
    let newX = currentRect.left;
    let newY = currentRect.top;
    
    if (e.type === 'mouseover' || e.type === 'mouseenter') {
        newX += e.clientX > currentRect.left ? -moveDistance : moveDistance;
        newY += e.clientY > currentRect.top ? -moveDistance : moveDistance;
    } else {
        // Random movement for touch/click
        newX += (Math.random() - 0.5) * moveDistance * 2;
        newY += (Math.random() - 0.5) * moveDistance * 2;
    }
    
    // Keep button within viewport bounds
    const padding = isMobile ? 20 : 50;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));
    
    // Ensure we're not too close to the yes button
    const yesRect = yesButton.getBoundingClientRect();
    const minDistance = isMobile ? 80 : 120;
    
    if (Math.abs(newX - yesRect.left) < minDistance && Math.abs(newY - yesRect.top) < minDistance) {
        newX = newX < yesRect.left ? newX - minDistance : newX + minDistance;
        newY = newY < yesRect.top ? newY - minDistance : newY + minDistance;
    }

    // Apply new position
    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.5s' : '0.3s'} ease-out`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = "HORE!! i knew you would say vqsghvwegdsbjs";
    document.querySelector('img').src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/good-night-kiss-kiss.gif";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    if (!isMusicPlaying) {
        bgMusic.play();
        musicControl.classList.add('playing');
        isMusicPlaying = true;
    }
});

noBtn.addEventListener('click', () => {
    if (noCount < 3) {
        noCount++;
        title.innerHTML = messages[noCount - 1].text;
        document.querySelector('img').src = messages[noCount - 1].image;
    } else if (noCount === 3) {
        title.innerHTML = "TAPI BOONG HEHEHE";
        noCount++;
        noBtn.classList.add('running');
        runAway({ target: noBtn, type: 'click' });
    } else {
        runAway({ target: noBtn, type: 'click' });
    }
});

// Update event listeners for button movement
noBtn.addEventListener('mouseover', (e) => {
    if (noCount >= 3) runAway(e);
});

noBtn.addEventListener('touchstart', (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        runAway({ target: noBtn, type: 'click', clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }
}, { passive: false });
