// JavaScript for custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// JavaScript to toggle hidden events
const moreEvents = document.getElementById('more-events');
const hiddenEvents = document.getElementById('hidden-events');

moreEvents.addEventListener('click', () => {
    hiddenEvents.classList.toggle('show');
    moreEvents.style.transform = hiddenEvents.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
});

// JavaScript for trailing stars
const trailingStars = document.getElementById('trailing-stars');

function createStar() {
    console.log('Creating star');
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = Math.random() * 5 + 5 + 's'; // Slower stars
    star.style.opacity = Math.random();
    trailingStars.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 10000); // Remove after 10 seconds
}

function createComet() {
    console.log('Creating comet');
    const comet = document.createElement('div');
    comet.classList.add('comet');
    comet.style.left = Math.random() * 100 + 'vw';
    comet.style.top = Math.random() * 100 + 'vh';
    comet.style.animationDuration = Math.random() * 3 + 2 + 's'; // Faster comets
    trailingStars.appendChild(comet);

    setTimeout(() => {
        comet.remove();
    }, 5000); // Remove after 5 seconds
}

setInterval(createStar, 500); // Create stars every 500ms
setInterval(createComet, 3000); // Create comets every 3 seconds

// JavaScript for countdown timer
const countdown = () => {
    const eventDate = new Date('February 5, 2025 09:00:00').getTime(); // Event date and time
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    // Time calculations
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
    document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;

    // If the event has passed
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<span>Event has started!</span>';
    }
};

// Run the countdown every second
const countdownInterval = setInterval(countdown, 1000);

