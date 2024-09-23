import { sassPlugin } from 'esbuild-sass-plugin';

const mode = process.env.MODE || 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

const reloadInfoPlugin = {
  name: 'rebuild-log',
  setup({ onStart, onEnd }) {
    var t;
    onStart(() => {
      t = Date.now();
    });
    onEnd(() => {
      console.log('build finished in', Date.now() - t, 'ms');
    });
  },
};

export const config = {
  entryPoints: ['app/javascript/*.*'],
  outdir: 'app/assets/builds',
  // entryNames: 'bundle',
  bundle: true,
  loader: {
    '.js': 'jsx',
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
  },
  minify: isProd,
  sourcemap: isDev,
  format: 'esm',
  publicPath: '/assets',
  plugins: [
    sassPlugin({
      filter: /\.module\.scss$/,
      type: 'local-css',
    }),
    sassPlugin({
      filter: /\.scss$/,
      type: 'css',
    }),
    reloadInfoPlugin,
  ],
};
