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
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    let newX = Math.random() * (windowWidth - buttonWidth);
    let newY = Math.random() * (windowHeight - buttonHeight);

    noButton.style.position = 'fixed';
    noButton.style.transition = 'all 0.3s ease';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = "HORE!! i knew you would say yes!";
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

noBtn.addEventListener('mouseover', (e) => {
    if (noCount >= 3) runAway(e);
});
