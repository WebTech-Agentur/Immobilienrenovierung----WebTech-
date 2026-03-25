document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    document.querySelectorAll('.section, .service-card, .advantage-item, .process-step, .creative-card').forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });

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

            const phaseText = document.getElementById('phasen-text');
            const materialText = document.getElementById('material-text');
            const progressVal = document.getElementById('fortschritt-wert');

            // Fade out effect
            [phaseText, materialText].forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
            });

            setTimeout(() => {
                phaseText.textContent = data.text;
                materialText.textContent = data.material;
                progressVal.style.width = data.progress;

                [phaseText, materialText].forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = 'all 0.4s var(--ease)';
                });
            }, 300);

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
});
