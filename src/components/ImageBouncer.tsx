import { memo, useEffect, useRef } from "react";

import styles from "./ImageBouncer.module.css";

export type ImageBouncerProps = { src: string };

export const ImageBouncer: React.FC<ImageBouncerProps> = memo(({ src }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const idRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    clearTimeout(idRef.current);

    idRef.current = setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.src = src;

        imgRef.current.onload = () => {
          if (imgRef.current) {
            imgRef.current.style.opacity = "1";
          }
        };
      }
    }, 500);

    return () => {
      clearTimeout(idRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img ref={imgRef} className={styles.image} />
    </div>
  );
});
