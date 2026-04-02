// ============================================
// PROFESSIONAL PORTFOLIO - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ====== PRELOADER ======
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initAnimations();
        }, 2200);
    });

    // ====== CURSOR FOLLOWER ======
    const cursor = document.getElementById('cursorFollower');
    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        if (!cursorVisible) {
            cursor.classList.add('visible');
            cursorVisible = true;
        }
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
        cursorVisible = false;
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .about-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ====== NAVBAR ======
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // Scroll effects
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll
        updateActiveNavLink();
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active nav link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ====== THEME TOGGLE ======
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    let isDark = true;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        isDark = false;
    }

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // ====== TYPING EFFECT ======
    const typingElement = document.getElementById('typingText');
    const roles = [
        'Web Developer',
        'UI/UX Designer',
        'Frontend Expert',
        'Creative Thinker',
        'Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ====== COUNTER ANIMATION ======
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // ====== SKILLS TABS ======
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tab).classList.add('active');

            // Animate skill bars in active tab
            setTimeout(() => animateSkillBars(), 100);
        });
    });

    // ====== SKILL BARS ANIMATION ======
    function animateSkillBars() {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        const bars = activeTab.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }

    // ====== PROJECT FILTER ======
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ====== TESTIMONIALS SLIDER ======
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const slides = track ? track.children.length : 0;
    let currentSlide = 0;

    // Create dots
    if (dotsContainer && slides > 0) {
        for (let i = 0; i < slides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides;
            goToSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides) % slides;
            goToSlide(currentSlide);
        });
    }

    // Auto slide
    setInterval(() => {
        if (slides > 0) {
            currentSlide = (currentSlide + 1) % slides;
            goToSlide(currentSlide);
        }
    }, 5000);

    // ====== CONTACT FORM ======
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');

                // Reset after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    formSuccess.classList.remove('show');
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 5000);
            }, 2000);
        });
    }

    // ====== SCROLL ANIMATIONS (Custom AOS) ======
    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));

                    // Trigger skill bars when skills section is visible
                    if (entry.target.closest('#skills') || entry.target.id === 'skills') {
                        animateSkillBars();
                    }

                    // Trigger counters when hero is visible
                    if (entry.target.closest('#home') || entry.target.id === 'home') {
                        animateCounters();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        // Also observe sections for skill bars and counters
        document.querySelectorAll('#skills, #home').forEach(el => {
            observer.observe(el);
        });
    }

    // ====== SMOOTH REVEAL ON SCROLL ======
    const revealElements = document.querySelectorAll(
        '.section-header, .about-card, .skill-card, .project-card, .timeline-item, .contact-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // ====== PARALLAX EFFECT ON SHAPES ======
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.floating-shape');

        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.03;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ====== NAVBAR HIDE ON SCROLL DOWN ======
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Initial animation trigger
    setTimeout(() => {
        animateSkillBars();
        animateCounters();
    }, 2500);
});