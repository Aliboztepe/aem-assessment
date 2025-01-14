export default function decorate(block) {
    [...block.children].forEach((row) => {
        row.classList.add('event');

        row.querySelectorAll('p').forEach((column, index) => {
            if (!index) {
                column.classList.add('event-date');
            } else if (index === 1) {
                column.classList.add('event-description');
            } else if (index === 2) {
                column.classList.add('event-speaker-name');
            } else {
                if (column.textContent.toLowerCase().includes('register') || 
                    column.textContent.toLowerCase().includes('add to calendar')) {
                        const registerButton = document.createElement('button');
                        const addToCalendarButton = document.createElement('button');

                        registerButton.classList.add('button', 'register');
                        registerButton.textContent = 'REGISTER';

                        addToCalendarButton.classList.add('button', 'add-to-calendar');
                        addToCalendarButton.textContent = 'ADD TO CALENDAR';

                        column.after(addToCalendarButton);
                        column.replaceWith(registerButton);
                } else {
                    const moreDetailsButton = document.createElement('button');

                    moreDetailsButton.classList.add('button', 'more-details');
                    moreDetailsButton.textContent = 'MORE DETAILS COMING SOON';

                    column.replaceWith(moreDetailsButton);
                }
            }
        });
    });

    createSliderFuncionality();
}

const createSliderFuncionality = () => {
    const slider = document.querySelector('.events.block');
    const events = document.querySelectorAll('.event');
    const wrapper = document.querySelector('.events-wrapper');

    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');

    previousButton.className = 'slider-button prev';
    nextButton.className = 'slider-button next';
    previousButton.innerHTML = '&lt;';
    nextButton.innerHTML = '&gt;';

    wrapper.append(previousButton, nextButton);

    let currentIndex = 0;
    const eventStyles = window.getComputedStyle(events[0]);
    const eventWidth = parseFloat(eventStyles.getPropertyValue('width'));
    const gap = parseFloat(window.getComputedStyle(slider).getPropertyValue('gap'));

    const cardWidth = eventWidth + gap;
    const totalCards = events.length;

    const calculateVisibleCards = () => Math.floor(wrapper.offsetWidth / cardWidth);
    const calculateMaxIndex = () => totalCards - calculateVisibleCards();

    const updateSlider = () => {
        slider.style.transform = `translateX(-${ currentIndex * cardWidth }px)`;
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const maxIndex = calculateMaxIndex();

            currentIndex = maxIndex;
        }

        updateSlider();
    };

    const goToNext = () => {
        const maxIndex = calculateMaxIndex();

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateSlider();
    };

    previousButton.addEventListener('click', goToPrevious);
    nextButton.addEventListener('click', goToNext);

    window.addEventListener('resize', () => {
        currentIndex = 0;

        updateSlider();
    });

    updateSlider();
};