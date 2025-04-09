import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
// import ReactiveTransform from "@vue-macros/reactivity-transform";
// import UnpluginAutoImport from "unplugin-auto-import/rspack";

export default defineConfig({
	plugins: [
    pluginVue(),
    // pluginVueJsx(),
    // pluginBabel({ include: /\.(?:jsx|tsx)$/ }),
  ],
  // tools: {
  //   rspack: {
  //     plugins: [
  //       ReactiveTransform.rspack(),
  //       UnpluginAutoImport({
  //         dts: true,
  //         imports: [
  //           "vue",
  //           "vue-router",
  //           {
  //             'vue': [
  //               ['HTMLAttributes', 'type'],
  //               ['ButtonHTMLAttributes', 'type'],
  //               ['InputHTMLAttributes', 'type'],
  //               ['FormHTMLAttributes', 'type'],
  //               ['VNodeProps', 'type'],
  //             ],
  //           },
  //         ]
  //       })
  //     ]
  //   }
  // },
  performance: {
    buildCache: false,
    // chunkSplit: {
    // 	strategy: "all-in-one"
    // }
  },
  resolve: {
    aliasStrategy: "prefer-alias",
    alias: {
      "@": "./src",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    historyApiFallback: true,
    publicDir: {
      name: "./src/assets",
    },
    headers: {
      "Allow-Control-Allow-Origin": "*",
      "Allow-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Allow-Control-Allow-Headers": "Content-Type,Authorization",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "/api" },
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/images": {
        target: "http://localhost:5000",
        pathRewrite: { "^/images": "/images" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  dev: {
    client: {
      host: "frontend-workstation.khanhhuy.dev",
    },
  },
  output: {
    sourceMap: {
      js: "source-map"
    }
  }
});
