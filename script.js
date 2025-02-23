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
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Keep button within 80% of screen bounds
    const safeWidth = windowWidth * 0.8;
    const safeHeight = windowHeight * 0.8;
    
    // Calculate new position
    let newX = Math.random() * (safeWidth - buttonWidth);
    let newY = Math.random() * (safeHeight - buttonHeight);
    
    // Add minimum distances from edges
    newX = Math.max(20, Math.min(newX, windowWidth - buttonWidth - 20));
    newY = Math.max(20, Math.min(newY, windowHeight - buttonHeight - 20));
    
    // Apply new position
    noButton.style.position = 'fixed';
    noButton.style.transition = 'all 0.5s ease';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    
    // Ensure button stays visible
    noButton.style.opacity = '1';
    noButton.style.visibility = 'visible';
    noButton.style.display = 'block';
}

// Remove previous touch event listeners and replace with this new implementation
function initializeButtonBehavior() {
    noBtn.removeEventListener('touchstart', handleTouch);
    noBtn.removeEventListener('mouseover', runAway);
    
    noBtn.addEventListener('click', (e) => {
        if (noCount < 3) {
            e.preventDefault();
            noCount++;
            title.innerHTML = messages[noCount - 1].text;
            document.querySelector('img').src = messages[noCount - 1].image;
        } else {
            e.preventDefault();
            title.innerHTML = "TAPI BOONG HEHEHE";
            if (!noBtn.classList.contains('running')) {
                noBtn.classList.add('running');
                runAway(e);
            }
        }
    });

    // Handle touch events for mobile
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (noCount >= 3) {
            runAway(e);
        }
    }, { passive: false });
}

// Initialize button behavior
initializeButtonBehavior();

// Remove previous touch event listeners
document.removeEventListener('touchmove', function(e) {
    e.preventDefault();
});

// Update button visibility check
setInterval(() => {
    if (noCount >= 3 && noBtn.classList.contains('running')) {
        const rect = noBtn.getBoundingClientRect();
        if (rect.right < 0 || rect.bottom < 0 || 
            rect.left > window.innerWidth || 
            rect.top > window.innerHeight) {
            // Reset position if button goes outside viewport
            runAway({ target: noBtn });
        }
    }
}, 1000);
