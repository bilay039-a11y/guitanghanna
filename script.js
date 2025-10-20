document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loading = document.getElementById('loading');
    const modalMain = document.getElementById('modal-main');
    const modalNo = document.getElementById('modal-no');
    const mainContent = document.getElementById('main-content');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnChooseAgain = document.getElementById('btn-choose-again');
    const giftBox = document.getElementById('gift-box');
    const giftContent = document.getElementById('gift-content');
    const closeBtn = document.querySelector('.close-btn');
    const currentDateSpan = document.getElementById('current-date');

    // Set current date
    const currentDate = new Date();
    currentDateSpan.textContent = currentDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Loading Screen Animation
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
            modalMain.style.display = 'flex';
        }, 500);
    }, 2000);

    // Create Balloons
    function createBalloons() {
        const container = document.querySelector('.balloons-container');
        const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
        
        function createSingleBalloon() {
            const balloon = document.createElement('img');
            balloon.src = `./asset/balloon${Math.floor(Math.random() * 5) + 1}.png`;
            balloon.className = 'balloon';
            balloon.style.setProperty('--x-offset', `${(Math.random() - 0.5) * 300}px`);
            balloon.style.setProperty('--rotation', `${(Math.random() - 0.5) * 30}deg`);
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.animation = `floatUpward ${5 + Math.random() * 5}s linear forwards`;
            
            container.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 10000);
        }

        // Create initial balloons
        for(let i = 0; i < 10; i++) {
            setTimeout(createSingleBalloon, i * 1000);
        }

        // Continue creating balloons
        setInterval(createSingleBalloon, 2000);
    }

    // Button Event Listeners
    btnYes.addEventListener('click', () => {
        modalMain.style.opacity = '0';
        setTimeout(() => {
            modalMain.style.display = 'none';
            mainContent.style.display = 'block';
            createBalloons();
        }, 500);
    });

    btnNo.addEventListener('click', () => {
        modalMain.style.display = 'none';
        modalNo.style.display = 'flex';
    });

    btnChooseAgain.addEventListener('click', () => {
        modalNo.style.display = 'none';
        modalMain.style.display = 'flex';
        modalMain.style.opacity = '1';
    });

    // Gift Box Click Event
    giftBox.addEventListener('click', () => {
        giftBox.style.animation = 'giftShake 0.5s ease-in-out';
        setTimeout(() => {
            giftBox.style.transform = 'scale(0) rotate(180deg)';
            setTimeout(() => {
                giftBox.style.display = 'none';
                giftContent.style.display = 'block';
                giftContent.style.animation = 'giftContentAppear 1s forwards';
                showConfetti();
                createHearts();
            }, 500);
        }, 500);
    });

    // Close Button Event
    closeBtn.addEventListener('click', () => {
        giftContent.style.animation = 'giftContentDisappear 0.5s forwards';
        setTimeout(() => {
            giftContent.style.display = 'none';
            giftBox.style.display = 'block';
            giftBox.style.transform = 'scale(1) rotate(0)';
            giftBox.style.animation = 'giftAppear 0.5s forwards';
        }, 500);
    });

    // Create Hearts
    function createHearts() {
        const container = document.querySelector('.hearts-rain');
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
            heart.style.opacity = Math.random();
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }

        setInterval(createHeart, 300);
    }

    // Show Confetti
    function showConfetti() {
        for (let i = 0; i < 100; i++) {
            createConfettiParticle();
        }
    }

    function createConfettiParticle() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }

    // Add hover effect for gift box
    giftBox.addEventListener('mouseenter', () => {
        if (!giftBox.classList.contains('shake')) {
            giftBox.classList.add('shake');
            
            // Play hover sound if exists
            const hoverSound = document.getElementById('hoverSound');
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
            }
        }
    });

    giftBox.addEventListener('mouseleave', () => {
        giftBox.classList.remove('shake');
    });

    // Cloud parallax effect
    document.addEventListener('mousemove', (e) => {
        const clouds = document.querySelectorAll('.cloud-img');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        clouds.forEach(cloud => {
            const speed = cloud.classList.contains('cloud-left-slow') || 
                         cloud.classList.contains('cloud-right-slow') ? 20 : 10;
            const offsetX = (mouseX - 0.5) * speed;
            const offsetY = (mouseY - 0.5) * speed;

            cloud.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

    // Additional animations for decorative elements
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        
        function createSpark() {
            const spark = document.createElement('div');
            spark.className = 'sparkle';
            spark.style.left = `${Math.random() * 100}%`;
            spark.style.top = `${Math.random() * 100}%`;
            spark.style.animationDuration = `${0.5 + Math.random() * 1}s`;
            container.appendChild(spark);

            setTimeout(() => spark.remove(), 1500);
        }

        setInterval(createSpark, 200);
    }

    // Initialize background animations
    function initializeBackgroundEffects() {
        const clouds = document.querySelectorAll('.cloud-img');
        clouds.forEach((cloud, index) => {
            cloud.style.top = `${20 + (index * 15)}%`;
            cloud.style.opacity = '0';
            setTimeout(() => {
                cloud.style.opacity = '0.8';
            }, index * 500);
        });

        createSparkles();
    }

    // Add window resize handler
    window.addEventListener('resize', () => {
        // Adjust balloon positions on window resize
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.style.left = `${Math.random() * 100}%`;
        });
    });

    // Add touch events for mobile devices
    if ('ontouchstart' in window) {
        giftBox.addEventListener('touchstart', () => {
            giftBox.classList.add('shake');
        });

        giftBox.addEventListener('touchend', () => {
            giftBox.classList.remove('shake');
        });
    }

    // Add some random twinkling stars
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starsCount = 50;

        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    // Initialize all effects
    function initializeAllEffects() {
        initializeBackgroundEffects();
        createStars();
        // Start with some initial balloons
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBalloons(), i * 1000);
        }
    }

    // Call initialize function when main content is shown
    btnYes.addEventListener('click', () => {
        setTimeout(initializeAllEffects, 500);
    });
});