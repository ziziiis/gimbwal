const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
let isMusicPlaying = true;

musicControl.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicControl.classList.remove('playing');
    } else {
        bgMusic.play();
        musicControl.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
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
        title.innerHTML = messages[noCount].text;
        document.querySelector('img').src = messages[noCount].image;
    } else if (noCount === 3) {
        title.innerHTML = "TAPI BOONG HEHEHE";
        noCount++;
        noBtn.classList.add('running');
        noBtn.addEventListener('mouseover', runAway);
    }
});

function runAway(e) {
    const noButton = e.target;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonRect = noButton.getBoundingClientRect();

    // Smaller movement range for mobile
    const moveRange = window.innerWidth < 768 ? 100 : 200;
    
    // Current position
    const currentX = buttonRect.left;
    const currentY = buttonRect.top;
    
    // Calculate new position with limited range
    let newX = currentX + (Math.random() - 0.5) * moveRange;
    let newY = currentY + (Math.random() - 0.5) * moveRange;
    
    // Ensure button stays in viewport
    newX = Math.max(10, Math.min(newX, windowWidth - buttonRect.width - 10));
    newY = Math.max(10, Math.min(newY, windowHeight - buttonRect.height - 10));
    
    noButton.style.position = 'fixed';
    noButton.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
    noButton.style.left = '0';
    noButton.style.top = '0';
}

// Replace existing touch event listeners with these
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    runAway(e);
}, { passive: false });

noBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
}, { passive: false });

// Add this new function for touch movement
function handleTouch(e) {
    if (noCount >= 3) {
        runAway(e);
    }
}

// Add these new event listeners
noBtn.addEventListener('touchstart', handleTouch);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });
