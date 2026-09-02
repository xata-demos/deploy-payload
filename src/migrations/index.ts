import * as migration_20260902_201921_initial from './20260902_201921_initial';
import * as migration_20260902_203232_add_username from './20260902_203232_add_username';

export const migrations = [
  {
    up: migration_20260902_201921_initial.up,
    down: migration_20260902_201921_initial.down,
    name: '20260902_201921_initial',
  },
  {
    up: migration_20260902_203232_add_username.up,
    down: migration_20260902_203232_add_username.down,
    name: '20260902_203232_add_username'
  },
];
