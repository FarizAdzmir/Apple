import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  useEffect(() => {
    // Set default GSAP ScrollTrigger options
    ScrollTrigger.defaults({
      fastScrollEnd: true,
      ignoreMobileResize: true,
    });

    gsap.to("#slider", {
      transform: `translateX(${-100 * video.videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    // ScrollTrigger setup to play video when in view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        start: "top center", // Trigger when video is in the center of viewport
        toggleActions: "play none none none", // Play video when it comes into view
        scrub: true, // Smooth animation when scrolling
        onEnter: () => {
          let currentVideo = videoRef.current[video.videoId];
          if (currentVideo) {
            currentVideo.muted = true;
            currentVideo.playsInline = true;
            currentVideo.play().catch(err => console.warn("Autoplay blocked:", err));
          }
        },
      },
    });

    // Refresh ScrollTrigger on resize for dynamic content
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, [video.videoId]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo({ isEnd: false, startPlay: false, videoId: 0, isLastVideo: false, isPlaying: false });
        break;
      case "pause":
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  muted
                  preload="auto"
                  ref={(el) => (videoRef.current[i] = el)}
                  className={`${list.id === 2 ? "translate-x-44" : ""} pointer-events-none`}
                  onEnded={() => (i !== hightlightsSlides.length - 1 ? handleProcess("video-end", i) : handleProcess("video-last"))}
                  onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={video.isLastVideo ? replayImg : !video.isPlaying ? playImg : pauseImg}
            alt={video.isLastVideo ? "replay" : !video.isPlaying ? "play" : "pause"}
            onClick={
              video.isLastVideo ? () => handleProcess("video-reset") : !video.isPlaying ? () => handleProcess("play") : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
