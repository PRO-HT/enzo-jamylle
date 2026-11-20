const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const closeDropdowns = (except = null) => {
    dropdowns.forEach((dropdown) => {
        if (dropdown !== except) {
            dropdown.classList.remove('active');
            dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
    });
};

const closeMobileMenu = () => {
    mainNav?.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    closeDropdowns();
};

dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');

    toggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = !dropdown.classList.contains('active');
        closeDropdowns(dropdown);
        dropdown.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    dropdown.querySelectorAll('.dropdown-menu a').forEach((link) => {
        link.addEventListener('click', (event) => {
            dropdown.classList.remove('active');
            toggle?.setAttribute('aria-expanded', 'false');

            if (dropdown.closest('.nav')) {
                closeMobileMenu();
            }

            if (link.target !== '_blank') {
                event.preventDefault();
                window.location.href = link.href;
            }
        });
    });
});

menuToggle?.addEventListener('click', () => {
    const isOpen = !mainNav.classList.contains('open');
    mainNav.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    if (!isOpen) {
        closeDropdowns();
    }
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) {
        closeDropdowns();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
        document.querySelector('.nav-dropdown.active .dropdown-toggle')?.focus();
    }
});

mainNav?.querySelectorAll(':scope > a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});
