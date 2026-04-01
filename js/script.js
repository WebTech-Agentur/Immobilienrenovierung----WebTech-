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

    // Premium Dashboard Interaction Focus
    const phases = {
        planung: {
            text: "Planung & Konzeption",
            subtitle: "Phase 1 - Start",
            material: "Materialauswahl & Grundrisse",
            progress: 15,
            vorher: "Bestandsaufnahme",
            nachher: "Designentwurf",
            image_nachher: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
            image_vorher: "https://images.unsplash.com/photo-1498453483250-9883b27ae136?q=80&w=1000&auto=format&fit=crop"
        },
        rohbau: {
            text: "Kernsanierung & Rohbau",
            subtitle: "Phase 2 - Struktur",
            material: "Leitungen, Putz & Rohstoffe",
            progress: 40,
            vorher: "Entkernter Zustand",
            nachher: "Rohbau-Fertigstellung",
            image_nachher: "https://images.unsplash.com/photo-1541888082416-a7ae3c73452f?q=80&w=1000&auto=format&fit=crop",
            image_vorher: "https://images.unsplash.com/photo-1621259020959-1e1b402860d5?q=80&w=1000&auto=format&fit=crop"
        },
        innenausbau: {
            text: "Innenausbau-Phase",
            subtitle: "Phase 3 - Detailarbeit",
            material: "Böden, Fliesen & Wände",
            progress: 75,
            vorher: "Rohbau-Zustand",
            nachher: "Oberflächen-Finish",
            image_nachher: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
            image_vorher: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=1000&auto=format&fit=crop"
        },
        schluesselfertig: {
            text: "Projekt-Abschluss",
            subtitle: "Phase 4 - Übergabe",
            material: "Feinschliff & Endreinigung",
            progress: 100,
            vorher: "Baustellen-Zustand",
            nachher: "Traumhaftes Ergebnis",
            image_nachher: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
            image_vorher: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
        }
    };

    let isVorher = false;

    const navButtons = document.querySelectorAll('.phasen-navigation-modern button, .phasen-navigation button');
    
    // Initialize Dashboard State Layout
    const initialPhase = phases['planung'];
    if(document.getElementById('ring-progress')) {
        const initialOffset = 289 - (289 * initialPhase.progress / 100);
        document.getElementById('ring-progress').style.strokeDashoffset = initialOffset; // Circle circumference ~289
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            navButtons.forEach(b => b.classList.remove('aktiv'));
            button.classList.add('aktiv');

            const phaseId = button.getAttribute('data-phase');
            const data = phases[phaseId];

            if (!data) return;

            // DOM Updates text elements
            const phaseText = document.getElementById('phasen-text');
            const phaseSubtitle = document.getElementById('phasen-subtitle');
            const materialText = document.getElementById('material-text');
            
            if(phaseText) phaseText.textContent = data.text;
            if(phaseSubtitle) phaseSubtitle.textContent = data.subtitle;
            if(materialText) materialText.textContent = data.material;

            // Update Progress Formatter
            const ringProgress = document.getElementById('ring-progress');
            const ringText = document.getElementById('ring-text');
            const progressBalken = document.getElementById('fortschritt-wert'); // Fallback if old code somehow visible 

            if(ringProgress && ringText) {
                const offset = 289 - (289 * data.progress / 100);
                ringProgress.style.strokeDashoffset = offset;
                ringText.textContent = data.progress + "%";
            }
            if(progressBalken) progressBalken.style.width = data.progress + "%";

            // Graphic / Image Update Support
            const phaseImage = document.getElementById('phase-image');
            if (phaseImage) {
                phaseImage.style.opacity = '0';
                setTimeout(() => {
                    phaseImage.src = isVorher ? data.image_vorher : data.image_nachher;
                    phaseImage.alt = data.text;
                    phaseImage.style.opacity = '1';
                }, 400); // Wait for fade out
            }

            // Reset or synchronize Zustand display status 
            const toggleBtn = document.getElementById('toggleZustand');
            const zustandText = document.getElementById('zustandAnzeige');
            if(zustandText) zustandText.textContent = isVorher ? data.vorher : data.nachher;
        });
    });

    const toggleBtn = document.getElementById('toggleZustand');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isVorher = !isVorher;
            const activeButton = document.querySelector('.phasen-navigation-modern button.aktiv') || document.querySelector('.phasen-navigation button.aktiv');
            
            if(!activeButton) return;
            
            const activePhase = activeButton.getAttribute('data-phase');
            const data = phases[activePhase];

            const zustandAnzeige = document.getElementById('zustandAnzeige');
            const phaseImage = document.getElementById('phase-image');

            if (isVorher) {
                toggleBtn.querySelector('span').textContent = 'Zustand wechseln (Nachher)';
                toggleBtn.style.color = '#fff';
                toggleBtn.style.background = 'var(--primary-color)';
                if(zustandAnzeige) {
                    zustandAnzeige.textContent = data.vorher;
                    zustandAnzeige.classList.remove('highlight-status');
                    zustandAnzeige.style.color = '#aaa'; 
                }
            } else {
                toggleBtn.querySelector('span').textContent = 'Zustand wechseln (Vorher)';
                toggleBtn.style.color = 'var(--primary-color)';
                toggleBtn.style.background = 'transparent';
                if(zustandAnzeige) {
                    zustandAnzeige.textContent = data.nachher;
                    zustandAnzeige.classList.add('highlight-status');
                    zustandAnzeige.style.color = 'var(--primary-color)';
                }
            }

            // Update Image on toggle
            if (phaseImage) {
                phaseImage.style.opacity = '0.5';
                setTimeout(() => {
                    phaseImage.src = isVorher ? data.image_vorher : data.image_nachher;
                    phaseImage.style.opacity = '1';
                }, 200); 
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
