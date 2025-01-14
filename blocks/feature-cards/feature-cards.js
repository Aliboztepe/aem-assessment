export default function decorate(block) {
    [...block.children].forEach((row) => {
        row.classList.add('feature-card-list');

        [...row.children].forEach((row, index) => {
            if (index === 0) {
                const image = document.createElement('img');

                image.setAttribute('src', row.querySelector('picture img').getAttribute('src'));
                image.classList.add('cards-icon');

                row.querySelector('picture').replaceWith(image);
            } else {
                [...row.children].forEach((row, index) => {
                    if (index === 0) {
                        row.classList.add('cards-title');
                    } else {
                        row.classList.add('cards-description');
                    }
                });

                row.classList.add('cards-content');
            }
        });
    });
}