import process from "process";
import { expect, test as setup } from "@playwright/test";
import * as fs from "fs";

import { signInApi } from "../../api/call-cf-explorer/sign-in.api";
import { HttpStatusCode } from "../../helpers/http-status-codes";
import { Path } from "../../constants/path.constants";
import { log } from "../../utils/logger";

interface CardanoSession {
  origins: { origin: string; localStorage: { name: string; value: string }[] }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any[];
}

setup("authenticate", async ({ request }) => {
  const signPostCredentialsResponse = await signInApi(request).postCredentials(
    process.env.USERNAME as string,
    process.env.PASSWORD as string
  );
  expect(signPostCredentialsResponse.status()).toEqual(HttpStatusCode.Ok);

  const cardanoSession: CardanoSession = {
    cookies: [],
    origins: [
      {
        origin: "https://beta.explorer.cardano.org",
        localStorage: [
          {
            name: "persist:user",
            value: `{"theme":"\\"light\\"","userData":"{\\"address\\":null,\\"email\\":\\"${process.env.USERNAME}\\",\\"avatar\\":null,\\"sizeNote\\":0,\\"sizeBookmark\\":0,\\"lastLogin\\":\\"2023-10-30T15:31:07.781106Z\\",\\"loginType\\":\\"normal\\"}","chainID":"null","address":"null","wallet":"null","provider":"null","sidebar":"true","nonce":"null","openSyncBookmarkModal":"false","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}`
          },
          {
            name: "token",
            value: (await signPostCredentialsResponse.json()).token
          },
          {
            name: "refreshToken",
            value: (await signPostCredentialsResponse.json()).refreshToken
          },
          {
            name: "username",
            value: process.env.USERNAME as string
          },
          {
            name: "email",
            value: process.env.USERNAME as string
          }
        ]
      }
    ]
  };
  const data = JSON.stringify(cardanoSession);
  fs.writeFile(`${Path.Base}storage-state-user.json`, data, (err) => {
    if (err) {
      throw err;
    }
    log.info(`Local storage information saved in ${Path.Base}storage-state-user.json for ${process.env.USERNAME}`);
  });
});
