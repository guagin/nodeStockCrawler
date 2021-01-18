import { resolve } from "path";

import { DEFAULT_EXTENSIONS } from "@babel/core";
import dotenv from "dotenv";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import clear from "rollup-plugin-clear";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import run from "rollup-plugin-run";
import typescript from "rollup-plugin-typescript2";

const rootDir = resolve(__dirname);
const distDir = resolve(rootDir, "dist");
const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".json"];

const envFile = process.env.ENVFILE || ".env";
dotenv.config({ path: resolve(rootDir, envFile) });

const isProduction = process.env.NODE_ENV === "production";
const isWatching = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/startup.ts",
  output: {
    file: resolve(distDir, "startup.js"),
    format: "cjs",
    sourcemap: true,
  },
  external: [],
  plugins: [
    clear({ targets: [distDir], watch: isWatching }),

    cleanup({
      comments: isProduction ? "none" : "all",
      sourcemap: true,
    }),

    // Allows node_modules resolution
    nodeResolve({ extensions }),

    json({ compact: true }),

    autoExternal({ dependencies: true, peerDependencies: true }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs({
      transformMixedEsModules: true,
      // namedExports: {
      //   'node_modules/graphql-tools/dist/index.js': [
      //     'addMockFunctionsToSchema',
      //     'makeExecutableSchema',
      //   ],
      // },
    }),

    typescript({
      objectHashIgnoreUnknownHack: true,
    }),

    // Compile TypeScript/JavaScript files
    babel({
      exclude: "node_modules/**",
      // include: ['src/**/*'],
      runtimeHelpers: true,
      extensions,
    }),

    isWatching &&
      run({
        execArgv: ["-r", "source-map-support/register"],
      }),
  ],
};
