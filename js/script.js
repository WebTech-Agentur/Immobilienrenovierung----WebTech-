document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger lines
            const lines = hamburger.querySelectorAll('div');
            // Basic animation logic for hamburger icon turning into X
            if (navLinks.classList.contains('active')) {
                lines[0].style.transform = 'translateY(8px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Dashboard Interaction
    const phases = {
        planung: {
            text: "Planung & Konzeption",
            material: "Materialauswahl & Grundrisse",
            progress: "15%",
            vorher: "Bestandsaufnahme",
            nachher: "Designentwurf"
        },
        rohbau: {
            text: "Kernsanierung & Rohbau",
            material: "Leitungen, Putz & Rohstoffe",
            progress: "40%",
            vorher: "Entkernter Zustand",
            nachher: "Rohbau-Fertigstellung"
        },
        innenausbau: {
            text: "Innenausbau-Phase",
            material: "Böden, Fliesen & Wände",
            progress: "75%",
            vorher: "Rohbau-Zustand",
            nachher: "Oberflächen-Finish"
        },
        schluesselfertig: {
            text: "Projekt-Abschluss",
            material: "Feinschliff & Endreinigung",
            progress: "100%",
            vorher: "Baustellen-Zustand",
            nachher: "Traumhaftes Ergebnis"
        }
    };

    document.querySelectorAll('.phasen-navigation button').forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.phasen-navigation button').forEach(b => b.classList.remove('aktiv'));
            button.classList.add('aktiv');

            // Update content
            const phase = button.getAttribute('data-phase');
            const data = phases[phase];

            document.getElementById('phasen-text').textContent = data.text;
            document.getElementById('material-text').textContent = data.material;
            document.getElementById('fortschritt-wert').style.width = data.progress;

            // Reset toggle to Nachher
            isVorher = false;
            const toggleBtn = document.getElementById('toggleZustand');
            toggleBtn.textContent = 'VORHER';
            document.getElementById('zustandAnzeige').textContent = data.nachher;
        });
    });

    let isVorher = false;
    const toggleBtn = document.getElementById('toggleZustand');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isVorher = !isVorher;
            const activePhase = document.querySelector('.phasen-navigation button.aktiv').getAttribute('data-phase');
            const data = phases[activePhase];

            if (isVorher) {
                toggleBtn.textContent = 'NACHHER';
                toggleBtn.style.color = '#fff';
                toggleBtn.style.background = 'var(--primary-color)';
                document.getElementById('zustandAnzeige').textContent = data.vorher;
                document.getElementById('zustandAnzeige').style.color = 'var(--primary-color)';
            } else {
                toggleBtn.textContent = 'VORHER';
                toggleBtn.style.color = 'var(--primary-color)';
                toggleBtn.style.background = 'transparent';
                document.getElementById('zustandAnzeige').textContent = data.nachher;
                document.getElementById('zustandAnzeige').style.color = '#bbb';
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const lines = hamburger.querySelectorAll('div');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    });

    // PREMIUM SCROLL REVEAL
    const revealElements = document.querySelectorAll('.section, .service-card, .creative-card, .advantage-item, .galerie-item');
    revealElements.forEach(el => el.classList.add('reveal'));

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => sectionObserver.observe(el));

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // COMPARISON SLIDER LOGIC
    const sliders = document.querySelectorAll('.comparison-slider');

    sliders.forEach(slider => {
        let isMouseDown = false;
        const afterImg = slider.querySelector('.after');
        const handle = slider.querySelector('.handle');

        const moveSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            if (pos < 0) pos = 0;
            if (pos > 100) pos = 100;

            afterImg.style.clipPath = `inset(0 0 0 ${pos}%)`;
            handle.style.left = `${pos}%`;
        };

        const handleMove = (e) => {
            if (!isMouseDown) return;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            moveSlider(x);
        };

        slider.addEventListener('mousedown', () => isMouseDown = true);
        window.addEventListener('mouseup', () => isMouseDown = false);
        slider.addEventListener('touchstart', () => isMouseDown = true);
        window.addEventListener('touchend', () => isMouseDown = false);

        slider.addEventListener('mousemove', handleMove);
        slider.addEventListener('touchmove', handleMove);

        // Pre-set some value on load
        afterImg.style.clipPath = `inset(0 0 0 50%)`;
        handle.style.left = `50%`;
    });
});
