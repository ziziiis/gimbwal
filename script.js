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
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Ensure button is above container
    if (noButton.style.zIndex !== '9999') {
        document.body.appendChild(noButton);
        noButton.style.position = 'fixed';
        noButton.style.zIndex = '9999';
    }

    // Get current position or set initial if not set
    const currentX = parseInt(noButton.style.left) || e.clientX || windowWidth / 2;
    const currentY = parseInt(noButton.style.top) || e.clientY || windowHeight / 2;

    // Calculate smooth evasion
    const moveRange = isMobile ? 150 : 250;
    const mouseX = e.clientX || e.touches?.[0]?.clientX || currentX;
    const mouseY = e.clientY || e.touches?.[0]?.clientY || currentY;
    
    // Calculate direction away from cursor/touch
    const deltaX = currentX - mouseX;
    const deltaY = currentY - mouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Smoother movement with normalized direction
    let newX = currentX;
    let newY = currentY;
    
    if (distance < moveRange) {
        const scale = moveRange / (distance || 1);
        newX = currentX + deltaX * scale;
        newY = currentY + deltaY * scale;
    } else {
        // Random movement if not near cursor
        newX = currentX + (Math.random() - 0.5) * moveRange;
        newY = currentY + (Math.random() - 0.5) * moveRange;
    }
    
    // Keep button within viewport bounds
    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));
    
    // Avoid container area
    const containerRect = container.getBoundingClientRect();
    if (newX > containerRect.left - buttonWidth && newX < containerRect.right &&
        newY > containerRect.top - buttonHeight && newY < containerRect.bottom) {
        // Move to nearest edge of container
        if (Math.abs(newX - containerRect.left) < Math.abs(newX - containerRect.right)) {
            newX = containerRect.left - buttonWidth - padding;
        } else {
            newX = containerRect.right + padding;
        }
    }

    // Apply smooth movement
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.5s'} cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = "HORE!! i knew you would say vqsghvwegdsbjs";
    document.querySelector('img').src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/good-night-kiss-kiss.gif";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    bgMusic.play();
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
        }
        // Always run away on click after 3 clicks
        runAway({ 
            target: noBtn, 
            type: 'click',
            clientX: event.clientX || event.touches?.[0]?.clientX,
            clientY: event.clientY || event.touches?.[0]?.clientY
        });
    }
});

// Make button run away on hover/touch
const handleButtonDodge = (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        e.stopPropagation();
        runAway(e);
    }
};

noBtn.addEventListener('mouseover', handleButtonDodge);
noBtn.addEventListener('touchstart', handleButtonDodge, { passive: false });
noBtn.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
