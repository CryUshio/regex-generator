import path from 'path';
import { defineConfig } from '@solidjs/start/config';
import AutoImport from 'unplugin-auto-import/vite';
// import Solid from "unplugin-solid/vite";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import customIcons from './public/icons';

const srcPath = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  start: {
    ssr: true,
    // middleware: './src/middlewares',
    // server: {
    //   prerender: {
    //     crawlLinks: true,
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8089',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  css: {
    // preprocessorOptions: {
    //   less: {
    //     charset: false,
    //     additionalData: '@import "./src/assets/css/mixins.less";',
    //   },
    // },
  },
  plugins: [
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'x',
          extension: 'jsx',
          customCollections: ['icon'],
        }),
      ],
    }),
    Icons({
      compiler: 'solid',
      // autoInstall: true,
      customCollections: {
        icon: customIcons,
      },
    }),
  ],
});
