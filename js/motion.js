/**
 * Motion Controller for TAPMI M3 Student Website
 * Scoped GSAP 3.13, ScrollTrigger & Lenis 1.3.27
 * With full prefers-reduced-motion accessibility & no-JS / CDN fallback
 */

(() => {
  'use strict';

  // Navigation Mobile Menu & Header Behavior
  const header = document.getElementById('nav');
  const menu = document.getElementById('menu');

  if (header && menu) {
    const openButton = header.querySelector('.nav__menu');
    const closeButton = menu.querySelector('.menu__close');
    let lastY = window.scrollY, travel = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      header.classList.toggle('is-solid', y > 24);
      if (Math.sign(delta) !== Math.sign(travel)) travel = 0;
      travel += delta;
      if (y < 120 || travel < -6) {
        header.classList.remove('is-hidden');
      } else if (travel > 6) {
        header.classList.add('is-hidden');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

    const setMenu = open => {
      menu.hidden = !open;
      if (openButton) openButton.setAttribute('aria-expanded', String(open));
      if (open) {
        window.lenis?.stop();
        if (closeButton) closeButton.focus();
      } else {
        window.lenis?.start();
        if (openButton) openButton.focus();
      }
    };

    if (openButton) openButton.addEventListener('click', () => setMenu(true));
    if (closeButton) closeButton.addEventListener('click', () => setMenu(false));
    menu.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Graceful exit: no smooth scrolling, no pinning, elements remain in natural document flow
    return;
  }

  // Check if GSAP & Lenis are available
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    // CDN failure or offline: keep plain HTML/CSS fallback
    return;
  }

  window.gsap.registerPlugin(window.ScrollTrigger);

  // Smooth scroll with Lenis (only when motion is preferred)
  if (typeof window.Lenis !== 'undefined') {
    const lenis = window.lenis = new window.Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9
    });
    lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add(time => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
  }

  // Horizontal Curriculum track pinning (#course)
  const courseSection = document.getElementById('course');
  if (courseSection && window.innerWidth >= 900) {
    const stage = courseSection.querySelector('.course__stage');
    const track = courseSection.querySelector('.course__track');
    const squares = [...courseSection.querySelectorAll('.weeks > li')];

    if (stage && track) {
      const distance = () => Math.max(0, track.offsetWidth - stage.clientWidth);
      const timeline = window.gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'course-horizontal',
          trigger: stage,
          start: 'top 80px',
          end: () => `+=${Math.round(distance() * 1.15)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });
      timeline.fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1 }, 0);
      squares.forEach((sq, i) => {
        timeline.fromTo(sq, { '--fill': 0 }, { '--fill': 1, duration: 0.05, ease: 'power2.out' }, (i / squares.length) * 0.95);
      });
    }
  }

  // Sticky Programme Stack (#projects)
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    const cards = [...projectsSection.querySelectorAll('.proj')];
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      window.gsap.fromTo(card,
        { scale: 1, rotation: 0, filter: 'brightness(1)' },
        {
          scale: 0.9,
          rotation: -2,
          filter: 'brightness(0.7)',
          ease: 'none',
          scrollTrigger: {
            id: `proj-stack-${i + 1}`,
            trigger: next,
            start: 'top bottom',
            end: 'top 120px',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    });
  }

  // Mentors viewer image swap (#mentors)
  const mentorsSection = document.getElementById('mentors');
  if (mentorsSection) {
    const shots = [...mentorsSection.querySelectorAll('.viewer__shot')];
    mentorsSection.querySelectorAll('.mentor').forEach((person, i) => {
      const shot = shots[i];
      if (!i || !shot) return;
      window.gsap.timeline({
        scrollTrigger: {
          id: `mentor-shot-${i + 1}`,
          trigger: person,
          start: 'top 75%',
          end: 'top 45%',
          scrub: 0.4,
          invalidateOnRefresh: true
        }
      })
      .fromTo(shot, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut' }, 0)
      .fromTo(shot.querySelector('img'), { scale: 1.15 }, { scale: 1, ease: 'power2.out' }, 0);
    });
  }

  // Dealt fee cards (#fees)
  const feesSection = document.getElementById('fees');
  if (feesSection && window.innerWidth >= 900) {
    const plans = [...feesSection.querySelectorAll('.plan')];
    const grid = feesSection.querySelector('.plans');
    if (plans.length && grid) {
      const turns = [-4, 2, 6];
      plans.forEach((plan, i) => {
        window.gsap.fromTo(plan, {
          y: 40 + i * 15,
          rotation: turns[i % turns.length]
        }, {
          y: 0,
          rotation: 0,
          ease: 'power2.out',
          scrollTrigger: {
            id: `fee-plan-${i + 1}`,
            trigger: grid,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
      });
    }
  }

  // Contact planes entrance (#contact)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const planes = contactSection.querySelectorAll('.contact__planes > .plane');
    if (planes.length) {
      window.gsap.fromTo(planes, { '--k': 0 }, {
        '--k': 1,
        stagger: 0.1,
        ease: 'power2.inOut',
        scrollTrigger: {
          id: 'contact-planes',
          trigger: contactSection,
          start: 'top 90%',
          end: 'center 60%',
          scrub: 0.6
        }
      });
    }
  }

  // Refresh triggers on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.ScrollTrigger.refresh();
    }, 250);
  });
})();
