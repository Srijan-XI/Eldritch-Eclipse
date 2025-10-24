        // --- MOBILE MENU TOGGLE ---
        
        function initMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (!mobileMenuBtn || !mobileMenu) return;

            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu when clicking on a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // --- LENIS SMOOTH SCROLLING INITIALIZATION ---
        
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        }

        // --- JAVASCRIPT FOR SCROLL ANIMATIONS ---

        function setupScrollAnimations() {
            // Options for the Intersection Observer
            const observerOptions = {
                root: null, // relative to the viewport
                rootMargin: '0px 0px -100px 0px', // start animation 100px before reaching the bottom
                threshold: 0.01 // trigger when 1% of the item is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is in viewport, add 'revealed' class to trigger transition
                        entry.target.classList.add('revealed');
                        // Stop observing after the animation has been triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Find all elements with the 'reveal' class and start observing them
            document.querySelectorAll('.reveal').forEach(element => {
                observer.observe(element);
            });
            
            // For elements visible on page load (like the Hero section), manually trigger their animation immediately
            document.querySelectorAll('.hero-bg .reveal').forEach(element => {
                element.classList.add('revealed');
            });
        }
        
        // --- JAVASCRIPT FOR FORM VALIDATION AND SUBMISSION ---

        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default form submission

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const successMessage = document.getElementById('successMessage');
            const submitBtn = document.getElementById('submitBtn');
            const getLabelEl = () => submitBtn?.querySelector('.button-text');
            const setSubmitLabel = (text) => {
                const label = getLabelEl();
                if (label) label.textContent = text; else submitBtn.textContent = text;
            };

            let isValid = true;

            // 1. Reset previous errors and success message
            nameError.classList.add('hidden');
            emailError.classList.add('hidden');
            successMessage.classList.add('hidden');

            // 2. Validate Name
            if (nameInput.value.trim() === '') {
                nameError.classList.remove('hidden');
                isValid = false;
            }

            // 3. Validate Email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                isValid = false;
            }

            // 4. Handle Submission
            if (isValid) {
                // Simulate form submission process (e.g., API call)
                setSubmitLabel('Securing Ritual...');
                submitBtn.setAttribute('disabled', 'true');
                submitBtn.setAttribute('aria-busy', 'true');

                // In a real application, you would make an asynchronous API call here.
                setTimeout(() => {
                    // Success state
                    setSubmitLabel('CONFIRMED');
                    submitBtn.removeAttribute('disabled');
                    submitBtn.removeAttribute('aria-busy');
                    
                    // Show success message and reset form fields
                    successMessage.classList.remove('hidden');
                    nameInput.value = '';
                    emailInput.value = '';

                    // Offer gravestone designer
                    setTimeout(() => {
                        const offerDesigner = confirm('🪦 Would you like to design your eternal memorial gravestone?\n\nClick OK to launch the Interactive Memorial Designer!');
                        if (offerDesigner) {
                            window.location.href = 'gravestone.html?from=registration';
                        }
                    }, 2000);

                    // Reset button text after a short delay
                setTimeout(() => {
                    setSubmitLabel('Confirm Registration');
                }, 3000);

                }, 1500); // 1.5 second delay to simulate network latency
            }
        });

        // Initialize scroll animations when the page loads
        window.addEventListener('load', setupScrollAnimations);

        // --- THEME TOGGLE FUNCTIONALITY ---
        
        function initThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle?.querySelector('.theme-icon');
            
            if (!themeToggle) return;

            // Check for saved theme preference or default to dark
            const currentTheme = localStorage.getItem('theme') || 'dark';
            if (currentTheme === 'light') {
                document.body.classList.add('light-mode');
                if (themeIcon) themeIcon.textContent = '☀️';
            }

            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                const isLight = document.body.classList.contains('light-mode');
                
                // Update icon
                if (themeIcon) {
                    themeIcon.textContent = isLight ? '☀️' : '🌙';
                }
                
                // Save preference
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                
                // Add a subtle pulse animation
                themeToggle.style.transform = 'scale(1.2) rotate(15deg)';
                setTimeout(() => {
                    themeToggle.style.transform = '';
                }, 200);
            });
        }

        // --- PARTICLE EFFECTS SYSTEM ---
        
        function createParticleSystem() {
            const container = document.getElementById('particles-container');
            if (!container) return;

            // Create ember particles
            function createEmber() {
                const ember = document.createElement('div');
                ember.className = 'particle ember';
                
                // Random starting position
                ember.style.left = Math.random() * 100 + '%';
                ember.style.bottom = '-10px';
                
                // Random drift
                ember.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
                
                // Random duration
                const duration = 8 + Math.random() * 7;
                ember.style.animationDuration = duration + 's';
                
                // Random delay
                ember.style.animationDelay = Math.random() * 3 + 's';
                
                container.appendChild(ember);
                
                // Remove after animation
                setTimeout(() => {
                    ember.remove();
                }, (duration + 3) * 1000);
            }

            // Create fog particles
            function createFog() {
                const fog = document.createElement('div');
                fog.className = 'particle fog-particle';
                
                fog.style.left = Math.random() * 100 + '%';
                fog.style.bottom = '-80px';
                fog.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
                
                const duration = 15 + Math.random() * 10;
                fog.style.animationDuration = duration + 's';
                fog.style.animationDelay = Math.random() * 5 + 's';
                
                container.appendChild(fog);
                
                setTimeout(() => {
                    fog.remove();
                }, (duration + 5) * 1000);
            }

            // Generate particles periodically
            setInterval(createEmber, 300);
            setInterval(createFog, 2000);
            
            // Initial burst
            for (let i = 0; i < 10; i++) {
                setTimeout(createEmber, i * 200);
            }
            for (let i = 0; i < 3; i++) {
                setTimeout(createFog, i * 1000);
            }
        }

        // --- BLOOD DRIP GENERATION ---
        
        function createBloodDrips() {
            const containers = document.querySelectorAll('.blood-drip-container');
            containers.forEach(container => {
                // Create 8-12 drips per container
                const dripCount = 8 + Math.floor(Math.random() * 5);
                for (let i = 0; i < dripCount; i++) {
                    const drip = document.createElement('div');
                    drip.className = 'blood-drip';
                    drip.style.left = (Math.random() * 100) + '%';
                    drip.style.animationDelay = (Math.random() * 3) + 's';
                    drip.style.animationDuration = (2 + Math.random() * 2) + 's';
                    container.appendChild(drip);
                }
            });
        }

        // Initialize all new features on page load
        window.addEventListener('DOMContentLoaded', () => {
            initMobileMenu();
            initThemeToggle();
            createParticleSystem();
            createBloodDrips();
        });

        // Initialize AOS (Animate On Scroll) and Vanta background on load
        window.addEventListener('load', () => {
            // --- AOS INIT ---
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 700,
                    easing: 'ease-out',
                    once: true,
                    offset: 80,
                });
            }

            // --- VANTA INIT (FOG on hero) ---
            try {
                if (window.VANTA && typeof window.VANTA.FOG === 'function') {
                    const el = document.querySelector('.hero-bg');
                    if (el) {
                        // Helper to read CSS variables and convert to hex int for Vanta
                        const getCssVar = (name, fallback) => {
                            const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
                            return v || fallback;
                        };
                        const hexToInt = (hex) => parseInt(hex.replace('#', ''), 16);

                        const colorAccent = hexToInt(getCssVar('--color-accent', '#FFC000'));
                        const colorHeader = hexToInt(getCssVar('--color-header', '#B30000'));
                        const colorDark = hexToInt(getCssVar('--color-dark', '#0A0A0A'));

                        // Ensure content stays above the Vanta canvas
                        el.style.position = el.style.position || 'relative';

                        // Store instance for potential cleanup
                        window.__vanta = VANTA.FOG({
                            el,
                            mouseControls: true,
                            touchControls: true,
                            gyroControls: false,
                            highlightColor: colorAccent,
                            midtoneColor: colorHeader,
                            lowlightColor: colorDark,
                            baseColor: colorDark,
                            blurFactor: 0.5,
                            speed: 1.0,
                            zoom: 0.7,
                        });
                    }
                }
            } catch (e) {
                // Silently ignore Vanta init errors to avoid breaking the page
                console.warn('Vanta init skipped:', e);
            }
        });

        // Optional: Cleanup Vanta on page unload (single-page safety)
        window.addEventListener('beforeunload', () => {
            if (window.__vanta && typeof window.__vanta.destroy === 'function') {
                window.__vanta.destroy();
                window.__vanta = null;
            }
        });