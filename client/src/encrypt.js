const fs = require("fs");

const NodeRSA = require("node-rsa");

// const key = new NodeRSA({ b: 512 });

// var actualFile = fs.readFileSync("./Blood-Report.txt");

// var publicKey = key.exportKey("public");
// var privateKey = key.exportKey("private");

// publicKey = `-----BEGIN PUBLIC KEY-----
// MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJrD5wMBFQeAV6n8ecOg0upVLppN6BlM
// rX9tyIe9PpesLoMtgU593iRull8PjFf3WUEVX2AfUX4H44e43JItkF0CAwEAAQ==
// -----END PUBLIC KEY-----`

// privateKey=`-----BEGIN RSA PRIVATE KEY-----
// MIIBOgIBAAJBAJrD5wMBFQeAV6n8ecOg0upVLppN6BlMrX9tyIe9PpesLoMtgU59
// 3iRull8PjFf3WUEVX2AfUX4H44e43JItkF0CAwEAAQJAF7bQ3Pr7d+zIgfl3xuwL
// pXBr9aTeXZIMO6xcv7/VqXOxjzRVDmHZQQYNgPsFQ4mkheduAZ8KI9sKFDH7409L
// GQIhANHT9QpzCr8xw9CVsPFNka4f/jxGXDncoGj5I4SDa5jvAiEAvNImDT9O1AcH
// Mk8koOPHGdTECE5nX/TjlHov+2Ij83MCIFeU7DQHXtX9VKmMwcWGxibzDbBlAfvY
// 3k/SpgOaw1+bAiEAiFUXgmMecHqumIWKRdyQijcUX4b0ntT7aN4cPN5sZL8CIF7R
// xrdt2LYbH8Of7EQ9i9C05RiI6fK4qxw4gT5l43Ve
// -----END RSA PRIVATE KEY-----`

let pubKey = new NodeRSA(publicKey)
let prvKey = new NodeRSA(privateKey)

console.log("\n");
console.log(publicKey+`\n`);
console.log(privateKey+`\n`);

// var encryptedFile = pubKey.encrypt(actualFile,'base64');
// console.log("Encrypted File Data using Public Key\n\n",encryptedFile +`\n`);

// console.log("---------------------------------------");

// var decryptedFile = prvKey.decrypt(encryptedFile,'utf8');
// console.log("Decrypted File Data using respective Private Key\n\n",decryptedFile+`\n`);


// // publicKey = `-----BEGIN PUBLIC KEY-----
// // MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ6JVgqhO1FnmX678jvk7HMae+QgqsyN
// // sUFRtc3DIdBGHS5UqCfuivDm35sXsICVT33AFkHIa2fErWfurztAiKMCAwEAAQ==
// // -----END PUBLIC KEY-----`

// // privateKey = `-----BEGIN RSA PRIVATE KEY-----
// // MIIBPAIBAAJBAJ6JVgqhO1FnmX678jvk7HMae+QgqsyNsUFRtc3DIdBGHS5UqCfu
// // ivDm35sXsICVT33AFkHIa2fErWfurztAiKMCAwEAAQJBAJHhS+QyIpQwoWSl6ytD
// // 5nOwDgqIKMJbK50wY/t3sBilxffU1Fm4HfVDQQmYIfrrcGQCmMWlqz66xGPjetr0
// // 3uECIQDlYrmDPrSYRP/zOvPCjUn0MFgDdX2N8xALddj53+mO8QIhALDuOtXJ7ONj
// // N31VTDRWg1TAEywv1Wh/btFAB4bUKzjTAiEArLOdtIC7e4FHqxsRd8LkkSLswP3u
// // X7dGtzos+ERrFiECIE3nx/5E2ErTcCZ+vXw6L7/Mh2Sod0Z4/hmjIO1MVO/DAiEA
// // nTMyFb6yOdbVfi7DckocsWKSen68LzEX7qnph2V7Gfc=
// // -----END RSA PRIVATE KEY-----`

// privateKey =`-----BEGIN RSA PRIVATE KEY-----
// MIIBOQIBAAJBAIttOt8ypM2H+9G6DuvCpcUdzh8XsXhMuKAAV+8YLYqQw7ZNc7jH
// MJirOhWgpShGX/dQLuhjR2ze7Ij9/VvykwkCAwEAAQJAY5X/SNDJeaw5J1G3uplr
// AeIKCZdIwV47OL1GEZa5YJB5RkyDWtw20eZABrpYHvw/4l59OjfbTbTGMbdvBXkN
// CQIhANmL7uJFpGLoOW55lQq9mXBKrhc82zjYjDdVIn+vKkB3AiEApBJXE+A7dYeY
// xzfXgGvPoFPyehAcIAF4ptaoe9fmKH8CIEfaTiZyNh9s8Dsq8S1A/kL2h5WpRgb6
// jyVfeyuNIXl1AiBwV4Z8O4s6/G+l6RyL+EYgV5qt7Z30ZE2Cn3SZ58jWbQIgZELY
// sO8mM61FRWrstYHpPHXV9k6oRFlCTRjZP9ymFnM=
// -----END RSA PRIVATE KEY-----`


// // var pubKey =
// //   "-----BEGIN PUBLIC KEY-----\n" +
// //   "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJlmwKyXiyjsj+FEjw4GBTZQFXBn9XWV\n" +
// //   "6rwvXn3CxLpvRO4GIRLyPNwKii5lH/1nk0Wc3dtU44Tf0y299rskKU0CAwEAAQ==\n" +
// //   "-----END PUBLIC KEY-----";

// // var prvKey =
// //   "-----BEGIN RSA PRIVATE KEY-----\n" +
// //   "MIIBOQIBAAJBAJSW3kKwhIgO6FhwqKq6Dojoh6vAwBjJ7rTRIuUZlcmUrUUVAl+l\n" +
// //   "UHoXfFhYbQakB66xjKCYBwdkC2l/3V/AF9MCAwEAAQJAIU3DWU05F0nIF/KAS2vS\n" +
// //   "UCtWJU/ZfnTcNNjfKlxWr0x0KVQatalhnG1t6fiFaNReVPssk9AIxLXb50q+L9eA\n" +
// //   "6QIhAONGQODaw3FRuyq6ZkNvd8s+YNjIDDUPeJab7Pxkyg/NAiEAp16pHjHEPUWw\n" +
// //   "9fBNmcBFm8OK5v9QFZN9F2dY4zNu5h8CICZqy7C2ie7vx9mTJJIll3RNmQVL23Rk\n" +
// //   "pxeeR9LqHpXJAiApGzauE8r+wX8U6FAm0vJFr2EOGuawZejzNo6+PoOeQQIgFHM7\n" +
// //   "ZS3RhDnEsZIFWsGEakfty54oEqmYON0u7kYInZw=\n" +
// //   "-----END RSA PRIVATE KEY-----";



