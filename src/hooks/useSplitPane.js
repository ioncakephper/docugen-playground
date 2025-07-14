import { useState, useEffect, useRef, useCallback } from "react";

export function useSplitPane(initialWidth = "50%") {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialWidth);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const stopDrag = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  const onDrag = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeft = Math.max(
        0,
        Math.min(e.clientX - containerRect.left, containerRect.width),
      );
      const newLeftPercent = (newLeft / containerRect.width) * 100;

      setLeftWidth(`${newLeftPercent.toFixed(2)}%`);
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [onDrag, stopDrag]);

  return { containerRef, leftWidth, startDrag };
}
