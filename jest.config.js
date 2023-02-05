module.exports = {
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    setupFilesAfterEnv: ["./jest.setup.js"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },
};