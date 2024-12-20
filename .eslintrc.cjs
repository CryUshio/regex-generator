module.exports = {
  '$schema': 'https://json.schemastore.org/eslintrc',
  'root': true,
  'extends': [
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  'plugins': [
    '@typescript-eslint',
    'eslint-plugin-import',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-jsdoc',
    'tailwindcss',
    'prettier',
  ],
  rules: {
    // 0 = off, 1 = warn, 2 = error
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/naming-convention': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 0,
    'no-trailing-spaces': 2,
    'array-callback-return': ['warn', { allowImplicit: true }],
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': ['error', { before: true, after: true }],
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: true,
        allow: ['^UNSAFE_'],
      },
    ],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'computed-property-spacing': ['error', 'never'],
    complexity: [2, 15],
    curly: [2, 'all'],
    'dot-notation': ['error', { allowKeywords: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'func-names': ['warn', 'as-needed'],
    'func-style': ['off', 'expression'],
    indent: 0,
    'lines-between-class-members': 2,
    /** 注释必须写在语句上方 */
    // 'line-comment-position': [2, { position: 'above' }],
    'max-depth': [1, 2],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    /** 函数长度不能超过 80 行 */
    'max-lines-per-function': [2, { max: 80, skipComments: true }],
    /** 最大参数数量 */
    'max-params': [2, { max: 3 }],
    'no-await-in-loop': 'off',
    'no-async-promise-executor': 'warn',
    'no-confusing-arrow': 0,
    'no-continue': 0,
    'no-dupe-class-members': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods', 'constructors'],
      },
    ],
    'no-iterator': 'error',
    'no-magic-numbers': [
      'off',
      {
        ignore: [],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],
    'no-new-wrappers': 'warn',
    'no-unused-expressions': 'off',
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead.',
      },
    ],
    'no-shadow': 0,
    'no-script-url': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    'no-nested-ternary': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-whitespace-before-property': 'error',
    'no-plusplus': 'off',
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': 'off',
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'one-var': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    // https://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'any', prev: 'block-like', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['export'], next: ['export'] },
    ],
    radix: 'error',
    'template-curly-spacing': 'error',
    // import
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': 2,
    'import/extensions': 'off',
    'import/first': 'off',
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'type', 'index', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        requirePragma: false,
        insertPragma: false,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        vueIndentScriptAndStyle: false,
        endOfLine: 'auto',
        embeddedLanguageFormatting: 'auto',
      },
    ],
  },
  'settings': {
    'tailwindcss': {
      'callees': [
        'cn',
      ],
      'config': 'tailwind.config.ts',
    },
    'next': {
      'rootDir': true,
    },
  },
  'overrides': [
    {
      'files': ['*.ts', '*.tsx'],
      'parser': '@typescript-eslint/parser',
    },
  ],
}
