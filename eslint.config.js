import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    // JS + Vue
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: {
            globals: globals.browser,
        },
        extends: [
            js.configs.recommended,
            pluginVue.configs['flat/recommended'],
            prettierConfig,
        ],
        rules: {
            // 🔹 Стиль и чистота кода
            'semi': ['error', 'always'], // всегда ставим точку с запятой
            'quotes': ['error', 'single'], // одинарные кавычки
            'no-trailing-spaces': 'warn', // без пробелов в конце строки
            'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }], // максимум 1 пустая строка, и без пустых строк в конце файла
            'eol-last': ['warn', 'always'], // всегда новая строка в конце файла

            // 🔹 Консоль и отладка
            'no-console': 'warn',
            'no-debugger': 'warn',

            // 🔹 Переменные
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // подсвечивать неиспользуемые, но игнорировать с _
            'no-undef': 'error', // нельзя использовать необъявленные переменные

            // 🔹 Упрощения
            'eqeqeq': ['warn', 'always'], // всегда === вместо ==
            'curly': ['warn', 'all'], // всегда использовать {}
        },
    },

    // JSON
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },

    // Markdown
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/commonmark',
        extends: ['markdown/recommended'],
    },

    // CSS
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
]);
