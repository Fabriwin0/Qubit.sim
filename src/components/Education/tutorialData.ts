export type TutorialLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  interactiveElement?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: TutorialLevel;
  difficulty: number; // 1-5 stars
  estimatedTime: string;
  prerequisites: string[];
  hasInteractiveDemo: boolean;
  hasQuiz: boolean;
  steps: TutorialStep[];
  learningObjectives: string[];
}

export const tutorials: Tutorial[] = [
  {
    id: 'quantum-basics',
    title: 'Introduction to Quantum Mechanics',
    description: 'Learn the fundamental concepts of quantum mechanics and how they differ from classical physics.',
    level: 'beginner',
    difficulty: 1,
    estimatedTime: '15 minutes',
    prerequisites: [],
    hasInteractiveDemo: true,
    hasQuiz: true,
    learningObjectives: [
      'Understand what makes quantum mechanics different from classical physics',
      'Learn about wave-particle duality',
      'Grasp the concept of quantum states'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Welcome to the Quantum World',
        content: `Quantum mechanics is the branch of physics that describes the behavior of matter and energy at the smallest scales. Unlike the predictable world we see around us, the quantum world is full of surprises.

In our everyday experience, objects have definite properties - a ball is either moving or stationary, a light is either on or off. But in the quantum world, particles can exist in multiple states simultaneously until we observe them.

This strange behavior isn't just theoretical - it's the foundation for technologies like lasers, MRI machines, and the quantum computers being developed today.`
      },
      {
        id: 'wave-particle',
        title: 'Wave-Particle Duality',
        content: `One of the most mind-bending aspects of quantum mechanics is that particles can behave like waves, and waves can behave like particles.

Think of light: sometimes it acts like a wave (creating interference patterns), and sometimes like particles (photons hitting a detector one by one). This isn't because we don't understand light well enough - it's a fundamental property of quantum objects.

This duality is what allows quantum computers to process information in ways that classical computers cannot.`
      }
    ]
  },
  {
    id: 'superposition',
    title: 'Quantum Superposition',
    description: 'Explore how quantum particles can exist in multiple states simultaneously and what this means for quantum computing.',
    level: 'beginner',
    difficulty: 2,
    estimatedTime: '20 minutes',
    prerequisites: ['quantum-basics'],
    hasInteractiveDemo: true,
    hasQuiz: true,
    learningObjectives: [
      'Understand the principle of superposition',
      'Learn how superposition enables quantum parallelism',
      'See superposition visualized on the Bloch sphere'
    ],
    steps: [
      {
        id: 'superposition-intro',
        title: 'What is Superposition?',
        content: `Superposition is perhaps the most famous and counterintuitive concept in quantum mechanics. It means that a quantum particle can be in multiple states at the same time.

Imagine flipping a coin. In classical physics, the coin is either heads or tails. But a quantum "coin" (like an electron's spin) can be both heads AND tails simultaneously until you measure it.

This isn't just a limitation of our knowledge - the particle genuinely exists in both states at once. This is what Einstein famously called "spooky" about quantum mechanics.`,
        quiz: {
          question: 'What happens when you measure a quantum particle in superposition?',
          options: [
            'Nothing changes, it stays in superposition',
            'The superposition collapses to one definite state',
            'The particle disappears',
            'It creates two identical particles'
          ],
          correctAnswer: 1,
          explanation: 'Measurement causes the quantum superposition to collapse, forcing the particle into one definite state. This is called "wavefunction collapse."'
        }
      }
    ]
  },
  {
    id: 'bloch-sphere',
    title: 'The Bloch Sphere',
    description: 'Learn to visualize quantum states using the Bloch sphere representation.',
    level: 'intermediate',
    difficulty: 3,
    estimatedTime: '25 minutes',
    prerequisites: ['quantum-basics', 'superposition'],
    hasInteractiveDemo: true,
    hasQuiz: true,
    learningObjectives: [
      'Understand the Bloch sphere as a visualization tool',
      'Learn to interpret quantum states geometrically',
      'Connect mathematical formalism to visual representation'
    ],
    steps: [
      {
        id: 'bloch-intro',
        title: 'Visualizing Quantum States',
        content: `The Bloch sphere is a powerful way to visualize the state of a single qubit. Every possible quantum state of a qubit can be represented as a point on or inside this sphere.

The north pole represents the |0⟩ state, the south pole represents |1⟩, and points on the equator represent equal superpositions of |0⟩ and |1⟩. The position on the sphere tells us both the probability of measuring 0 or 1, and the relative phase between the states.

This geometric representation makes it much easier to understand how quantum gates transform quantum states.`
      }
    ]
  },
  {
    id: 'quantum-gates',
    title: 'Quantum Gates and Operations',
    description: 'Discover how quantum gates manipulate quantum states and form the building blocks of quantum circuits.',
    level: 'intermediate',
    difficulty: 3,
    estimatedTime: '30 minutes',
    prerequisites: ['bloch-sphere'],
    hasInteractiveDemo: true,
    hasQuiz: true,
    learningObjectives: [
      'Understand what quantum gates are and how they work',
      'Learn about common quantum gates (X, H, Z, Y)',
      'See how gates transform states on the Bloch sphere'
    ],
    steps: [
      {
        id: 'gates-intro',
        title: 'What are Quantum Gates?',
        content: `Quantum gates are the basic operations we can perform on qubits. Unlike classical logic gates that have definite inputs and outputs, quantum gates perform reversible transformations on quantum states.

Each gate can be represented as a rotation on the Bloch sphere. For example:
- The X gate flips a qubit (like a classical NOT gate)
- The H (Hadamard) gate creates superposition
- The Z gate changes the phase of the |1⟩ state

These gates are the building blocks of quantum algorithms.`
      }
    ]
  },
  {
    id: 'entanglement',
    title: 'Quantum Entanglement',
    description: 'Explore the mysterious phenomenon of quantum entanglement and its applications.',
    level: 'advanced',
    difficulty: 4,
    estimatedTime: '35 minutes',
    prerequisites: ['quantum-gates'],
    hasInteractiveDemo: false,
    hasQuiz: true,
    learningObjectives: [
      'Understand quantum entanglement and non-locality',
      'Learn about Bell states and EPR pairs',
      'Explore applications in quantum communication'
    ],
    steps: [
      {
        id: 'entanglement-intro',
        title: 'Spooky Action at a Distance',
        content: `Quantum entanglement is perhaps the most mysterious aspect of quantum mechanics. When two particles become entangled, measuring one instantly affects the other, regardless of the distance between them.

Einstein called this "spooky action at a distance" and was deeply uncomfortable with it. However, experiments have repeatedly confirmed that entanglement is real and plays a crucial role in quantum technologies.

Entanglement is the key to quantum communication, quantum cryptography, and many quantum computing algorithms.`
      }
    ]
  },
  {
    id: 'measurement',
    title: 'Quantum Measurement',
    description: 'Understand the fundamental role of measurement in quantum mechanics and its probabilistic nature.',
    level: 'intermediate',
    difficulty: 3,
    estimatedTime: '25 minutes',
    prerequisites: ['superposition'],
    hasInteractiveDemo: true,
    hasQuiz: true,
    learningObjectives: [
      'Understand the measurement postulate',
      'Learn about measurement bases and outcomes',
      'Explore the measurement problem in quantum mechanics'
    ],
    steps: [
      {
        id: 'measurement-intro',
        title: 'The Act of Observation',
        content: `Measurement is what connects the quantum world to our classical experience. When we measure a quantum system, we force it to "choose" a definite state from all its possible superposition states.

The outcome is fundamentally random - we can only predict probabilities, not definite results. This randomness isn't due to our ignorance; it's a fundamental feature of quantum mechanics.

Understanding measurement is crucial because it's how we extract information from quantum computers.`
      }
    ]
  }
];

// Quiz questions for different tutorials
export const quizQuestions = {
  'quantum-basics': [
    {
      id: 'q1',
      question: 'What makes quantum mechanics fundamentally different from classical physics?',
      options: [
        'Quantum objects are smaller',
        'Quantum objects can exist in multiple states simultaneously',
        'Quantum objects move faster',
        'Quantum objects are invisible'
      ],
      correctAnswer: 1,
      explanation: 'The key difference is superposition - quantum objects can exist in multiple states at once, unlike classical objects which have definite properties.',
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'What is wave-particle duality?',
      options: [
        'Particles that look like waves',
        'The idea that quantum objects can behave as both waves and particles',
        'Waves that are made of particles',
        'A mathematical trick with no physical meaning'
      ],
      correctAnswer: 1,
      explanation: 'Wave-particle duality means quantum objects exhibit both wave-like and particle-like properties depending on how we observe them.',
      difficulty: 'medium' as const
    }
  ],
  'superposition': [
    {
      id: 'q1',
      question: 'A qubit in superposition is:',
      options: [
        'Definitely in state |0⟩',
        'Definitely in state |1⟩',
        'In both |0⟩ and |1⟩ states simultaneously',
        'Switching rapidly between |0⟩ and |1⟩'
      ],
      correctAnswer: 2,
      explanation: 'Superposition means the qubit genuinely exists in both states at the same time, not switching between them.',
      difficulty: 'easy' as const
    }
  ]
};