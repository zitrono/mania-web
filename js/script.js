// Modern JavaScript for Mania Rasstegaeva Artist Website
// Mobile-first approach with performance optimizations

(function() {
    'use strict';

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    class MobileNavigation {
        constructor() {
            this.navToggle = document.getElementById('navToggle');
            this.navMenu = document.getElementById('navMenu');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.body = document.body;
            
            this.init();
        }

        init() {
            if (this.navToggle && this.navMenu) {
                this.navToggle.addEventListener('click', this.toggleMenu.bind(this));
                this.navLinks.forEach(link => {
                    link.addEventListener('click', this.closeMenu.bind(this));
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.nav-container')) {
                        this.closeMenu();
                    }
                });
            }
        }

        toggleMenu() {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            this.body.classList.toggle('nav-open');
        }

        closeMenu() {
            this.navToggle.classList.remove('active');
            this.navMenu.classList.remove('active');
            this.body.classList.remove('nav-open');
        }
    }

    // ========================================
    // NAVBAR SCROLL EFFECTS
    // ========================================

    class NavbarScrollEffect {
        constructor() {
            this.navbar = document.getElementById('navbar');
            this.scrollThreshold = 100;
            this.lastScrollY = window.scrollY;
            
            this.init();
        }

        init() {
            if (this.navbar) {
                window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 16));
            }
        }

        handleScroll() {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class based on scroll position
            if (currentScrollY > this.scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar based on scroll direction
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================

    class SmoothScrolling {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', this.handleAnchorClick.bind(this));
            });
        }

        handleAnchorClick(e) {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ========================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ========================================

    class AnimationObserver {
        constructor() {
            this.observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    this.handleIntersection.bind(this),
                    this.observerOptions
                );

                // Observe elements with animation classes
                const animatedElements = document.querySelectorAll(
                    '.highlight-card, .album-card, .art-piece, .theme-card, .collaborator-card, .section-header'
                );

                animatedElements.forEach(el => {
                    el.classList.add('fade-in-element');
                    this.observer.observe(el);
                });
            }
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================

    class ContactForm {
        constructor() {
            this.form = document.getElementById('contactForm');
            this.init();
        }

        init() {
            if (this.form) {
                this.form.addEventListener('submit', this.handleSubmit.bind(this));
                this.addRealTimeValidation();
            }
        }

        handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Validate form data
            if (this.validateForm(data)) {
                this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
                this.form.reset();
            } else {
                this.showMessage('Please fill in all required fields correctly.', 'error');
            }
        }

        validateForm(data) {
            const requiredFields = ['name', 'email', 'subject', 'message'];
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Check required fields
            for (const field of requiredFields) {
                if (!data[field] || data[field].trim() === '') {
                    return false;
                }
            }
            
            // Validate email format
            if (!emailRegex.test(data.email)) {
                return false;
            }
            
            return true;
        }

        addRealTimeValidation() {
            const inputs = this.form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', debounce(this.validateField.bind(this), 300));
            });
        }

        validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            
            // Remove existing error states
            field.classList.remove('error');
            
            // Validate based on field type
            if (field.hasAttribute('required') && !value) {
                this.showFieldError(field, 'This field is required');
                return;
            }
            
            if (field.type === 'email' && value && !this.isValidEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return;
            }
            
            // Clear any existing error messages
            this.clearFieldError(field);
        }

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        showFieldError(field, message) {
            field.classList.add('error');
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '0.25rem';
            
            field.parentNode.appendChild(errorDiv);
        }

        clearFieldError(field) {
            field.classList.remove('error');
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }

        showMessage(message, type) {
            // Remove existing messages
            const existingMessages = document.querySelectorAll('.form-message');
            existingMessages.forEach(msg => msg.remove());
            
            // Create new message
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}`;
            messageDiv.textContent = message;
            
            // Style the message
            messageDiv.style.padding = '1rem';
            messageDiv.style.borderRadius = '8px';
            messageDiv.style.marginTop = '1rem';
            messageDiv.style.textAlign = 'center';
            
            if (type === 'success') {
                messageDiv.style.backgroundColor = '#d4edda';
                messageDiv.style.color = '#155724';
                messageDiv.style.border = '1px solid #c3e6cb';
            } else {
                messageDiv.style.backgroundColor = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.style.border = '1px solid #f5c6cb';
            }
            
            // Insert message after form
            this.form.parentNode.insertBefore(messageDiv, this.form.nextSibling);
            
            // Auto-remove success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 5000);
            }
        }
    }

    // ========================================
    // MUSIC WIDGET ENHANCEMENT
    // ========================================

    class MusicWidgetEnhancer {
        constructor() {
            this.widget = document.querySelector('.music-widget iframe');
            this.init();
        }

        init() {
            if (this.widget) {
                this.addLoadingState();
                this.widget.addEventListener('load', this.handleWidgetLoad.bind(this));
            }
        }

        addLoadingState() {
            const container = this.widget.parentElement;
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'widget-loading';
            loadingDiv.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 400px; color: #8b5a3c;">
                    <div>Loading music player...</div>
                </div>
            `;
            
            container.insertBefore(loadingDiv, this.widget);
            this.widget.style.display = 'none';
        }

        handleWidgetLoad() {
            const loadingDiv = document.querySelector('.widget-loading');
            if (loadingDiv) {
                loadingDiv.remove();
            }
            this.widget.style.display = 'block';
        }
    }

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================

    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.lazyLoadImages();
            this.preloadCriticalResources();
            this.optimizeAnimations();
        }

        lazyLoadImages() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }

        preloadCriticalResources() {
            // Preload critical fonts
            const fontLinks = [
                'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap'
            ];

            fontLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = href;
                link.as = 'font';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }

        optimizeAnimations() {
            // Reduce animations for users who prefer reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            }
        }
    }

    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================

    class AccessibilityEnhancer {
        constructor() {
            this.init();
        }

        init() {
            this.addSkipLink();
            this.enhanceKeyboardNavigation();
            this.addAriaLabels();
            this.manageFocus();
        }

        addSkipLink() {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: #8b5a3c;
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1001;
                transition: top 0.3s;
            `;

            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '6px';
            });

            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });

            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        enhanceKeyboardNavigation() {
            // Add keyboard support for mobile menu
            const navToggle = document.getElementById('navToggle');
            if (navToggle) {
                navToggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navToggle.click();
                    }
                });
            }

            // Trap focus in mobile menu when open
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                        const mobileNav = new MobileNavigation();
                        mobileNav.closeMenu();
                        navToggle.focus();
                    }
                });
            }
        }

        addAriaLabels() {
            // Add aria-labels to interactive elements
            const navToggle = document.getElementById('navToggle');
            if (navToggle) {
                navToggle.setAttribute('aria-label', 'Toggle navigation menu');
                navToggle.setAttribute('aria-expanded', 'false');
            }

            // Update aria-expanded state when menu toggles
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isActive = mutation.target.classList.contains('active');
                        navToggle.setAttribute('aria-expanded', isActive.toString());
                    }
                });
            });

            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                observer.observe(navMenu, { attributes: true });
            }
        }

        manageFocus() {
            // Ensure focus is visible for keyboard users
            const style = document.createElement('style');
            style.textContent = `
                .js-focus-visible :focus:not(.focus-visible) {
                    outline: none;
                }
                .js-focus-visible .focus-visible {
                    outline: 2px solid #8b5a3c;
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);
            document.documentElement.classList.add('js-focus-visible');
        }
    }

    // ========================================
    // MAIN INITIALIZATION
    // ========================================

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all components
        new MobileNavigation();
        new NavbarScrollEffect();
        new SmoothScrolling();
        new AnimationObserver();
        new ContactForm();
        new MusicWidgetEnhancer();
        new PerformanceOptimizer();
        new AccessibilityEnhancer();

        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');

        // Console message for developers
        console.log('🎵 Mania Rasstegaeva Artist Website Loaded Successfully');
        console.log('🎨 Designed with performance and accessibility in mind');
    });

    // ========================================
    // SERVICE WORKER REGISTRATION
    // ========================================

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

})();