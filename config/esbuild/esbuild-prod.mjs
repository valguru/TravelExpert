import esbuild from 'esbuild';
import { config } from './esbuild.mjs';

esbuild
  .build(config)
  .then(() => console.log('⚡ Build complete! ⚡'))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
