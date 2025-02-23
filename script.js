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

    // Smaller range for mobile, larger for PC
    const isMobile = window.innerWidth <= 768;
    const moveRange = isMobile ? 150 : 300;
    
    // Get current position
    const rect = noButton.getBoundingClientRect();
    let currentX = rect.left;
    let currentY = rect.top;
    
    // Add random movement
    let newX = currentX + (Math.random() - 0.5) * moveRange;
    let newY = currentY + (Math.random() - 0.5) * moveRange;
    
    // Keep button in viewport with padding
    const padding = isMobile ? 20 : 50;
    newX = Math.max(padding, Math.min(newX, windowWidth - buttonWidth - padding));
    newY = Math.max(padding, Math.min(newY, windowHeight - buttonHeight - padding));
    
    // Apply new position with smooth transition
    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.3s'} ease`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

// Update the button behavior initialization
function initializeButtonBehavior() {
    noBtn.removeEventListener('touchstart', handleTouch);
    noBtn.removeEventListener('mouseover', runAway);
    
    noBtn.addEventListener('click', (e) => {
        if (noCount < 3) {
            noCount++;
            title.innerHTML = messages[noCount - 1].text;
            document.querySelector('img').src = messages[noCount - 1].image;
        } else {
            e.preventDefault();
            title.innerHTML = "TAPI BOONG HEHEHE";
            if (!noBtn.classList.contains('running')) {
                noBtn.classList.add('running');
                // Add both mouse and touch events
                noBtn.addEventListener('mouseover', runAway);
                noBtn.addEventListener('touchstart', runAway);
            }
            runAway(e);
        }
    });
}

// Add visibility check and repositioning
setInterval(() => {
    if (noCount >= 3 && noBtn.classList.contains('running')) {
        const rect = noBtn.getBoundingClientRect();
        const isOutOfBounds = (
            rect.right < 0 ||
            rect.bottom < 0 || 
            rect.left > window.innerWidth || 
            rect.top > window.innerHeight
        );
        
        if (isOutOfBounds) {
            // Bring button back to visible area
            runAway({ target: noBtn });
        }
    }
}, 500);

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
