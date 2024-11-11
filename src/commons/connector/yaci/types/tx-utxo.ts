/* tslint:disable */
/* eslint-disable */
/**
 * Yaci Store API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Amt } from "./amt";
import { JsonNode } from "./json-node";
/**
 *
 *
 * @export
 * @interface TxUtxo
 */
export interface TxUtxo {
  /**
   * @type {string}
   * @memberof TxUtxo
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof TxUtxo
   */
  outputIndex?: number;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  address?: string;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  stakeAddress?: string;

  /**
   * @type {Array<Amt>}
   * @memberof TxUtxo
   */
  amount?: Array<Amt>;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  dataHash?: string;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  inlineDatum?: string;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  scriptRef?: string;

  /**
   * @type {string}
   * @memberof TxUtxo
   */
  referenceScriptHash?: string;

  /**
   * @type {JsonNode}
   * @memberof TxUtxo
   */
  inlineDatumJson?: JsonNode;
}
