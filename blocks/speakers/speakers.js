export default function decorate(block) {
    const speakerContainerElement = block.closest('.speakers-container');
    const defaultContentWrapper = speakerContainerElement.querySelector('.default-content-wrapper');

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    defaultContentWrapper.appendChild(buttons);

    const paragraphs = [...defaultContentWrapper.querySelectorAll('p')];
    paragraphs.forEach((paragraph, index) => {
        if (index === 0) {
            paragraph.classList.add('speakers-title');
        } else {
            const button = document.createElement('button');
            button.classList.add('button', index === 1 ? 'date-primary' : 'date-secondary');
            button.textContent = paragraph.textContent;

            paragraph.replaceWith(button);
            buttons.appendChild(button);
        }
    });

    [...block.children].forEach((row) => {
        [row].forEach((speaker) => {
            speaker.classList.add('speaker');

            [...speaker.children].forEach((paragraph, index) => {
                if (!index) {
                    const image = document.createElement('img');
    
                    image.setAttribute('src', paragraph.querySelector('picture img').getAttribute('src'));
                    image.classList.add('speaker-photo');
    
                    paragraph.querySelector('picture').replaceWith(image);
                } else if (index === 1) {
                    const seeBioButton = document.createElement('button');

                    seeBioButton.textContent = 'See Bio';
                    seeBioButton.classList.add('see-bio-button');

                    paragraph.appendChild(seeBioButton);
                    paragraph.classList.add('speaker-content');

                    paragraph.querySelectorAll('p').forEach((subParagraph, index) => {
                        if (!index) {
                            subParagraph.classList.add('speaker-name');
                        } else {
                            subParagraph.classList.add('speaker-info');
                        }
                    });
                } else {
                    const button = document.createElement('button');
                    const overlay = document.createElement('div');

                    button.classList.add('modal-close');
                    button.textContent = 'x';

                    overlay.classList.add('modal-overlay');

                    paragraph.prepend(button);
                    paragraph.after(overlay);
                    paragraph.classList.add('speaker-modal');

                    [...paragraph.children].forEach((subParagraph, index) => {
                        if (index === 1) {
                            subParagraph.classList.add('speaker-affiliation');
                        } else if (index === 2) {
                            subParagraph.classList.add('speaker-bio-info');
                        }
                    });

                    const image = document.createElement('img');
                    const nameSurname = document.createElement('p');

                    image.classList.add('speaker-modal-photo');
                    nameSurname.classList.add('speaker-modal-name');

                    paragraph.prepend(image);
                    image.after(nameSurname);
                }
            }); 
        });
    });

    seeBioModalFuncionality();
    speakersButtonToggle();
}

export const seeBioModalFuncionality = () => {
    const seeBioButtons = document.querySelectorAll('.see-bio-button');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    seeBioButtons.forEach((seeBioButton) => {
        seeBioButton.addEventListener('click', (event) => {
            const speakerContainer = event.target.closest('.speaker');

            if (!speakerContainer) return;

            const speakerPhotoLink = speakerContainer.querySelector('.speaker-photo').getAttribute('src');
            const speakerName = speakerContainer.querySelector('.speaker-name').textContent;
            const speakerModal = speakerContainer.querySelector('.speaker-modal');
            const speakerModalOverlay = speakerContainer.querySelector('.modal-overlay');
            const speakerModalPhoto = speakerModal.querySelector('.speaker-modal-photo');
            const speakerModalName = speakerModal.querySelector('.speaker-modal-name');

            speakerModalPhoto.setAttribute('src', speakerPhotoLink);
            speakerModalName.textContent = speakerName;
            speakerModal.style.display = 'block';
            speakerModalOverlay.style.display = 'block';
        });
    });

    modalCloseButtons.forEach((modalCloseButton) => {
        modalCloseButton.addEventListener('click', (event) => {
            const currentTarget = event.target;
            const speakerContainer = currentTarget.closest('.speaker-modal');
            const speakerModalOverlay = currentTarget.closest('.speaker').querySelector('.modal-overlay');

            if (!speakerContainer) return;

            speakerContainer.style.display = 'none';
            speakerModalOverlay.style.display = 'none';
        });
    });
};

export const speakersButtonToggle = () => {
    const primaryButton = document.querySelector('.speakers-container .date-primary');
    const secondaryButton = document.querySelector('.speakers-container .date-secondary');

    if (!primaryButton || !secondaryButton) return;

    const toggle = (activeButton, passiveButton) => {
        activeButton.classList.add('active');
        activeButton.classList.remove('passive');
        passiveButton.classList.remove('active');
        passiveButton.classList.add('passive');
    };

    primaryButton.addEventListener('click', () => toggle(primaryButton, secondaryButton));
    secondaryButton.addEventListener('click', () => toggle(secondaryButton, primaryButton));
};