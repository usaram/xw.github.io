document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    const bloodSounds = ['blood.mp3', 'blood2.mp3'];

    const bloodImages = ['blood.png', 'blood2.png'];

    function createBloodSplat(event) {
        if (event.target.classList.contains('fade-button')) {
            return;
        }

        const bloodSplat = document.createElement('div');
        bloodSplat.classList.add('blood-splat');

        const bloodImage = document.createElement('img');
        bloodImage.src = bloodImages[Math.floor(Math.random() * bloodImages.length)];
        bloodSplat.appendChild(bloodImage);

        const offsetX = -50;
        const offsetY = -40;
        const x = event.clientX + offsetX;
        const y = event.clientY + offsetY;
        bloodSplat.style.left = x + 'px';
        bloodSplat.style.top = y + 'px';
// dont touch this, i aint even know how this shit work but it works (the offset was done manually due to image size)
        body.appendChild(bloodSplat);

        const randomIndex = Math.floor(Math.random() * bloodSounds.length);
        const bloodSound = new Audio(bloodSounds[randomIndex]);
        bloodSound.preload = 'auto';

        if (bloodSound.paused) {
            bloodSound.play();
        } else {
            bloodSound.currentTime = 0;
        }

        bloodSplat.classList.add('active');

        setTimeout(() => {
            bloodSplat.classList.remove('active');
            setTimeout(() => {
                body.removeChild(bloodSplat);
            }, 500);
        }, 2000);
    }

    document.addEventListener('click', createBloodSplat);
});
