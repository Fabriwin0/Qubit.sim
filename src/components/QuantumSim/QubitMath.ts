import { ComplexNumber, QubitState, QuantumGate } from './types';

export class QubitMath {
  // Initialize qubit to |0⟩ state
  static initializeQubit(): QubitState {
    return {
      alpha: { real: 1, imag: 0 },
      beta: { real: 0, imag: 0 }
    };
  }

  // Apply quantum gate to qubit state
  static applyGate(state: QubitState, gate: QuantumGate): QubitState {
    const [a00, a01, a10, a11] = gate.matrix;
    
    return {
      alpha: this.add(
        this.multiply(a00, state.alpha),
        this.multiply(a01, state.beta)
      ),
      beta: this.add(
        this.multiply(a10, state.alpha),
        this.multiply(a11, state.beta)
      )
    };
  }

  // Calculate measurement probabilities
  static getMeasurementProbabilities(state: QubitState): { p0: number; p1: number } {
    const p0 = this.mod2(state.alpha);
    const p1 = this.mod2(state.beta);
    return { p0, p1 };
  }

  // Convert qubit state to Bloch sphere coordinates
  static toBlochCoordinates(state: QubitState): { x: number; y: number; z: number } {
    const theta = 2 * Math.acos(Math.sqrt(this.mod2(state.alpha)));
    const phi = Math.atan2(state.beta.imag, state.beta.real);
    
    return {
      x: Math.sin(theta) * Math.cos(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(theta)
    };
  }

  private static multiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
  }

  private static add(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
      real: a.real + b.real,
      imag: a.imag + b.imag
    };
  }

  private static mod2(c: ComplexNumber): number {
    return c.real * c.real + c.imag * c.imag;
  }
}