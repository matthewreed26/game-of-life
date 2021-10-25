module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/**/*.component.{js,ts}',
    '!src/main.{js,ts}',
    '!**/*.d.ts',
  ],
  coverageReporters: ['html', 'json', 'text', 'lcov', 'clover'],
  collectCoverage: true,
};
