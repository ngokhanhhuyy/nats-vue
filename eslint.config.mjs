import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import ts from 'typescript-eslint';
import vueParser from "vue-eslint-parser";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        $ref: 'readonly',
        $computed: 'readonly',
        $shallowRef: 'readonly',
        $customRef: 'readonly',
        $toRef: 'readonly'
      }
    }
  },
  {
      files: ["*.vue", "**/*.vue"],
      languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: "@typescript-eslint/parser"
          },
      },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/essential'],
  { ignores: ['dist/'] },
  {
    rules: {
      "semi": ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-undef": "off",
      "vue/multi-word-component-names": "off"
    },
  }
];
