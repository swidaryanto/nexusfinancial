export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export type AuthView = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}