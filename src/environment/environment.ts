// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    apiEndPoint: 'http://192.168.2.180:3000/api/v1/',
    // apiEndPoint: 'https://hr.yoov.com/api/v1/',
    authDomain: 'yoov-test.auth0.com',
    authClientID: 'Z81eAGlYob22oeRhWiZI6tEBPPPP8z9e',
    authCallback: 'http://192.168.2.55:4200',
};