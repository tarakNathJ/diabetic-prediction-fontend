export const initIntersectionObserver = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
};

export const addRippleEffect = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple-effect');
  
  button.appendChild(ripple);
  
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
};

export const parallaxScroll = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = -(scrolled * Number(speed));
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    });
  });
};

export const animateCounter = (element: HTMLElement, target: number, duration: number) => {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  
  const updateCounter = () => {
    start += increment;
    element.textContent = Math.floor(start).toString();
    
    if (start < target) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toString();
    }
  };
  
  requestAnimationFrame(updateCounter);
};