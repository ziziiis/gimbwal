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

    // Get current position
    const rect = noButton.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;
    
    // Calculate cursor/touch position
    const pointer = {
        x: e.clientX || e.touches?.[0]?.clientX || currentX,
        y: e.clientY || e.touches?.[0]?.clientY || currentY
    };

    // Calculate distance from pointer to button
    const deltaX = currentX - pointer.x;
    const deltaY = currentY - pointer.y;
    const angle = Math.atan2(deltaY, deltaX);

    // Longer movement range but ensure it stays in view
    const moveDistance = isMobile ? 
        Math.min(windowWidth, windowHeight) * 0.4 : // 40% of screen size for mobile
        Math.min(windowWidth, windowHeight) * 0.6;  // 60% of screen size for desktop

    // Calculate new position with angle-based movement
    let newX = currentX + Math.cos(angle) * moveDistance;
    let newY = currentY + Math.sin(angle) * moveDistance;

    // Add some randomness to make it less predictable
    newX += (Math.random() - 0.5) * 50;
    newY += (Math.random() - 0.5) * 50;

    // Keep button within viewport with padding
    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));

    // Avoid container area
    const containerRect = container.getBoundingClientRect();
    const containerAvoidance = isMobile ? 60 : 100;
    
    if (newX > containerRect.left - containerAvoidance && 
        newX < containerRect.right + containerAvoidance &&
        newY > containerRect.top - containerAvoidance && 
        newY < containerRect.bottom + containerAvoidance) {
        // Move to the furthest corner from current position
        const corners = [
            { x: padding, y: padding }, // top-left
            { x: padding, y: windowHeight - buttonHeight - padding }, // bottom-left
            { x: windowWidth - buttonWidth - padding, y: padding }, // top-right
            { x: windowWidth - buttonWidth - padding, y: windowHeight - buttonHeight - padding } // bottom-right
        ];

        // Find the furthest corner from both container and current position
        let maxDistance = 0;
        corners.forEach(corner => {
            const distanceFromContainer = Math.hypot(
                corner.x - containerRect.left,
                corner.y - containerRect.top
            );
            const distanceFromCurrent = Math.hypot(
                corner.x - currentX,
                corner.y - currentY
            );
            const totalDistance = distanceFromContainer + distanceFromCurrent;
            if (totalDistance > maxDistance) {
                maxDistance = totalDistance;
                newX = corner.x;
                newY = corner.y;
            }
        });
    }

    // Move the button with smooth animation
    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.6s'} cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
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
