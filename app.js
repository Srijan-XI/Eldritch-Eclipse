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

                    // Reset button text after a short delay
                setTimeout(() => {
                    setSubmitLabel('Confirm Registration');
                }, 3000);

                }, 1500); // 1.5 second delay to simulate network latency
            }
        });

        // Initialize scroll animations when the page loads
        window.addEventListener('load', setupScrollAnimations);