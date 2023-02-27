import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function BigText({ children, tag, position }) {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        //start: "center 80%",
        toggleActions: "play complete reverse reset", // see: https://codepen.io/GreenSock/pen/LYVKWGo
        //  scrub: true,
      },
    });

    const mm = gsap.matchMedia();

    mm.add("(max-width: 899px)", () => {
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: -10,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        }
      );
    });

    // Desktop
    mm.add("(min-width: 900px)", () => {
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: -5000,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        }
      );

      tl.fromTo(
        headingRef.current,
        {
          color: "transparent",
          textStroke: "5px #3f00b5",
        },
        {
          textStroke: "0px #3f00b5",
          color: "#3f00b5",
          duration: 0.5,
        }
      );
    });

    //tl.duration(3);
  }, []);

  const HeadingTag = tag || "p";

  var location = "";
  position == "end" ? (location = "lg:text-end ml-auto") : (location = "lg:text-start");

  const classNames = `text-primary max-w-[100%] w-[900px] p-10 lg:py-20 text-center font-extrabold uppercase text-5xl lg:text-9xl ${location}`;
  return (
    <HeadingTag className={classNames} ref={headingRef}>
      {children}
    </HeadingTag>
  );
}
