module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,js,tsx,jsx}'
  ],
  coverageDirectory: 'reports/coverage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^~/(.*)$': '<rootDir>/__src__/$1'
  },
  reporters: [
    'default'
  ],
  testRegex: '.*\\.spec\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)'
  ]
}
