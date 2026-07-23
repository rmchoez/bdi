"use client";

import { useEffect, useRef, useState } from "react";
import { getPlansPath, type Locale } from "../../lib/i18n/config";
import { Button } from "../ui/Button";

const welcomeVideos: Record<"desktop" | "mobile", Record<Locale, string>> = {
  desktop: {
    en: "https://player.vimeo.com/progressive_redirect/playback/1185712942/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=43f2789ab2483ef206546172c313ab661b2f25e2b2fdf8469ff910d1bed4e4ac",
    es: "https://player.vimeo.com/progressive_redirect/playback/1185712944/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=947ae841d60c59a567bae87aa99bc48d932afe2a6bbbcf1c03f8d4794fdac6e4",
    pt: "https://player.vimeo.com/progressive_redirect/playback/1185712943/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=31b7987cc87656351579430e226d9b0d231c201f4901b65c1c05e93342907acd",
  },
  mobile: {
    en: "https://player.vimeo.com/progressive_redirect/playback/1185713262/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=20fcce4d276da545df54726f4194f79a0d5fef84f63623a787a5780019a09f27",
    es: "https://player.vimeo.com/progressive_redirect/playback/1185713261/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=abb7eff4c3739e85eeb7073aaf15d6a9d7460f81dc9d30a2d5cd534177c37b4e",
    pt: "https://player.vimeo.com/progressive_redirect/playback/1185713260/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=5d94891f28ca3db6bd22d826f641464f535a93b20ffe71490479cdfe6d5c6257",
  },
};

const slides = [
  {
    video: null,
    title: "Welcome to the best of health",
    description: "Discover international health protection created to give you expert guidance, global access and confidence at every stage of life.",
    cta: "Explore our plans",
    href: "#plans",
    embeddedCopy: true,
  },
  {
    video: "https://player.vimeo.com/progressive_redirect/playback/1185609881/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=10a737a928ee827fbce964978c9606332bdb4cd43a68e58746b8e3b70447ab73",
    title: "Premium health insurance designed for life's journeys",
    description: "Global health insurance with international coverage and access to a trusted network of hospitals and medical professionals, no matter where you are.",
    cta: "Find a plan",
    href: "#plans",
    embeddedCopy: false,
  },
  {
    video: "https://player.vimeo.com/progressive_redirect/playback/1181740499/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=a8381ad520d62e9147630bd3840e7b29e4d94dcc75e3a626851b78538c1b3fc3",
    title: "Care you can count on when it matters most",
    description: "We deliver 24/7 medical assistance, coordinated care, and a digital portal that simplifies plan management, ID access, emergencies, treatments and claims.",
    cta: "Connect with a specialist",
    href: "#contact",
    embeddedCopy: false,
  },
  {
    video: "https://player.vimeo.com/progressive_redirect/playback/1183522663/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=79f54128383b9c82767edf8b1c7a8b38a973d56306b3c1e45b928300ecb12e9f",
    title: "Insurance built for global protection and long-term stability",
    description: "Our global health insurance plans offer individuals, families, expatriates and digital nomads comprehensive protection, human-centered care and medical evacuation—backed by strong financial partners and rigorous regulatory standards.",
    cta: "Why choose Best Doctors",
    href: "#about",
    embeddedCopy: false,
  },
];

export function HeroSlider({ locale }: { locale: Locale }) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [readyVideos, setReadyVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeVideo) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } else video.pause();
    });
    const interval = window.setInterval(() => setActiveVideo((current) => (current + 1) % slides.length), 9000);
    return () => window.clearInterval(interval);
  }, [activeVideo]);

  useEffect(() => {
    setReadyVideos({});
    setActiveVideo(0);
  }, [locale]);

  const activeSlide = slides[activeVideo];

  return (
    <section className="hero">
      <div className="hero-video-slider" aria-label="Best Doctors highlights">
        {slides.map((slide, index) => (
          <video
            className={index === activeVideo ? "hero-video active" : "hero-video"}
            key={`${index}-${locale}`}
            ref={(element) => { videoRefs.current[index] = element; }}
            autoPlay={index === 0}
            muted
            loop
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            onCanPlay={() => setReadyVideos((current) => current[index] ? current : { ...current, [index]: true })}
          >
            {index === 0 ? (
              <>
                <source media="(max-width: 768px)" src={welcomeVideos.mobile[locale]} type="video/mp4" />
                <source src={welcomeVideos.desktop[locale]} type="video/mp4" />
              </>
            ) : (
              <source src={slide.video ?? undefined} type="video/mp4" />
            )}
          </video>
        ))}
      </div>
      {!readyVideos[activeVideo] && (
        <div className="hero-loader" role="status" aria-live="polite">
          <span aria-hidden="true" />
          <span className="sr-only">Loading video</span>
        </div>
      )}
      <div className={activeVideo === 0 ? "hero-shade no-shade" : "hero-shade"} />
      {!activeSlide.embeddedCopy && (
        <div className="container hero-content" key={activeVideo}>
          <h1>{activeSlide.title}</h1>
          <p>{activeSlide.description}</p>
          <div className="hero-actions">
            <Button href={activeSlide.href === "#plans" ? getPlansPath(locale) : activeSlide.href}>
              {activeSlide.cta}
            </Button>
          </div>
        </div>
      )}
      <div className="hero-dots" role="tablist" aria-label="Choose hero video">
        {slides.map((_, index) => (
          <button
            className={index === activeVideo ? "active" : ""}
            key={index}
            onClick={() => setActiveVideo(index)}
            aria-label={`Show video ${index + 1}`}
            aria-selected={index === activeVideo}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
