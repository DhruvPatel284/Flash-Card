"use client";
import React, { useEffect, useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">All Flashcards</h1>
          <div className="flex flex-wrap justify-center">
            {flashcards.map((flashcard) => (
              <Flashcard
                key={flashcard.id}
                question={flashcard.question}
                answer={flashcard.answer}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
