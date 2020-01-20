module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'no-trailing-spaces': 0,
        'semi': 0,
        'space-before-function-paren': 0,
        'quotes': 0,
        'object-curly-spacing': 0,
        'comma-dangle': 0,
        'padded-blocks': 0,
        'no-multiple-empty-lines': 0,
        'eol-last': 0
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}
