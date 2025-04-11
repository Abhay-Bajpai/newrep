import React, { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterPhrase?: number;
  delayBeforeDelete?: number;
  className?: string;
}

export function Typewriter({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterPhrase = 2000,
  delayBeforeDelete = 500,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(() => {}, delayBeforeDelete);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayAfterPhrase);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    delayAfterPhrase,
    delayBeforeDelete,
    deletingSpeed,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
  ]);

  return (
    <div className={`typewriter relative ${className}`}>
      <span>{displayText}</span>
      <span className="absolute right-0 top-0 border-r-2 border-primary h-full animate-blink"></span>
    </div>
  );
}

export default Typewriter;
