"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Flashcard } from "@/utils/types"; 
import { isAuthenticated } from "@/components/Navbar";

export default function Dashboard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editCard, setEditCard] = useState<Flashcard | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
          return;
        }
        // console.log(response.data)
        // const { userId } = response.data.userId;
        // console.log("Fetching flashcards for AdminId:", userId);
        const resp = await axios.post(`/api/Admin/getFlash`, {
          AdminId: response.data.user.userId 
        });

        setFlashcards(resp.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.post(`/api/FlashCard/deleteFlashcard`, {
        id: id 
      });
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };
  

  const handleUpdate = async () => {
    if (editCard) {
      try {
        await axios.put(`/api/FlashCard/updateFlashcard`, editCard);
        setFlashcards(flashcards.map(flashcard => flashcard.id === editCard.id ? editCard : flashcard));
        setEditCard(null);
        setIsUpdating(false);
      } catch (error) {
        console.error("Error updating flashcard:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{flashcard.question}</h2>
              <button
                onClick={() => handleDelete(flashcard.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="mb-2">{flashcard.answer}</p>
            <button
              onClick={() => {
                setEditCard(flashcard);
                setIsUpdating(true);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              Update
            </button>
          </div>
        ))}
      </div>
      {isUpdating && editCard && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Update Flashcard</h2>
            <input
              type="text"
              value={editCard.question}
              onChange={(e) => setEditCard({ ...editCard, question: e.target.value })}
              className="border p-2 mb-4 w-full rounded-md"
              placeholder="Question"
            />
            <textarea
              value={editCard.answer}
              onChange={(e) => setEditCard({ ...editCard, answer: e.target.value })}
              className="border p-2 mb-4 w-full rounded-md"
              placeholder="Answer"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsUpdating(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
