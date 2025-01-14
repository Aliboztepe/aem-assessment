export default function decorate(block) {
    [...block.children].forEach((row, index) => {
        if (index === 0) {
            const pictureElement = [...row.children][0];
            const imgElement = pictureElement.querySelector('img');
            const imgSrc = imgElement.getAttribute('src');

            const heroBanner = document.querySelector('.hero-banner')

            heroBanner.style.backgroundImage = `url('${imgSrc}')`;
        } else {
            row.classList.add('hero-banner-content');
        }
    });

    document.querySelectorAll('.hero-banner-content div').forEach((node, index) =>
        node.classList.add(index === 0 ? 'content-text' : 'content-buttons')
    );

    document.querySelectorAll('.content-text p').forEach((node, index) => {
        if (index === 0) {
            node.classList.add('hero-banner-title');
        } else if (index === 1) {
            node.classList.add('hero-banner-subtitle');
        } else if (index === 2) {
            node.classList.add('hero-banner-description');
        } else {
            node.classList.add('hero-banner-date');
        }
    });

    document.querySelectorAll('.content-buttons p').forEach((node, index) => {
        const image = document.createElement('img');

        if (index === 0) {
            node.replaceWith(image);
            
            image.setAttribute('src', node.querySelector('picture img').getAttribute('src'))
        } else {
            node.replaceWith(image);
        
            image.setAttribute('src', node.querySelector('picture img').getAttribute('src'))
        }
    });

    createCountdown();
}

export const createCountdown = () => {
    const countdownContainer = document.createElement('div');

    countdownContainer.classList.add('countdown');
    document.querySelector('.hero-banner-date').after(countdownContainer);

    const timeValues = ['Days', 'Hours', 'Minutes', 'Seconds'];
    const timeElements = {};

    timeValues.forEach(value => {
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time-box');

        const timeValue = document.createElement('span');
        timeValue.classList.add('time-value');
        timeValue.textContent = '00';
        timeBlock.appendChild(timeValue);

        const timeLabel = document.createElement('span');
        timeLabel.classList.add('time-label');
        timeLabel.textContent = value;
        timeBlock.appendChild(timeLabel);

        countdownContainer.appendChild(timeBlock);

        timeElements[value] = timeValue;
    });

    const targetDate = new Date('January 20, 2025 24:00:00');

    const updateCountdown = () => {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);

            Object.keys(timeElements).forEach(value => (timeElements[value].textContent = '00'));

            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        timeElements.Days.textContent = String(days).padStart(2, '0');
        timeElements.Hours.textContent = String(hours).padStart(2, '0');
        timeElements.Minutes.textContent = String(minutes).padStart(2, '0');
        timeElements.Seconds.textContent = String(seconds).padStart(2, '0');
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    updateCountdown();
}