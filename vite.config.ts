import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import pkg from "./package.json"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  return {
    build: {
      lib: {
        entry: {
          // Main entry point
          index: resolve(__dirname, "src/index.ts")
        },
        fileName: (_format, entryName) => `${entryName}.js`,
        formats: ["es"]
      },
      rollupOptions: {
        // Externalize dependencies that shouldn't be bundled
        external: [
          // Only externalize peer dependencies - bundle everything else
          ...Object.keys(pkg.peerDependencies ?? {}),
          "react/jsx-runtime"
        ],
        output: {
          // Don't preserve modules - bundle dependencies into flat output
          // This avoids nested node_modules/.pnpm/ paths in dist that break Jest
          preserveModules: false,
          // Chunk filenames without double-dashes (fixes Jest resolution issues)
          // Use a function to sanitize chunk names
          chunkFileNames: (chunkInfo) => {
            // Strip trailing dashes/underscores from chunk name
            const name = chunkInfo.name.replace(/[-_]+$/, "") || "chunk"
            // Use hashCharacters to avoid dashes in hash (Rollup 4.8+)
            return `chunks/${name}-[hash:16].js`
          },
          // Use only alphanumeric characters in hashes to avoid filename issues
          hashCharacters: "base36",
          // Hoist "use client" directives to the top of chunks
          hoistTransitiveImports: false,
          // Add "use client" directive to all output chunks
          // This is necessary because rollup-plugin-preserve-directives only works with preserveModules: true
          banner: '"use client";\n',
          // Global variables for UMD build (if needed)
          globals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime"
          }
        },
        // Note: preserveDirectives plugin removed - it only works with preserveModules: true
        // We use output.banner instead to add "use client" to all chunks
        plugins: [],
        // Enable Rollup caching for faster rebuilds
        cache: isDev
      },
      // Faster sourcemaps in dev
      sourcemap: isDev ? "inline" : true,
      // Skip minification in dev for faster rebuilds
      minify: isDev ? false : "esbuild",
      // Don't clear dist/ on every rebuild in dev
      emptyOutDir: !isDev,
      // Selective file watching in dev
      watch: isDev
        ? {
            exclude: ["**/*.test.*", "**/*.stories.*", "**/__tests__/**"],
            include: "src/**"
          }
        : undefined
    },
    plugins: [
      dts({
        compilerOptions: {
          incremental: isDev,
          tsBuildInfoFile: isDev ? "./.tsbuildinfo" : undefined
        },
        exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
        include: ["src/**/*"]
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    }
  }
})
