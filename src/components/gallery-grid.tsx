"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Photo } from "@/data";
import { asset } from "@/lib/utils";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) dlg.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <li key={photo.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-lg"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={asset(photo.src)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
            {photo.exif && <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">{photo.exif}</p>}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
        aria-label="Photo viewer"
      >
        {current && (
          <figure className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-3 p-4">
            <Image
              src={asset(current.src)}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-[82dvh] w-auto max-w-full object-contain"
            />
            <figcaption className="font-mono text-xs text-white/70">
              {current.exif ?? current.alt} · {index! + 1}/{photos.length}
            </figcaption>
            <Button variant="ghost" size="icon" onClick={close} aria-label="Close" className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white">
              <X />
            </Button>
            {photos.length > 1 && (
              <>
                <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 text-white hover:bg-white/10 hover:text-white">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 text-white hover:bg-white/10 hover:text-white">
                  <ChevronRight />
                </Button>
              </>
            )}
          </figure>
        )}
      </dialog>
    </>
  );
}
