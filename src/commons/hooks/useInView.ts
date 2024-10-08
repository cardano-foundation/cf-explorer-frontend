import { useEffect, useState, useRef } from "react";
const useInView = (offset = 0.5) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.intersectionRatio >= offset);
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: offset // Tỷ lệ phần tử hiển thị
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [offset]);

  return [ref, inView];
};

export default useInView;
