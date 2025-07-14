import React, { useState } from 'react';
import { HelpCircle, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { TutorialLevel } from './tutorialData';

interface ConceptExplainerProps {
  level: TutorialLevel;
}

interface Concept {
  id: string;
  name: string;
  explanations: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  analogies: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  keyPoints: string[];
}

const concepts: Concept[] = [
  {
    id: 'superposition',
    name: 'Superposition',
    explanations: {
      beginner: 'A quantum particle can be in multiple states at the same time, like a coin spinning in the air before it lands.',
      intermediate: 'Quantum superposition allows particles to exist in a combination of all possible states simultaneously until measured.',
      advanced: 'Superposition is described mathematically as a linear combination of basis states, where the coefficients determine probability amplitudes.'
    },
    analogies: {
      beginner: 'Like a spinning coin that is both heads and tails until it stops spinning.',
      intermediate: 'Similar to a wave that can be at multiple positions along its path simultaneously.',
      advanced: 'Analogous to a vector in Hilbert space representing all possible measurement outcomes.'
    },
    keyPoints: [
      'Particles exist in multiple states simultaneously',
      'Measurement causes the superposition to collapse',
      'Enables quantum parallelism in computation'
    ]
  },
  {
    id: 'entanglement',
    name: 'Quantum Entanglement',
    explanations: {
      beginner: 'Two particles become connected so that measuring one instantly affects the other, no matter how far apart they are.',
      intermediate: 'Entangled particles share quantum states such that the measurement of one particle determines the state of its partner.',
      advanced: 'Entanglement creates non-local correlations between quantum systems that cannot be explained by classical physics.'
    },
    analogies: {
      beginner: 'Like having two magical coins that always land on opposite sides when flipped.',
      intermediate: 'Similar to having two synchronized dancers who mirror each other\'s moves instantly.',
      advanced: 'Comparable to correlated variables in a joint probability distribution with non-classical correlations.'
    },
    keyPoints: [
      'Creates instant correlations between distant particles',
      'Foundation for quantum communication and computing',
      'Violates classical locality principles'
    ]
  },
  {
    id: 'measurement',
    name: 'Quantum Measurement',
    explanations: {
      beginner: 'Looking at a quantum particle forces it to "choose" one specific state, destroying its quantum properties.',
      intermediate: 'Measurement collapses the quantum wavefunction, yielding a definite result with probabilities determined by the quantum state.',
      advanced: 'Measurement is described by projection operators that map the quantum state onto eigenstates of the observable.'
    },
    analogies: {
      beginner: 'Like opening a box with a cat that was both sleeping and awake until you looked.',
      intermediate: 'Similar to taking a photograph of a moving object, freezing it in one position.',
      advanced: 'Analogous to projecting a vector onto a specific basis in vector space.'
    },
    keyPoints: [
      'Fundamentally changes the quantum system',
      'Results are probabilistic, not deterministic',
      'Cannot be reversed once performed'
    ]
  }
];

export function ConceptExplainer({ level }: ConceptExplainerProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [showAnalogy, setShowAnalogy] = useState(false);

  const concept = concepts.find(c => c.id === selectedConcept);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Concept Explorer</h3>
      </div>

      <div className="space-y-3 mb-4">
        {concepts.map((concept) => (
          <button
            key={concept.id}
            onClick={() => setSelectedConcept(concept.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedConcept === concept.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span className="font-medium">{concept.name}</span>
            </div>
          </button>
        ))}
      </div>

      {concept && (
        <div className="border-t border-gray-700 pt-4">
          <div className="mb-4">
            <h4 className="font-semibold text-white mb-2">{concept.name}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {concept.explanations[level]}
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowAnalogy(false)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                !showAnalogy ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-1" />
              Explanation
            </button>
            <button
              onClick={() => setShowAnalogy(true)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showAnalogy ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Lightbulb className="w-4 h-4 inline mr-1" />
              Analogy
            </button>
          </div>

          {showAnalogy && (
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mb-4">
              <p className="text-purple-200 text-sm italic">
                {concept.analogies[level]}
              </p>
            </div>
          )}

          <div>
            <h5 className="font-medium text-white mb-2">Key Points:</h5>
            <ul className="space-y-1">
              {concept.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <ArrowRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!selectedConcept && (
        <div className="text-center text-gray-400 py-8">
          <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select a concept above to explore it</p>
        </div>
      )}
    </div>
  );
}