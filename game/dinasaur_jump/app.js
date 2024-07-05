document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    const desert = document.getElementById('desert');
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;

    function control(e) {
        if (e.code === 'Space') {
            if (!isJumping) {
                jump();
            }
        }
    }

    let postion = 0;
    function jump() {
        isJumping = true;
        let count = 0;
        let timerId = setInterval(function () {
            // move down
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    postion -= 5;
                    count--;
                    postion *= gravity;
                    dino.style.bottom = postion + 'px';
                }, 20);
            }

            // move up
            postion += 30;
            count++;
            postion *= gravity;
            dino.style.bottom = postion + 'px';
        }, 20);
    }

    function generrateObstacle() {
        if (!isGameOver) {
            let randomTime = Math.random() * 4000;
            let obstaclePosition = window.outerWidth;
            const obstatcle = document.createElement('div');
            obstatcle.classList.add('obstacle');
            grid.appendChild(obstatcle);
            obstatcle.style.left = obstaclePosition + 'px';

            let timerId = setInterval(function () {
                if(obstaclePosition > 0 && obstaclePosition < 60 && postion < 60) {
                    clearInterval(timerId);
                    alert.innerHTML = 'Game Over';
                    desert.style.animation = 'none';
                    isGameOver = true;
                    // remove all element
                    while(grid.firstChild) {
                        grid.removeChild(grid.lastChild);
                    }
                }

                obstaclePosition -= 10;
                obstatcle.style.left = obstaclePosition + 'px';
            }, 20);
            setTimeout(generrateObstacle, randomTime);
        }
    }
    generrateObstacle();

    document.addEventListener('keydown', control);
});