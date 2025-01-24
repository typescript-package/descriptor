/**
 * @description
 * @export
 * @abstract
 * @class CommonDescriptor
 */
export abstract class CommonDescriptor {
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
   * @description
   * @public
   * @type {?boolean}
   */
  public configurable?: boolean;

  /**
   * @description
   * @public
   * @type {?boolean}
   */
  public enumerable?: boolean;
  //#endregion

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Pick<PropertyDescriptor, 'configurable' | 'enumerable'>} [param0={}] 
   * @param {Pick<PropertyDescriptor, "configurable" | "enumerable">} param0.configurable 
   * @param {Pick<PropertyDescriptor, "configurable" | "enumerable">} param0.enumerable 
   */
  constructor(
    { configurable, enumerable }: Pick<PropertyDescriptor, 'configurable' | 'enumerable'>  = {},
  ) {
    delete this.configurable, delete this.enumerable;

    typeof configurable === 'boolean'
    ? (this.configurable = configurable)
    : typeof CommonDescriptor.configurable === 'boolean' && (this.configurable = CommonDescriptor.configurable);

    typeof enumerable === 'boolean'
    ? (this.enumerable = enumerable)
    : typeof CommonDescriptor.enumerable === 'boolean' && (this.enumerable = CommonDescriptor.enumerable);
  }
}
