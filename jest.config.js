module.exports = {
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    setupFilesAfterEnv: ["./setupTests.js"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },
};