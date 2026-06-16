document.addEventListener('DOMContentLoaded', () => {
  
  /* ----------------------------------
     DYNAMIC CONFIG LINK INJECTION
  ---------------------------------- */
  if (typeof PORTFOLIO_CONFIG !== 'undefined') {
    const config = PORTFOLIO_CONFIG;
    
    // Update Hero social links
    const heroSocials = document.querySelector('.hero-socials');
    if (heroSocials) {
      const links = heroSocials.querySelectorAll('a');
      if (links.length >= 4) {
        links[0].href = config.socialLinks.linkedin;
        links[1].href = config.socialLinks.github;
        links[2].href = config.socialLinks.selfmadeNinja;
        if (config.socialLinks.selfmadeNinja.startsWith('http')) {
          links[2].target = '_blank';
        }
        links[3].href = config.socialLinks.instagram;
      }
    }
    
    // Update Footer social links
    const footerSocials = document.querySelector('.footer-socials');
    if (footerSocials) {
      const links = footerSocials.querySelectorAll('a');
      if (links.length >= 4) {
        links[0].href = config.socialLinks.linkedin;
        links[1].href = config.socialLinks.github;
        links[2].href = config.socialLinks.selfmadeNinja;
        if (config.socialLinks.selfmadeNinja.startsWith('http')) {
          links[2].target = '_blank';
        }
        links[3].href = config.socialLinks.instagram;
      }
    }

    // Update About Me verified badge link
    const aboutNinjaBadge = document.getElementById('about-ninja-badge');
    if (aboutNinjaBadge) {
      aboutNinjaBadge.href = config.socialLinks.selfmadeNinja;
      if (config.socialLinks.selfmadeNinja.startsWith('http')) {
        aboutNinjaBadge.target = '_blank';
      } else {
        aboutNinjaBadge.removeAttribute('target');
      }
    }
    
    // Update Email links & texts
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.href = `mailto:${config.contactInfo.email}`;
      const valueEl = link.querySelector('.contact-value');
      if (valueEl) {
        valueEl.textContent = config.contactInfo.email;
      } else if (link.classList.contains('footer-contact-item')) {
        link.innerHTML = `<i class="fa-regular fa-envelope text-orange"></i> ${config.contactInfo.email}`;
      }
    });
    
    // Update Phone links & texts
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.href = `tel:${config.contactInfo.phone}`;
      const valueEl = link.querySelector('.contact-value');
      if (valueEl) {
        valueEl.textContent = config.contactInfo.phone;
      } else if (link.classList.contains('footer-contact-item')) {
        link.innerHTML = `<i class="fa-solid fa-phone text-orange"></i> ${config.contactInfo.phone}`;
      }
    });
  }

  /* ----------------------------------
     NAVBAR SCROLL SHRUNK
  ---------------------------------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ----------------------------------
     HIGH-PERFORMANCE PARALLAX ENGINE & VANTA BACKGROUND
  ---------------------------------- */
  const bgGrid = document.querySelector('.bg-grid');
  const orbs = document.querySelectorAll('.bg-orb');

  // Initialize Vanta Dots effect on the bg-ambient container
  let vantaEffect = null;
  try {
    vantaEffect = VANTA.DOTS({
      el: ".bg-ambient",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff8820,            // Orange dots
      color2: 0xff8820,           // Orange lines
      size: 2.00,                 // Dots size (smaller)
      spacing: 28.00,             // Dots spacing (tighter)
      showLines: true,            // Connecting lines
      backgroundColor: 0x222222,   // Solid gray background
      backgroundAlpha: 1.00        // Solid background
    });
  } catch (err) {
    console.error("Vanta Dots failed to initialize:", err);
  }

  // Parallax animation state variables
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  let targetScrollY = 0;
  let currentScrollY = 0;

  // Listen to mouse movement and normalize from -0.5 to 0.5
  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / window.innerWidth - 0.5;
    targetMouseY = e.clientY / window.innerHeight - 0.5;
  });

  // Track scroll position
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  // Unified loop using requestAnimationFrame and linear interpolation (lerping)
  function animate() {
    // 1. Lerp mouse & scroll coordinates for fluid, high-refresh rate movement
    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    // 2. Animate Ambient Orbs (Smooth translate3d runs on GPU)
    orbs.forEach((orb, index) => {
      const mouseSpeed = (index + 1) * 25;
      const scrollSpeed = (index + 1) * 0.12 + 0.08; // Upward parallax scroll speed
      orb.style.transform = `translate3d(${currentMouseX * mouseSpeed}px, ${-currentScrollY * scrollSpeed + currentMouseY * mouseSpeed}px, 0)`;
    });

    // 3. Animate Digital Grid (3D tilt + translation)
    if (bgGrid) {
      const gridMouseSpeed = 15;
      const gridScrollSpeed = 0.06;
      bgGrid.style.transform = `translate3d(${currentMouseX * gridMouseSpeed}px, ${-currentScrollY * gridScrollSpeed + currentMouseY * gridMouseSpeed}px, 0) rotateX(${-currentMouseY * 3}deg) rotateY(${currentMouseX * 3}deg)`;
    }

    requestAnimationFrame(animate);
  }

  // Run the animation loop
  requestAnimationFrame(animate);

  /* ----------------------------------
     SCROLL REVEAL TRIGGERS
  ---------------------------------- */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ----------------------------------
     PORTFOLIO CATEGORY FILTERING
  ---------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const portfolioGrid = document.querySelector('.portfolio-grid');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.dataset.filter;
      
      // Animate grid change
      projectItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          // Force reflow
          item.offsetHeight;
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          // Delay hide slightly to match CSS transition
          setTimeout(() => {
            if (btn.dataset.filter === filterValue) {
              item.style.display = 'none';
            }
          }, 350);
        }
      });
    });
  });

  /* ----------------------------------
     SCROLL ACTIVE LINK DETECTION
  ---------------------------------- */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  function activeNavLinkOnScroll() {
    let scrollPosition = window.scrollY + 180;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', activeNavLinkOnScroll);
  window.addEventListener('load', activeNavLinkOnScroll);

});
