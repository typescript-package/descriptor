// Abstract.
import { CommonDescriptor } from './common-descriptor.abstract';
// Interface.
import { DataPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description The `DataDescriptor` class is a concrete implementation of the `CommonDescriptor` class that represents a data property descriptor.
 * @export
 * @class DataDescriptor
 * @template [O=any] The type of the object.
 * @template {PropertyKey | keyof O} [K=keyof O] The type of property key.
 * @template [V=K extends keyof O ? O[K] : any] The type of value captured from the object.
 * @template {boolean} [C=boolean] The type of the configurable property.
 * @template {boolean} [E=boolean] The type of the enumerable property.
 * @template {boolean} [W=boolean] The type of the writable property.
 * @extends {CommonDescriptor<C, E>}
 */
export class DataDescriptor<
  // Object.
  O = any,
  // Key.
  K extends PropertyKey | keyof O = keyof O,
  // Value.
  V = K extends keyof O ? O[K] : any,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Writable.
  W extends boolean = boolean
> extends CommonDescriptor<C, E> {
  /**
   * @description Creates an instance of `DataDescriptor`.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of the property key. 
   * @template [V=K extends keyof O ? O[K] : any] The type of the value captured from the object.
   * @template {boolean} [C=boolean] The type of configurable.
   * @template {boolean} [E=boolean] The type of enumerable.
   * @template {boolean} [W=boolean] The type of writable.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0 Data descriptor properties.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.configurable The configurable property.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.enumerable The enumerable property.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.value The value for data descriptor.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.writable The writable property.
   * @param {?O} [object] The object (non-stored) to define the descriptor on. The object is optional, if not provided the descriptor will be created without an object.
   * @param {?K} [key] The property key to define the descriptor on. The key is optional, if not provided the descriptor will be created without a key.
   * @param {?ValidationCallback<DataPropertyDescriptor<V, C, E, W>>} [onValidate] An optional validation callback to validate the descriptor.
   * @returns {(DataDescriptor<O, K, V, C, E, W> | undefined)} 
   */
  public static create<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    { configurable, enumerable, value, writable }: DataPropertyDescriptor<V, C, E, W>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<DataPropertyDescriptor<V, C, E, W>>
  ): DataDescriptor<O, K, V, C, E, W> | undefined {
    return new DataDescriptor(
      { configurable, enumerable, value, writable },
      object,
      key,
      onValidate
    );
  }

  /**
   * @description Returns strictly defined data descriptor of a `DataPropertyDescriptor<Value>` interface on `writable` or `value` property detected.
   * Strictly means, parameter `descriptor` is type guarded and method picks `configurable`, `enumerable`, `writable`, `value`
   * properties from the provided `descriptor` object.
   * @param descriptor An `object` of a `DataPropertyDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param onValidate An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `guard()` method.
   * @returns The return value is an `object` of a `DataPropertyDescriptor<Value>` interface.
   */
  public static define<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    { configurable, enumerable, value, writable }: DataPropertyDescriptor<V, C, E, W>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<DataPropertyDescriptor<V, C, E, W>>
  ): DataPropertyDescriptor<V, C, E, W> | undefined {
    return this.guard({ configurable, enumerable, value, writable }, onValidate)
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
  public static guard<
    V,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    descriptor: DataPropertyDescriptor<V, C, E, W>,
    callbackFn?: ValidationCallback<DataPropertyDescriptor<V, C, E, W>>
  ): descriptor is DataPropertyDescriptor<V, C, E, W> {
    return typeof callbackFn === 'function'
      ? callbackFn(
        typeof descriptor === 'object'
        && 'value' in descriptor
        && !('get' in descriptor || 'set' in descriptor), descriptor)
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
   * @description The value of the descriptor.
   * @public
   * @type {?V}
   */
  public value?: V;

  /**
   * @description The writable of the descriptor.
   * @public
   * @type {?W}
   */
  public writable?: W;

  /**
   * Creates an instance of `DataDescriptor`.
   * @constructor
   * @param {DataPropertyDescriptor<V, C, E, W>} param0 Data descriptor properties.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.configurable The configurable of the descriptor.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.enumerable Enumerable of the descriptor.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.value The value for data descriptor.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.writable The writable for data descriptor.
   * @param {?O} [object] The object (non-stored) to define the descriptor on. The object is optional, if not provided the descriptor will be created without an object.
   * @param {?K} [key] The (non-stored) key to define the descriptor on.
   * @param {?ValidationCallback<DataPropertyDescriptor<V, C, E, W>>} [onValidate] 
   */
  constructor(
    { configurable, enumerable, value, writable }: DataPropertyDescriptor<V, C, E, W>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<DataPropertyDescriptor<V, C, E, W>>
  ) {
    onValidate && DataDescriptor.guard({ configurable, enumerable, value, writable }, onValidate);
    super({ configurable, enumerable });
    delete this.writable;
    typeof writable === 'boolean' && (this.writable = writable as W);
    this.value = value;
  }
}
