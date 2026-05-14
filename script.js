document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', (mouseEvent) => {
        mouseEvent.preventDefault();
    });

    document.onkeydown = function(keyEvent) {
        if (keyEvent.keyCode == 123) {
            return false;
        }
        if (keyEvent.ctrlKey && keyEvent.shiftKey && (keyEvent.keyCode == 73 || keyEvent.keyCode == 74 || keyEvent.keyCode == 85)) {
            return false;
        }
    };

    document.querySelector('.fade-button').addEventListener('click', function() {
        this.style.opacity = 0;
        this.disabled = true;
        this.style.cursor = 'default';

        var audio = new Audio('assets/audio.mp3');
        audio.loop = true;
        audio.play();

        var namesList = document.querySelector('.names-list');
        namesList.style.display = 'block';
        setTimeout(function() {
            namesList.classList.add('show');
        }, 100);

        const swingingImage = document.querySelector('.swinging-image');
        swingingImage.style.opacity = 1;

        // fullscreen prank lol
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { 
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { 
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    });
});
