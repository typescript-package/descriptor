// Abstract.
import { CommonDescriptor } from './common-descriptor.abstract';
// Interface.
import { DataPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @class DataDescriptor
 * @template V 
 */
export class DataDescriptor<
  V,
  C extends boolean = boolean,
  E extends boolean = boolean,
  W extends boolean = boolean
> extends CommonDescriptor<C, E> {
  /**
   * Returns strictly defined data descriptor of a `DataPropertyDescriptor<Value>` interface on `writable` or `value` property detected.
   * Strictly means, parameter `descriptor` is type guarded and method picks `configurable`, `enumerable`, `writable`, `value`
   * properties from the provided `descriptor` object.
   * @param descriptor An `object` of a `DataPropertyDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param onValidate An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `guard()` method.
   * @returns The return value is an `object` of a `DataPropertyDescriptor<Value>` interface.
   */
  public static define<V>(
    descriptor: DataPropertyDescriptor<V>,
    onValidate?: ValidationCallback
  ): DataPropertyDescriptor<V> | undefined {
    const { configurable, enumerable, value, writable } = descriptor;
    return this.guard(descriptor, onValidate)
      ? {
        ...{
          configurable: CommonDescriptor.configurable,
          enumerable: DataDescriptor.enumerable,
          writable: DataDescriptor.writable,  
        },
        ...{ configurable, enumerable, value, writable }
      }
      : undefined;
  }

  /**
   * @description Guards the `descriptor` to be an `object` of a `DataPropertyDescriptor<Value>` interface.
   * @param descriptor Object of a `DataPropertyDescriptor<Value>` interface to guard.
   * @param callbackFn A `ResultCallback` function to handle the result of the check whether or not the `descriptor`
   * is an `object` with the `writable` or `value` property, by default it uses `dataCallback()` function.
   * @throws Throws an error if the `descriptor` is not an `object` of a `DataPropertyDescriptor<Value>` interface, which means doesn't
   * contain `writable` or `value` property.
   * @returns The return value is a `boolean` indicating whether the `descriptor` is an `object` with the `writable` or `value` property.
   */
  public static guard<V>(
    descriptor: DataPropertyDescriptor<V>,
    callbackFn?: ValidationCallback
  ): descriptor is DataPropertyDescriptor<V> {
    return typeof callbackFn === 'function'
      ? callbackFn(typeof descriptor === 'object' &&  'value' in descriptor, descriptor)
      : false;
  }

  /**
   * @description Default writable.
   * @public
   * @static
   * @type {?boolean}
   */
  public static writable?: boolean;

  /**
   * @description
   * @public
   * @type {?V}
   */
  public value?: V;

  /**
   * @description
   * @public
   * @type {?W}
   */
  public writable?: W;

  /**
   * Creates an instance of `DataDescriptor`.
   * @constructor
   * @param {DataPropertyDescriptor<V, C, E>} [param0={}] 
   * @param {DataPropertyDescriptor<V, C, E>} param0.configurable 
   * @param {DataPropertyDescriptor<V, C, E>} param0.enumerable 
   * @param {DataPropertyDescriptor<V, C, E>} param0.value 
   * @param {DataPropertyDescriptor<V, C, E>} param0.writable 
   */
  constructor(
    { configurable, enumerable, value, writable }: DataPropertyDescriptor<V, C, E> = {},
  ) {
    super({ configurable, enumerable });
    delete this.writable;
    typeof writable === 'boolean' && (this.writable = writable as W);
    this.value = value;
  }
}
