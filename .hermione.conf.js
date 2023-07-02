module.exports = {
  // system: {
  //   fileExtensions: [
  //     '.ts',
  //   ],
  // },

  // sets: {
  //   desktop: {
  //     files: 'test/hermione/*.hermione.ts',
  //   },
  // },

  sets: {
    desktop: {
      files: "test/hermione/*.hermione.js",
    },
  },
  screenshotDelay: 1000,
  browsers: {
    chrome: {
      testsPerSession: 1,
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080
      }
      
    },
    // chrome2: {
    //   automationProtocol: "devtools",
    //   desiredCapabilities: {
    //     browserName: "chrome",
    //   },
    //   windowSize: {
    //     width: 1920,
    //     height: 1080
    //   }
      
    // },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,

    },
  },
};
