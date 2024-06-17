import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
// import { Agent } from "node:http";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			},
		},
		// global css
		css: {
			preprocessorOptions: {
				scss: {
					// 引入css全局变量的文件 scss
					additionalData: `@import "@/styles/var.scss";`,
				},
				less: {
					// 引入css全局变量的文件 less
					additionalData: `@import "@/styles/var.less";`,
				},
			},
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			// host: "127.0.0.1",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				"/api": {
					// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
					// target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
					target: "https://mock.mengxuegu.com/mock/62abda3212c1416424630a45", // easymock
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					// agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
				},
			},
		},
		// plugins
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE,
					},
				},
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz",
				}),
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
		},
		// build configure
		build: {
			outDir: "dist",
			/**
			 * esbuild打包更快，但是不能去除console.log,去除console使用terser模式
			 */
			// minify: "terser",
			// terserOptions: {
			// 	// delete console/debugger
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true,
			// 	},
			// },
			minify: "esbuild",
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},
		},
	};
});
