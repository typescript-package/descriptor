// Interface.
import { CommonPropertyDescriptor } from "@typedly/descriptor";
 /**
 * @description The common properties for descriptors.
 * @export
 * @abstract
 * @class CommonDescriptor
 * @template {boolean} [C=boolean] The type of configurable property.
 * @template {boolean} [E=boolean] The type of enumerable property.
 * @implements {Pick<PropertyDescriptor, 'configurable' | 'enumerable'>}
 */
export abstract class CommonDescriptor<
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean
> implements Pick<PropertyDescriptor, 'configurable' | 'enumerable'> {
  /**
   * @description The default value for configurable.
   * @public
   * @static
   * @type {?boolean}
   */
  public static configurable?: boolean;

  // 
  /**
   * @description The default value for enumerable.
   * @public
   * @static
   * @type {?boolean}
   */
  public static enumerable?: boolean;

  //#region Property descriptor
  /**
   * @description The configurable property.
   * @public
   * @type {?C}
   */
  public configurable?: C;

  /**
   * @description The enumerable property.
   * @public
   * @type {?E}
   */
  public enumerable?: E;
  //#endregion

  /**
   * Creates an instance of `CommonDescriptor` child class.
   * @constructor
   * @param {CommonPropertyDescriptor<C, E>} [param0={}] Object containing configurable and enumerable properties.
   * @param {CommonPropertyDescriptor<C, E>} param0.configurable The configurable property. Defaults to static configurable value.
   * @param {CommonPropertyDescriptor<C, E>} param0.enumerable The enumerable property. Defaults to static enumerable value.
   */
  constructor(
    { configurable, enumerable }: CommonPropertyDescriptor<C, E>  = {},
  ) {
    delete this.configurable, delete this.enumerable;

    typeof configurable === 'boolean'
    ? (this.configurable = configurable)
    : typeof CommonDescriptor.configurable === 'boolean' && (this.configurable = CommonDescriptor.configurable as C);

    typeof enumerable === 'boolean'
    ? (this.enumerable = enumerable)
    : typeof CommonDescriptor.enumerable === 'boolean' && (this.enumerable = CommonDescriptor.enumerable as E);
  }
}
