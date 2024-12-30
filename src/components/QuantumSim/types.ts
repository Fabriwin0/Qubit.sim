export type ComplexNumber = {
  real: number;
  imag: number;
};

export type QubitState = {
  alpha: ComplexNumber;
  beta: ComplexNumber;
  theta: number;    // Polar angle
  phi: number;      // Azimuthal angle
  timestamp: number;
};

export type QuantumGate = {
  name: string;
  matrix: [ComplexNumber, ComplexNumber, ComplexNumber, ComplexNumber];
  fidelity: number;
};

export type MeasurementResult = {
  probabilities: { p0: number; p1: number };
  fidelity: number;
  timestamp: number;
};

export type SystemMetrics = {
  bufferUtilization: number;
  responseTime: number;
  errorRate: number;
  coherenceTime: number;
};