import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function BigText({ children, tag }) {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(headingRef.current, {
      x: 100,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  const HeadingTag = tag || "h1";

  return (
    <HeadingTag className="heading text-center lg:text-start font-extrabold text-primary uppercase mb-10 text-5xl lg:text-9xl" ref={headingRef}>
      {children}
    </HeadingTag>
  );
}
