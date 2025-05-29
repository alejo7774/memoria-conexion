import React from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, isOpen, onClose }) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ¡Encontraste un par! 🎉
        </h3>
        
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg mb-6">
          <p className="text-lg font-medium text-gray-800">{question.text}</p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;