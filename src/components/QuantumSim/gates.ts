import { ComplexNumber, QuantumGate } from './types';

// Common quantum gates
export const gates: Record<string, QuantumGate> = {
  X: {
    name: 'Pauli-X',
    matrix: [
      { real: 0, imag: 0 }, { real: 1, imag: 0 },
      { real: 1, imag: 0 }, { real: 0, imag: 0 }
    ]
  },
  H: {
    name: 'Hadamard',
    matrix: [
      { real: 1/Math.sqrt(2), imag: 0 }, { real: 1/Math.sqrt(2), imag: 0 },
      { real: 1/Math.sqrt(2), imag: 0 }, { real: -1/Math.sqrt(2), imag: 0 }
    ]
  },
  Z: {
    name: 'Pauli-Z',
    matrix: [
      { real: 1, imag: 0 }, { real: 0, imag: 0 },
      { real: 0, imag: 0 }, { real: -1, imag: 0 }
    ]
  },
  Y: {
    name: 'Pauli-Y',
    matrix: [
      { real: 0, imag: 0 }, { real: 0, imag: -1 },
      { real: 0, imag: 1 }, { real: 0, imag: 0 }
    ]
  }
};