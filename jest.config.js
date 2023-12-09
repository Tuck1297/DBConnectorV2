module.exports = {
    collectCoverage: false, // Set this to true to show the collected coverage report.
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
    // preset: 'react-scripts',
    moduleFileExtensions: ["js", "jsx", "json", "node"]
}
