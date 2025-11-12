import eslintReact from "@eslint-react/eslint-plugin"
import eslintJs from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import prettier from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import perfectionist from "eslint-plugin-perfectionist"

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist/**", "node_modules/**"],
    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintConfigPrettier,
    ],

    // Configure language/parsing options
    languageOptions: {
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
      parserOptions: {
        // Enable project service for better TypeScript integration
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Plugins
    plugins: { prettier, perfectionist },

    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
      "perfectionist/sort-imports": ["error", { type: "natural" }],
      "@eslint-react/no-missing-key": "warn",
      "prettier/prettier": "warn",
      "@eslint-react/no-context-provider": "off",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
])
