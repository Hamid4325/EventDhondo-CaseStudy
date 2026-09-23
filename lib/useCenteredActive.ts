import { useEffect, useRef, useState } from "react";

export function useCenteredActive(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  const ref = (node: HTMLElement | null, index: number) => {
    refs.current[index] = node;
  };

  return { active, ref };
}
