module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  moduleNameMapper: {
    // "^@/(.*)$": "<rootDir>/src/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
    // src: "<rootDir>/src/$1",
    "@/cardano-foundation": "<rootDir>/cardano-foundation-libs",
    // "\\.(svg|png)$": "<rootDir>/__tests__/fileMock.ts",
    // "\\.(jpg|jpeg|png|gif|webp|svg)?react$": "jest-transform-stub",
    // "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
    // "\\.svg\\?react$": "<rootDir>/__mocks__/svgReactComponentMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // "\\.svg\\?react$": "identity-obj-proxy",
    // axios: "axios/dist/node/axios.cjs",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
      isolatedModules: true
    }
  },
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ["/node_modules/(?!react-dnd|dnd-core|@react-dnd)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
