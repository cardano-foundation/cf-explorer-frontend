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
 * @interface LocalConstitution
 */
export interface LocalConstitution {
  /**
   * @type {number}
   * @memberof LocalConstitution
   */
  epoch?: number;

  /**
   * @type {string}
   * @memberof LocalConstitution
   */
  anchorUrl?: string;

  /**
   * @type {string}
   * @memberof LocalConstitution
   */
  anchorHash?: string;

  /**
   * @type {string}
   * @memberof LocalConstitution
   */
  script?: string;

  /**
   * @type {number}
   * @memberof LocalConstitution
   */
  slot?: number;
}
