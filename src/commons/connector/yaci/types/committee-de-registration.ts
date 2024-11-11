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
 * @interface CommitteeDeRegistration
 */
export interface CommitteeDeRegistration {
  /**
   * @type {number}
   * @memberof CommitteeDeRegistration
   */
  blockNumber?: number;

  /**
   * @type {number}
   * @memberof CommitteeDeRegistration
   */
  blockTime?: number;

  /**
   * @type {string}
   * @memberof CommitteeDeRegistration
   */
  txHash?: string;

  /**
   * @type {number}
   * @memberof CommitteeDeRegistration
   */
  certIndex?: number;

  /**
   * @type {number}
   * @memberof CommitteeDeRegistration
   */
  slot?: number;

  /**
   * @type {string}
   * @memberof CommitteeDeRegistration
   */
  anchorUrl?: string;

  /**
   * @type {string}
   * @memberof CommitteeDeRegistration
   */
  anchorHash?: string;

  /**
   * @type {string}
   * @memberof CommitteeDeRegistration
   */
  coldKey?: string;

  /**
   * @type {string}
   * @memberof CommitteeDeRegistration
   */
  credType?: CommitteeDeRegistrationCredTypeEnum;

  /**
   * @type {number}
   * @memberof CommitteeDeRegistration
   */
  epoch?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum CommitteeDeRegistrationCredTypeEnum {
  ADDRKEYHASH = "ADDR_KEYHASH",
  SCRIPTHASH = "SCRIPTHASH"
}
