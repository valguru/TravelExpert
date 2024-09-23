import esbuild from 'esbuild';
import { config } from './esbuild.mjs';

const run = async () => {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('Watching for changes...');
};

run();
