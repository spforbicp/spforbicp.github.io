const yearNode = document.getElementById("year");
const revealNodes = document.querySelectorAll(".reveal");

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
