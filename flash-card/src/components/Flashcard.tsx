// components/Flashcard.tsx
import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full max-w-sm mx-auto my-4"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-64 bg-white shadow-lg rounded-lg cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className={`p-6 text-center flex items-center justify-center h-full rounded-lg bg-blue-600 text-white overflow-auto ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-lg font-bold">{question}</h3>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`p-6 text-center flex items-center justify-center h-full rounded-lg bg-blue-800 text-white overflow-auto ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-lg">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
