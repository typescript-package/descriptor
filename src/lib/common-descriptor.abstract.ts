// Interface.
import { CommonPropertyDescriptor } from "@typedly/descriptor";
/**
 * @description
 * @export
 * @abstract
 * @class CommonDescriptor
 */
export abstract class CommonDescriptor<
  C extends boolean = boolean,
  E extends boolean = boolean
> {
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
   * @type {?C}
   */
  public configurable?: C;

  /**
   * @description
   * @public
   * @type {?E}
   */
  public enumerable?: E;
  //#endregion

  /**
   * Creates an instance of `CommonDescriptor` child class.
   * @constructor
   * @param {CommonPropertyDescriptor<C, E>} [param0={}] 
   * @param {CommonPropertyDescriptor<C, E>} param0.configurable 
   * @param {CommonPropertyDescriptor<C, E>} param0.enumerable 
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
