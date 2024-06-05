import type { APIRequestContext } from "@playwright/test";

import * as BaseApi from "../base.api";
import * as Endpoint from "../../helpers/endpoints";

export function signInApi(request: APIRequestContext) {
  const postCredentials = async (email: string, password: string) => {
    return BaseApi.postData(
      request,
      Endpoint.CardanoFoundation.SignIn.Base,
      {
        email: email,
        password: password,
        type: "0"
      },
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json"
      },
      false
    );
  };

  return {
    postCredentials
  };
}
