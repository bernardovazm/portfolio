import { useEffect } from "react";

// Função de smooth scroll reutilizável
export const smoothScrollTo = (targetPosition: number) => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    // Implementação de smooth scroll personalizada para elementos
    const smoothScrollToElement = (element: Element) => {
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      smoothScrollTo(targetPosition);
    };

    // Intercepta todos os cliques em links que começam com #
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            smoothScrollToElement(targetElement);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};
