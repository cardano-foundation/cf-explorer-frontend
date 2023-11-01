import { APIRequestContext, APIResponse } from "@playwright/test";

import { log } from "../utils/logger";

const returnLoggedResponse = async (
  response: APIResponse,
  endpoint: string,
  payload?: object,
  isBodyNotSecret = true
) => {
  log.info(`Request URL: ${endpoint}`);
  if (typeof payload !== "undefined" && isBodyNotSecret)
    log.info(`Request params/body:\n${JSON.stringify(payload, null, 2)}`);
  log.info(`Response status: ${response.status()}`);
  if (response.headers()["content-type"]?.includes("application/json"))
    log.info(`Response body:\n${JSON.stringify(await response.json(), null, 2)}`);
  return response;
};

export const del = async (
  request: APIRequestContext,
  endpoint: string,
  data?: object,
  headers?: { [key: string]: string }
) =>
  returnLoggedResponse(
    await request.delete(endpoint, {
      data,
      headers
    }),
    endpoint,
    data
  );

export const get = async (request: APIRequestContext, endpoint: string, params?: object) =>
  returnLoggedResponse(await request.get(endpoint, params), endpoint, params);

export const postData = async (
  request: APIRequestContext,
  endpoint: string,
  data?: object,
  headers?: { [key: string]: string },
  isBodyNotSecret = true
) =>
  returnLoggedResponse(
    await request.post(endpoint, {
      data,
      headers
    }),
    endpoint,
    data,
    isBodyNotSecret
  );

export const postForm = async (
  request: APIRequestContext,
  endpoint: string,
  form?: { [key: string]: string },
  headers?: { [key: string]: string },
  isBodyNotSecret = true
) =>
  returnLoggedResponse(
    await request.post(endpoint, {
      form,
      headers
    }),
    endpoint,
    form,
    isBodyNotSecret
  );
