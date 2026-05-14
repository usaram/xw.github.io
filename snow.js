function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '*';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(snowflake);

    
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

document.querySelector('.fade-button').addEventListener('click', function() {
    for (let i = 0; i < 50; i++) {
        
        setTimeout(createSnowflake, i * 100);
    }
});
