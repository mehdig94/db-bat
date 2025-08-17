// ==================== NAVBAR MOBILE SIMPLE & EFFICACE ====================
console.log('🚀 Loading Simple Mobile Navbar...');

// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Initializing Mobile Navbar...');
    
    // Récupérer les éléments
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('Elements found:', {
        mobileToggle: !!mobileToggle,
        mobileMenu: !!mobileMenu
    });
    
    if (mobileToggle && mobileMenu) {
        // Variable pour suivre l'état
        let isMenuOpen = false;
        
        // Fonction pour ouvrir le menu
        function openMenu() {
            console.log('📱 Opening menu...');
            isMenuOpen = true;
            mobileToggle.classList.add('active');
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        // Fonction pour fermer le menu
        function closeMenu() {
            console.log('❌ Closing menu...');
            isMenuOpen = false;
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
        
        // Toggle du menu
        function toggleMenu() {
            console.log('🔄 Toggling menu, current state:', isMenuOpen);
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Event listener pour le bouton burger
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🍔 Burger clicked!');
            toggleMenu();
        });
        
        // Event listeners pour les liens du menu mobile
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('🔗 Mobile link clicked, closing menu...');
                closeMenu();
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                console.log('📱 Clicked outside menu, closing...');
                closeMenu();
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                console.log('⎋ Escape pressed, closing menu...');
                closeMenu();
            }
        });
        
        console.log('✅ Mobile navbar initialized successfully!');
        
        // Exposer les fonctions pour debug
        window.debugOpenMenu = openMenu;
        window.debugCloseMenu = closeMenu;
        window.debugToggleMenu = toggleMenu;
        
    } else {
        console.error('❌ Mobile navbar elements not found!');
    }
});

// ==================== AUTRES FONCTIONNALITÉS ====================

// Animations reveal on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments .reveal
document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
});

// Formulaire de contact
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            formStatus.textContent = 'Veuillez remplir tous les champs requis.';
            formStatus.style.color = '#ff6b35';
            return;
        }
        
        // Préparer le contenu de l'email
        let emailSubject = 'Nouvelle demande de contact - DB-BAT';
        let emailBody = `Bonjour,\n\n`;
        emailBody += `Vous avez reçu une nouvelle demande de contact :\n\n`;
        emailBody += `Nom : ${name}\n`;
        emailBody += `Email : ${email}\n`;
        if (phone) {
            emailBody += `Téléphone : ${phone}\n`;
        }
        emailBody += `Message :\n${message}\n\n`;
        emailBody += `Cordialement,\nSite web DB-BAT`;
        
        // Créer le lien mailto
        const mailtoLink = `mailto:dbbat94@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Ouvrir le client email par défaut
        window.location.href = mailtoLink;
        
        // Afficher le message de succès
        formStatus.textContent = 'Email ouvert ! Vérifiez votre client email.';
        formStatus.style.color = '#4CAF50';
        
        // Réinitialiser le formulaire après un délai
        setTimeout(() => {
            contactForm.reset();
            formStatus.textContent = '';
        }, 3000);
    });
}

// Année actuelle dans le footer
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Effet parallax léger sur le hero
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-media');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = 'translateY(' + speed + 'px)';
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

console.log('🎉 All systems loaded successfully!');

// ==================== REDIRECTION CODALLY ====================
// Gestionnaire de clic pour l'image Codally
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu plus longtemps pour s'assurer que tout est chargé
    setTimeout(function() {
        const codallyImages = document.querySelectorAll('img[src="assets/img/codally.png"]');
        console.log('🔍 Images Codally trouvées:', codallyImages.length);
        
        codallyImages.forEach(function(codallyImage, index) {
            // Ajouter un style de curseur pointer pour indiquer que l'image est cliquable
            codallyImage.style.cursor = 'pointer';
            
            // Ajouter le gestionnaire d'événement de clic
            codallyImage.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔗 Redirection vers Codally... (Image', index + 1, ')');
                window.open('https://www.codally.app', '_blank');
            });
            
            console.log('✅ Gestionnaire de clic Codally initialisé pour l\'image', index + 1);
        });
    }, 100);
});

// ==================== REDIRECTION LOGOICI ====================
// Gestionnaire de clic pour l'image Logoici
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu plus longtemps pour s'assurer que tout est chargé
    setTimeout(function() {
        const logoiciImages = document.querySelectorAll('img[src="assets/img/logoici.png"]');
        console.log('🔍 Images Logoici trouvées:', logoiciImages.length);
        
        logoiciImages.forEach(function(logoiciImage, index) {
            // Ajouter un style de curseur pointer pour indiquer que l'image est cliquable
            logoiciImage.style.cursor = 'pointer';
            
            // Ajouter le gestionnaire d'événement de clic
            logoiciImage.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔗 Redirection vers Quotio... (Image', index + 1, ')');
                window.open('https://www.quotio.io', '_blank');
            });
            
            console.log('✅ Gestionnaire de clic Logoici initialisé pour l\'image', index + 1);
        });
    }, 100);
});

// ==================== FONCTIONS DE DEBUG ====================
window.debugNavbarStatus = function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('📊 Navbar Debug Status:', {
        mobileToggle: !!mobileToggle,
        mobileMenu: !!mobileMenu,
        isMenuOpen: mobileMenu ? mobileMenu.classList.contains('open') : false,
        isBurgerActive: mobileToggle ? mobileToggle.classList.contains('active') : false
    });
};