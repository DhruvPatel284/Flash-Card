"use client";
import React from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div>
        <div className="w-72 h-48 bg-transparent border border-gray-300 perspective-1000">
        <div className="relative w-full h-full text-center transition-transform duration-700 transform-style-preserve-3d group-hover:transform-rotate-y-180">
            <div className="absolute w-full h-full bg-gray-400 text-black backface-hidden">
            <img src="img_avatar.png" alt="Avatar" className="w-full h-full" />
            </div>
            <div className="absolute w-full h-full bg-blue-500 text-white transform-rotate-y-180 backface-hidden flex flex-col justify-center items-center">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Flashcard;
