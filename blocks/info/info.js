export default function decorate(block) {
    block.classList.add('slide-in-left');

    block.children[0].querySelectorAll('div p').forEach((row, index) => {
        if (index === 0) {
            row.classList.add('info-title')
        } else {
            row.classList.add('info-description');
        }
    });
}