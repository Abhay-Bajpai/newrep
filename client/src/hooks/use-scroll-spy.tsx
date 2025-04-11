import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const listener = () => {
      const scrollPosition = window.scrollY + offset;

      const elements = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: 0, bottom: 0 };
          
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return {
            id,
            top,
            bottom: top + rect.height,
          };
        })
        .filter((item) => item.top && item.bottom);

      for (let i = elements.length - 1; i >= 0; i--) {
        const { id, top, bottom } = elements[i];
        if (scrollPosition >= top && scrollPosition <= bottom) {
          setActiveId(id);
          return;
        }
      }

      if (elements.length > 0 && scrollPosition < elements[0].top) {
        setActiveId(elements[0].id);
      } else if (
        elements.length > 0 && 
        scrollPosition > elements[elements.length - 1].bottom
      ) {
        setActiveId(elements[elements.length - 1].id);
      }
    };

    listener();
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [ids, offset]);

  return activeId;
}

export default useScrollSpy;
