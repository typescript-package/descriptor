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
 * @template Value 
 */
export class DataDescriptor<Value> extends CommonDescriptor {
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
  public static define<Value>(
    descriptor: DataPropertyDescriptor<Value>,
    onValidate?: ValidationCallback
  ): DataPropertyDescriptor<Value> | undefined {
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
  public static guard<Value>(
    descriptor: DataPropertyDescriptor<Value>,
    callbackFn?: ValidationCallback
  ): descriptor is DataPropertyDescriptor<Value> {
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
   * @type {?Value}
   */
  public value?: Value;

  /**
   * @description
   * @public
   * @type {?boolean}
   */
  public writable?: boolean;

  /**
   * Creates an instance of `DataDescriptor`.
   * @constructor
   * @param {DataPropertyDescriptor<Value>} [param0={}] 
   * @param {DataPropertyDescriptor<Value>} param0.configurable 
   * @param {DataPropertyDescriptor<Value>} param0.enumerable 
   * @param {DataPropertyDescriptor<Value>} param0.value 
   * @param {DataPropertyDescriptor<Value>} param0.writable 
   */
  constructor({ configurable, enumerable, value, writable }: DataPropertyDescriptor<Value> = {},) {
    super({ configurable, enumerable });
    delete this.writable;
    typeof writable === 'boolean' && (this.writable = writable);
    this.value = value;
  }
}
