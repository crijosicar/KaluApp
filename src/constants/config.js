const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Kalu',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  //PROD -> UA-116644857-1
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-116644857-1',
};
