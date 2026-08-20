// FrameThree — shared behavior across all pages

// Mobile nav toggle
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });
})();

// Fade-in on scroll
(function () {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (item) { observer.observe(item); });
})();

// Graceful fallback for missing images (until real photos are dropped into /photos)
// Also tries the alternate .jpg / .jpeg extension before giving up, since
// photo filenames sometimes get added with a different extension than the spec.
(function () {
  const altExt = { jpg: 'jpeg', jpeg: 'jpg' };

  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      const match = img.src.match(/\.(jpg|jpeg)$/i);
      if (match && !img.dataset.extTried) {
        img.dataset.extTried = '1';
        img.src = img.src.replace(/\.(jpg|jpeg)$/i, '.' + altExt[match[1].toLowerCase()]);
        return;
      }
      img.closest('.gallery-item')?.classList.add('img-missing');
      img.style.display = 'none';
    });
  });
})();
