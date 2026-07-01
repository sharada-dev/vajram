import { useCallback, useEffect } from "react";

type Props = { images: string[]; index: number | null; setIndex: (i: number | null) => void };

export default function Lightbox({ images, index, setIndex }: Props) {
  const move = useCallback((d: number) => {
    if (index === null) return;
    setIndex((index + d + images.length) % images.length);
  }, [index, images.length, setIndex]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, move, setIndex]);

  if (index === null) return null;
  return (
    <div className="lightbox" onClick={(e) => { if (e.target === e.currentTarget) setIndex(null); }}>
      <button className="lightbox__btn lightbox__close" aria-label="Close" onClick={() => setIndex(null)}>✕</button>
      <button className="lightbox__btn lightbox__prev" aria-label="Previous" onClick={() => move(-1)}>‹</button>
      <img src={images[index]} alt={`Image ${index + 1}`} />
      <button className="lightbox__btn lightbox__next" aria-label="Next" onClick={() => move(1)}>›</button>
      <div className="lightbox__count">{index + 1} / {images.length}</div>
    </div>
  );
}
