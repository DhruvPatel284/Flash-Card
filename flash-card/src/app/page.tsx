"use client";
// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Flashcard from '@/components/Flashcard';
import axios from 'axios';

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

const Home: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch flashcards from API
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('/api/FlashCard/getFlashcard'); // Adjust the endpoint as needed
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black">
    <Navbar />
    <main className="p-6 flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Guess the Answer and Check it</h1>
      {flashcards.length > 0 && (
        <div className="w-full max-w-md mt-10">
          <Flashcard
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
          />
        </div>
      )}
      <div className="flex justify-between w-full max-w-md mt-10">
        {currentIndex > 0 && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={handlePrev}
          >
            &larr; Previous
          </button>
        )}
        {/* Conditional rendering for the Next button */}
        {currentIndex < flashcards.length - 1 && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        )}
      </div>
    </main>
  </div>
  );
};

export default Home;
