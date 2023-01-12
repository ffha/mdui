import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import tsconfig from './src/tsconfig.json' assert { type: 'json' };
import pkg from './package.json' assert { type: 'json' };

delete tsconfig.compilerOptions.declaration;
delete tsconfig.compilerOptions.declarationDir;
delete tsconfig.compilerOptions.outDir;

const banner = `
/*!
 * mdui ${pkg.version} (${pkg.homepage})
 * Copyright 2016-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim();

export default [
  // 编译测 ES6 模块化文件
  {
    input: './src/index.ts',
    output: {
      strict: true,
      name: 'mdui',
      banner,
      sourcemap: true,
      format: 'es',
      file: './dist/js/mdui.esm.js',
    },
    plugins: [nodeResolve(), typescript(tsconfig.compilerOptions)],
  },

  // 编译成 umd 文件
  {
    input: './src/index.ts',
    output: {
      strict: true,
      name: 'mdui',
      banner,
      sourcemap: true,
      format: 'umd',
      file: './dist/js/mdui.js',
    },
    plugins: [
      nodeResolve(),
      typescript(tsconfig.compilerOptions),
      babel({ babelHelpers: 'bundled' })
    ],
  },

  // 编译成 umd 文件，并压缩
  {
    input: './src/index.ts',
    output: {
      strict: true,
      name: 'mdui',
      banner,
      sourcemap: true,
      format: 'umd',
      file: './dist/js/mdui.min.js',
    },
    plugins: [
      nodeResolve(),
      typescript(tsconfig.compilerOptions),
      babel({ babelHelpers: 'bundled' }),
      terser()
    ],
  },
];
