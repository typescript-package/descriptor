// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, ValidationCallback, SetterCallback } from '@typedly/callback';
/**
 * @description The abstract class for wrapped descriptors.
 * @export
 * @abstract
 * @class WrappedDescriptorCore
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] Whether the descriptor is active.
 * @template {boolean} [ED=boolean] Whether the descriptor is enabled.
 * @template {boolean} [C=boolean] Whether the descriptor is configurable.
 * @template {boolean} [E=boolean] Whether the descriptor is enumerable.
 * @extends {AccessorDescriptor<O, K, V, C, E>}
 */
export abstract class WrappedDescriptorCore<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  ED extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
> extends AccessorDescriptor<O, K, V, C, E> {
  /**
   * @description Whether the descriptor is active.
   * If `true`, the descriptor is active.
   * If an object, it can have `onGet` and `onSet` properties
   * that indicate whether the `onGet` and `onSet` methods are active.
   * @abstract
   * @readonly
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  abstract get active(): A | { onGet?: boolean; onSet?: boolean };

  /**
   * @description Whether the descriptor is enabled.
   * If `true`, the descriptor is enabled.
   * If `false`, the descriptor is disabled.
   * @abstract
   * @readonly
   * @type {ED}
   */
  abstract get enabled(): ED;

  /**
   * @description The custom getter function for the descriptor.
   * @abstract
   * @readonly
   * @type {(GetterCallback<O, K> | undefined)}
   */
  abstract get onGet(): GetterCallback<O, K> | undefined;

  /**
   * @description The custom setter function for the descriptor.
   * @abstract
   * @readonly
   * @type {(SetterCallback<O, K> | undefined)}
   */
  abstract get onSet(): SetterCallback<O, K> | undefined;

  /**
   * @description The previous descriptor that this descriptor wraps.
   * @abstract
   * @readonly
   * @type {(WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined)}
   */
  abstract get previousDescriptor(): WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined;

  /**
   * @description The private key used to store the value in the object.
   * @abstract
   * @readonly
   * @type {(PropertyKey | undefined)}
   */
  abstract get privateKey(): PropertyKey | undefined;

  /**
   * @description Creates an instance of `WrappedDescriptorCore` child class.
   * @constructor
   * @param {WrappedPropertyDescriptor<O, K, V, A, ED, C, E>} param0 The properties of the wrapped descriptor.
   * @param {O} object The object (non-stored) to define the descriptor on.
   * @param {K} key The key (non-stored) to define the descriptor on.
   * @param {?ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>} [onValidate] The validation callback.
   */
  constructor(
    {
      active,
      configurable,
      enabled,
      enumerable,
      get,
      onGet,
      onSet,
      previousDescriptor,
      privateKey, 
      set
    }: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    object: O,
    key: K,
    onValidate?: ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>
  ) {
    super({configurable, enumerable, get, set}, object, key, onValidate);
  }
}
