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

function runAway(e) {
    const noButton = e.target;
    const yesButton = document.querySelector('.yes-btn');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Padding from screen edges
    const padding = isMobile ? 20 : 50;

    // Safe area calculation
    const safeArea = {
        minX: padding,
        maxX: windowWidth - buttonWidth - padding,
        minY: padding,
        maxY: windowHeight - buttonHeight - padding
    };

    // Get Yes button position to avoid overlap
    const yesRect = yesButton.getBoundingClientRect();
    const avoidArea = {
        left: yesRect.left - buttonWidth - 20,
        right: yesRect.right + 20,
        top: yesRect.top - buttonHeight - 20,
        bottom: yesRect.bottom + 20
    };

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 10;

    do {
        if (isMobile) {
            // Smoother, shorter movements for mobile
            const currentRect = noButton.getBoundingClientRect();
            const moveRange = 150;
            newX = currentRect.left + (Math.random() - 0.5) * moveRange;
            newY = currentRect.top + (Math.random() - 0.5) * moveRange;
        } else {
            // More random movement for desktop
            newX = Math.random() * (safeArea.maxX - safeArea.minX) + safeArea.minX;
            newY = Math.random() * (safeArea.maxY - safeArea.minY) + safeArea.minY;
        }

        // Ensure within screen bounds
        newX = Math.max(safeArea.minX, Math.min(safeArea.maxX, newX));
        newY = Math.max(safeArea.minY, Math.min(safeArea.maxY, newY));

        // Check if position overlaps with Yes button
        const wouldOverlap = (
            newX < avoidArea.right &&
            newX + buttonWidth > avoidArea.left &&
            newY < avoidArea.bottom &&
            newY + buttonHeight > avoidArea.top
        );

        if (!wouldOverlap) break;
        attempts++;
    } while (attempts < maxAttempts);

    // Apply new position with smooth transition
    noButton.style.position = 'fixed';
    noButton.style.transition = isMobile ? 'all 0.8s ease' : 'all 0.4s ease';
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
    } else {
        title.innerHTML = "TAPI BOONG HEHEHE";
        if (!noBtn.classList.contains('running')) {
            noBtn.classList.add('running');
            runAway({ target: noBtn });
        }
    }
});

// Handle both mouse and touch events
noBtn.addEventListener('mouseover', (e) => {
    if (noCount >= 3) runAway(e);
});

noBtn.addEventListener('touchstart', (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        runAway(e);
    }
}, { passive: false });

// Update the visibility check interval
setInterval(() => {
    if (noCount >= 3 && noBtn.classList.contains('running')) {
        const rect = noBtn.getBoundingClientRect();
        const isOutOfBounds = (
            rect.right <= 0 ||
            rect.left >= window.innerWidth ||
            rect.bottom <= 0 ||
            rect.top >= window.innerHeight
        );
        
        if (isOutOfBounds) {
            runAway({ target: noBtn });
        }
    }
}, 200);
