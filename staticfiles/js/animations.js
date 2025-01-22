document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.querySelector('.cursor');

  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  // Toggle Hidden Events
  const moreEvents = document.getElementById('more-events');
  const hiddenEvents = document.getElementById('hidden-events');

  if (moreEvents && hiddenEvents) {
    moreEvents.addEventListener('click', () => {
      hiddenEvents.classList.toggle('show');
      moreEvents.style.transform = hiddenEvents.classList.contains('show')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
    });
  }

  // Trailing Stars Animation
  const createStar = () => {
    const trailingStars = document.getElementById('trailing-stars');
    if (trailingStars) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDuration = Math.random() * 5 + 5 + 's';
      star.style.opacity = Math.random();
      trailingStars.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 10000);
    }
  };

  const createComet = () => {
    const trailingStars = document.getElementById('trailing-stars');
    if (trailingStars) {
      const comet = document.createElement('div');
      comet.classList.add('comet');
      comet.style.left = Math.random() * 100 + 'vw';
      comet.style.top = Math.random() * 100 + 'vh';
      comet.style.animationDuration = Math.random() * 3 + 2 + 's';
      trailingStars.appendChild(comet);

      setTimeout(() => {
        comet.remove();
      }, 5000);
    }
  };

  // Start star and comet animations
  setInterval(createStar, 500);
  setInterval(createComet, 3000);

  // Countdown Timer
  const countdown = () => {
    const eventDate = new Date('February 5, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    if (daysElem && hoursElem && minutesElem && secondsElem) {
      daysElem.innerText = days < 10 ? `0${days}` : days;
      hoursElem.innerText = hours < 10 ? `0${hours}` : hours;
      minutesElem.innerText = minutes < 10 ? `0${minutes}` : minutes;
      secondsElem.innerText = seconds < 10 ? `0${seconds}` : seconds;
    }

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      const countdownElem = document.getElementById('countdown');
      if (countdownElem) {
        countdownElem.innerHTML = '<span>Event has started!</span>';
      }
    }
  };

  let countdownInterval = setInterval(countdown, 1000);
});