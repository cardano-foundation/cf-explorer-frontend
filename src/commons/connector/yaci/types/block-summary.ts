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

/**
 *
 *
 * @export
 * @interface BlockSummary
 */
export interface BlockSummary {
  /**
   * @type {number}
   * @memberof BlockSummary
   */
  time?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  number?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  slot?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  epoch?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  era?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  output?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  fees?: number;

  /**
   * @type {string}
   * @memberof BlockSummary
   */
  slotLeader?: string;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  size?: number;

  /**
   * @type {number}
   * @memberof BlockSummary
   */
  txCount?: number;

  /**
   * @type {string}
   * @memberof BlockSummary
   */
  issuerVkey?: string;
}
