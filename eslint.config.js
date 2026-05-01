import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import stylisticPlugin from "@stylistic/eslint-plugin";
import globals from "globals";

export default [
  {
    ignores: [
      ".github/**",
      ".vscode/**",
      "build/**",
      "dist/**",
      "src/main/tauri/target/**",
      "src/main/vite/dist/**"
    ]
  },

  js.configs.recommended,

  // TypeScript recommended rules (scoped to .ts/.tsx files, includes parser setup)
  ...tsPlugin.configs["flat/recommended"],

  // TypeScript-specific overrides and stylistic rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@stylistic": stylisticPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
          multilineDetection: "brackets"
        }
      ]
    }
  },

  // React rules scoped to JSX/TSX files only
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: { react: reactPlugin },
    settings: { react: { version: "18.3.1" } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off"
    }
  },

  // All files: globals and shared rules
  {
    plugins: { "@stylistic": stylisticPlugin },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "object-curly-spacing": ["error", "always", { arraysInObjects: true }],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": ["error", { ignoreComments: false }],
      "space-before-function-paren": [
        "error",
        { anonymous: "never", named: "never", asyncArrow: "always" }
      ],
      "valid-typeof": ["error", { requireStringLiterals: true }],
      "camelcase": [
        "error",
        { ignoreDestructuring: true, ignoreImports: true, ignoreGlobals: true }
      ],
      "curly": ["error", "multi"],
      "eqeqeq": ["error", "always"],
      "padded-blocks": ["error", "never"],
      "space-in-parens": ["error", "never"],
      "func-names": ["error", "never"],
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "no-var": "error",
      "prefer-const": "error",
      "no-useless-concat": "error",
      "default-case": "error",
      "no-await-in-loop": "error",
      "no-dupe-keys": "error",
      "no-duplicate-imports": "error",
      "no-func-assign": "error",
      "no-invalid-regexp": "error",
      "no-loss-of-precision": "error",
      "no-new-symbol": "error",
      "no-self-assign": "error",
      "no-multi-spaces": "error",
      "no-self-compare": "error",
      "no-setter-return": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-undef": "error",
      "no-unmodified-loop-condition": "error",
      "no-unsafe-negation": "error",
      "no-unused-private-class-members": "error",
      "no-use-before-define": "error",
      "no-eval": "error",
      "use-isnan": "error",
      "no-console": "warn",
      "no-inner-declarations": "off",
      "no-mixed-spaces-and-tabs": "off",
      "no-promise-executor-return": "off",
      "no-extra-boolean-cast": "off",
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  }
];
