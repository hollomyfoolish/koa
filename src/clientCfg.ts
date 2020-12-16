// auth: {
//     /** String used to set the host to request the tokens to. Required. */
//     tokenHost: string;
//     /** String path to request an access token. Default to /oauth/token. */
//     tokenPath?: string;
//     /** String path to revoke an access token. Default to /oauth/revoke. */
//     revokePath?: string;
//     /** String used to set the host to request an "authorization code". Default to the value set on auth.tokenHost. */
//     authorizeHost?: string;
//     /** String path to request an authorization code. Default to /oauth/authorize. */
//     authorizePath?: string;
// };

const oAtuthClientCfg = {
    client: {
      id: 'TC(1001)',
      secret: 'TC(1001)secret'
    },
    auth: {
      tokenHost: 'http://10.58.81.9:8080',
      tokenPath: '/uaa/oauth/token',
      authorizeHost: 'http://10.58.81.9:8080',
      authorizePath: '/uaa/oauth/authorize',
    }
};

export default oAtuthClientCfg;