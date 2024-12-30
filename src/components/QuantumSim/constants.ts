export const SYSTEM_CONSTANTS = {
  // Decoherence times (microseconds)
  T1: 50,
  T2: 70,
  
  // Gate fidelities (percentage)
  GATE_FIDELITIES: {
    X: 0.9995,
    H: 0.9990,
    Z: 0.9997,
    Y: 0.9993
  },
  
  // System parameters
  COUPLING_STRENGTH: 20e6, // g (Hz)
  QUBIT_FREQUENCY: 5e9,    // ω (Hz)
  
  // Error boundaries
  ERROR_THRESHOLD: 0.001,
  BUFFER_CAPACITY: 1000
};