const yearNode = document.getElementById("year");
const revealNodes = document.querySelectorAll(".reveal");
const sectionLinks = document.querySelectorAll('a[href^="#"]');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealNodes.forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
  observer.observe(node);
});

const scrollToTarget = (hash, behavior = "smooth") => {
  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior,
    block: "start",
  });
};

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash) {
      return;
    }

    event.preventDefault();
    scrollToTarget(hash);
    window.history.replaceState(null, "", window.location.pathname);
  });
});

if (window.location.hash) {
  const initialHash = window.location.hash;

  window.addEventListener(
    "load",
    () => {
      scrollToTarget(initialHash, "auto");
      window.history.replaceState(null, "", window.location.pathname);
    },
    { once: true }
  );
}
