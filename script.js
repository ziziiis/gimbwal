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

    // Fixed movement range for better control
    const moveRange = isMobile ? 80 : 200;
    
    // Get current position
    const currentX = parseInt(noButton.style.left) || noButton.getBoundingClientRect().left;
    const currentY = parseInt(noButton.style.top) || noButton.getBoundingClientRect().top;
    
    // Calculate new position with smaller movements
    let newX = currentX + (Math.random() - 0.5) * moveRange;
    let newY = currentY + (Math.random() - 0.5) * moveRange;
    
    // Ensure button stays within visible area
    const padding = isMobile ? 10 : 20;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));
    
    // Get Yes button safe zone
    const yesRect = yesButton.getBoundingClientRect();
    const safeDistance = isMobile ? 60 : 100;
    
    // Avoid Yes button area
    if (Math.abs(newX - yesRect.left) < safeDistance && Math.abs(newY - yesRect.top) < safeDistance) {
        newX = newX < yesRect.left ? newX - safeDistance : newX + safeDistance;
        newY = newY < yesRect.top ? newY - safeDistance : newY + safeDistance;
    }
    
    // Apply position with smoother transition
    noButton.style.position = 'fixed';
    noButton.style.transition = isMobile ? 'all 0.5s ease-out' : 'all 0.3s ease-out';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
    
    // Ensure button stays visible
    noButton.style.opacity = '1';
    noButton.style.visibility = 'visible';
    noButton.style.display = 'block';
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
    } else {
        title.innerHTML = "TAPI BOONG HEHEHE";
        if (!noBtn.classList.contains('running')) {
            noBtn.classList.add('running');
            runAway({ target: noBtn });
        } else {
            runAway({ target: noBtn });
        }
    }
});

// Simplify event listeners
noBtn.addEventListener('mouseover', (e) => {
    if (noCount >= 3) runAway(e);
});

noBtn.addEventListener('touchstart', (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        runAway(e);
    }
}, { passive: false });
