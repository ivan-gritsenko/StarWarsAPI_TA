import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  recommendedConfig: 'stylistic',
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    'next/core-web-vitals',
  ),
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx,
    },
    // parser: parserTs,
    rules: {
      '@stylistic/ts/member-delimiter-style': ['error', {
        "multiline": {
          "delimiter": "comma",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": true
        },
        "overrides": {
          "interface": {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            }
          }
        }
      }],
      '@stylistic/ts/indent': ['error', 2],
      'no-unused-vars': ['warn', {}],
    }
  }
]
