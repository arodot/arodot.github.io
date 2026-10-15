/**
 * Responsive JavaScript for Rev. Dr. KEHINDE OJOARO's Portfolio
 * Handles: Mobile Menu Toggle, Smooth Scrolling, Active Nav Links on Scroll,
 * Sticky Header Effect, Contact Form Submission with Toast Feedback, and Modal controls.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const projectModal = document.getElementById('projectModal');

    // ==========================================
    // 1. MOBILE RESPONSIVE NAVIGATION MENU
    // ==========================================
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon between bars and close (X)
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile menu when clicking outside of the navbar
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });

        // Close mobile menu when a nav link is clicked
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // ==========================================
    // 2. STICKY HEADER SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ==========================================
    // 3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================
    // 4. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form input values (optional: for AJAX/Email service integration)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            // Simulate successful message dispatch
            showToast(`Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // Toast Notification Helper Function
    function showToast(message, type = 'success') {
        if (!toast || !toastMsg) return;

        toastMsg.textContent = message;
        
        // Adjust styling based on success/error type if needed
        if (type === 'error') {
            toast.style.borderLeft = '4px solid #e74c3c';
        } else {
            toast.style.borderLeft = '4px solid var(--primary-green, #046A38)';
        }

        toast.classList.add('show');

        // Automatically hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ==========================================
    // 5. MODAL POPUP CONTROLS
    // ==========================================
    // Global functions for opening/closing modals to match inline onclick handlers in HTML
    window.openModal = function(title, description) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');

        if (modalTitle && modalDesc && projectModal) {
            modalTitle.textContent = title;
            modalDesc.textContent = description;
            projectModal.classList.add('show');
        }
    };

    window.closeModal = function() {
        if (projectModal) {
            projectModal.classList.remove('show');
        }
    };

    // Close modal when clicking outside of modal content box
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
});