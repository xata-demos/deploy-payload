import * as migration_20260902_201921_initial from './20260902_201921_initial';

export const migrations = [
  {
    up: migration_20260902_201921_initial.up,
    down: migration_20260902_201921_initial.down,
    name: '20260902_201921_initial'
  },
];
