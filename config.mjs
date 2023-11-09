import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|cjs|jsx)$|\.(ts|mts|cts|tsx)$/,
        loader: path.join(__dirname, "diy.js"),
      },
      {
        test: /\.(js|mjs|cjs|jsx)$|\.(ts|mts|cts|tsx)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                externalHelpers: true,
                parser: {
                  tsx: true,
                  syntax: "typescript",
                  decorators: true,
                },
                preserveAllComments: true,
                transform: {
                  react: {
                    development: true,
                    refresh: true,
                    runtime: "automatic",
                  },
                },
              },
              isModule: "unknown",
              minify: false,
              sourceMaps: true,
              inlineSourcesContent: true,
              rspackExperiments: {
                import: [
                  {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: "css",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
};

export default config;
