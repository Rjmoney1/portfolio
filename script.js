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
     PARALLAX MOVING BACKGROUND ORBS
  ---------------------------------- */
  const bgGrid = document.querySelector('.bg-grid');
  const orbs = document.querySelectorAll('.bg-orb');

  // Store the default top value of each orb based on computed styles
  orbs.forEach((orb) => {
    orb.dataset.defaultTop = window.getComputedStyle(orb).top;
  });

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    orbs.forEach((orb, index) => {
      const depth = (index + 1) * 35;
      orb.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
    });
    
    if (bgGrid) {
      bgGrid.style.transform = `translate(${mouseX * 12}px, ${mouseY * 12}px)`;
    }
  });

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const scrollSpeed = (index + 1) * 0.15;
      const defaultTopVal = parseFloat(orb.dataset.defaultTop) || 0;
      // If defaultTop was defined in % or px, parse correctly or fallback to raw px
      const defaultTopStr = orb.dataset.defaultTop || '0px';
      if (defaultTopStr.includes('%')) {
        orb.style.top = `calc(${defaultTopStr} + ${scrolled * scrollSpeed}px)`;
      } else {
        orb.style.top = `${defaultTopVal + scrolled * scrollSpeed}px`;
      }
    });
  });

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

  /* ----------------------------------
     CONTACT FORM SUBMIT HANDLER
  ---------------------------------- */
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get values
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Change button state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ms-1"></i>';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Success notification modal or alert
        const alertBox = document.createElement('div');
        alertBox.className = 'alert alert-success glass-card mt-3 border-success text-white p-3 entry-anim-1';
        alertBox.style.background = 'rgba(40, 167, 69, 0.15)';
        alertBox.style.borderColor = 'rgba(40, 167, 69, 0.4)';
        alertBox.innerHTML = `
          <h5 class="alert-heading text-success mb-1 font-mono">✓ ACCESS GRANTED</h5>
          <p class="mb-0 small text-muted">Message transmitted successfully. Thank you, ${name}. I will contact you shortly.</p>
        `;
        
        contactForm.appendChild(alertBox);
        
        // Reset form
        contactForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove alert after 5s
        setTimeout(() => {
          alertBox.style.opacity = '0';
          alertBox.style.transform = 'translateY(10px)';
          alertBox.style.transition = 'all 0.5s';
          setTimeout(() => alertBox.remove(), 500);
        }, 5000);
        
      }, 1500);
    });
  }
});
