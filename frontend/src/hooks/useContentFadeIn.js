import { useState, useEffect } from "react";

// Custom hook for fading in content
export default function useContentFadeIn() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger the content fade-in after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 700); // Adjust the delay as needed

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return showContent;
};