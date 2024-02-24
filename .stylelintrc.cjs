module.exports = {
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind"] }],
    "at-rule-empty-line-before": ["always", { "except": ["after-same-name"] }],
    "alpha-value-notation": null,
    "block-no-empty": null,
    "color-named": "never",
    "color-no-hex": true,
    "color-function-notation": ["legacy", { "ignore": ["with-var-inside"] }],
    "declaration-empty-line-before": null,
    "function-disallowed-list": ["rgb"],
    "value-no-vendor-prefix": null,
    "declaration-no-important": null,
    "declaration-property-value-disallowed-list": null,
    "selector-no-vendor-prefix": null,
    "selector-class-pattern": null,
    "property-no-vendor-prefix": null,
  },
  overrides: [{
    files: '**/*.less',
    customSyntax: 'postcss-less',
  }]
};
