import { useState } from 'react';

interface Slide {
  image?: string;
  caption?: string;
}

interface Props {
  slides: Slide[];
}

export default function Carousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent((i) => (i + 1) % slides.length);

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="carousel-slide">
        {slide.image ? (
          <img src={slide.image} alt={slide.caption ?? ''} />
        ) : (
          <div className="carousel-placeholder" />
        )}
        {slide.caption && (
          <p className="carousel-caption">{slide.caption}</p>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button className="carousel-btn left" onClick={prev} aria-label="Previous">
            &#8592;
          </button>
          <button className="carousel-btn right" onClick={next} aria-label="Next">
            &#8594;
          </button>

          <div className="carousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
