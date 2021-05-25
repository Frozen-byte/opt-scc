// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    useEmulators: true,
    apiKey: 'AIzaSyBvUv_Li0UnU_ypDnFwQ47EuwJDX_imdBg',
    authDomain: 'opt-stats.firebaseapp.com',
    databaseURL: 'https://opt-stats.firebaseio.com',
    projectId: 'opt-stats',
    storageBucket: 'opt-stats.appspot.com',
    messagingSenderId: '412471479558',
    appId: '1:412471479558:web:7404e841f4c882c9df6287',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
