import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  small: string;
}

export function Image({ src, small, className, ...props }: IImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(small);

  useEffect(() => {
    if (!src) return;

    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setIsLoaded(true);
        setCurrentSrc(objectURL);
      });
  }, [src]);

  return (
    <img
      className={cn(className, {
        blur: !isLoaded,
      })}
      src={currentSrc}
      loading="lazy"
      {...props}
    />
  );
}
