// Abstract,
import { CommonDescriptor } from './common-descriptor.abstract';
// Interface.
import { ThisAccessorPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description The `AccessorDescriptor` class is a concrete implementation of the `CommonDescriptor` class that represents an accessor property descriptor.
 * @export
 * @class AccessorDescriptor
 * @template [O=any] The type of the object.
 * @template {PropertyKey | keyof O} [K=keyof O] The type of property key.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of value captured from the object.
 * @template {boolean} [C=boolean] The type of the configurable property.
 * @template {boolean} [E=boolean] The type of the enumerable property.
 * @extends {CommonDescriptor<C, E>} Common descriptor properties.
 */
export class AccessorDescriptor<
  // Object. `any` for proper type capturing by `V`.
  O = any,
  // Key.
  K extends PropertyKey | keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean
> extends CommonDescriptor<C, E> {
  /**
   * @description Creates an instance of `AccessorDescriptor`.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of property key.
   * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of value captured from the object.
   * @template {boolean} [C=boolean] The type of the configurable property.
   * @template {boolean} [E=boolean] The type of the enumerable property.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0 Accessor descriptor properties.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.configurable The type of configurable of `C`.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.enumerable The type of enumerable of `E`.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.get The type of the getter function.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.set The type of the setter function.
   * @param {?O} [object] The object (non-stored) to define the descriptor on.
   * @param {?K} [key] The (non-stored) key to define the descriptor on.
   * @param {?ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>} [onValidate] 
   * @returns {AccessorDescriptor<O, K, V, C, E>} 
   */
  public static create<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean
  >(
    { configurable, enumerable, get, set }: ThisAccessorPropertyDescriptor<V, O, C, E>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>
  ): AccessorDescriptor<O, K, V, C, E> {
    return new AccessorDescriptor(
      { configurable, enumerable, get, set },
      object,
      key,
      onValidate
    );
  }

  /**
   * @description Returns strictly defined accessor descriptor of a `ThisAccessorPropertyDescriptor<Value, Obj>` type on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param onValidate A `ValidationCallback` function to handle the result of the check whether the `descriptor` is an `object`
   * with `get` or `set` property, by default it uses `accessorCallback()` function.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The returned value is an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type.
   */
  public static define<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean
  >(
    { configurable, enumerable, get, set }: ThisAccessorPropertyDescriptor<V, O, C, E>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>
  ): ThisAccessorPropertyDescriptor<V, O, C, E> | undefined {
    return this.guard({ configurable, enumerable, get, set }, onValidate)
      ? {
        ...(configurable as C || AccessorDescriptor.configurable as C) &&  { configurable: configurable as C || AccessorDescriptor.configurable as C },
        ...(enumerable as E || AccessorDescriptor.enumerable as E) && { enumerable: enumerable as E || AccessorDescriptor.enumerable as E },
        ...set && { set },
        ...get && { get },
      }
      : undefined;
  }

  /**
   * @description Guards the `descriptor` to be an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type.
   * @param descriptor The object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type to guard.
   * @param callbackFn A `ValidationCallback` function to handle the result of the check whether or not the descriptor is an `object`
   * containing the `get` or `set` property.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is a boolean indicating whether the `descriptor` is an `object` with the `get` or `set` property.
   */
  public static guard<
    V,
    O,
    C extends boolean = boolean,
    E extends boolean = boolean
  >(
    descriptor: ThisAccessorPropertyDescriptor<V, O, C, E>,
    callbackFn?: ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>
  ): descriptor is ThisAccessorPropertyDescriptor<V, O, C, E> {
    const result = typeof descriptor === 'object'
      && ('get' in descriptor || 'set' in descriptor)
      && !('value' in descriptor || 'writable' in descriptor);
    return callbackFn?.(result, descriptor) || result;
  }

  //#region Accessor descriptor.
  /**
   * @description The getter function.
   * @public
   * @type {?() => V}
   */
  public get?: () => V;

  /**
   * @description The setter function.
   * @public
   * @type {?(value: V) => void}
   */
  public set?: (value: V) => void;
  //#endregion

  /**
   * Creates an instance of `AccessorDescriptor`.
   * @constructor
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0 The properties of the accessor descriptor.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.configurable The configurable of `C`.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.enumerable The enumerable of `E`.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.get The getter function.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.set The setter function.
   * @param {?O} [object] The object (non-stored) to define the descriptor on.
   * @param {?K} [key] The (non-stored) key to define the descriptor on.
   * @param {?ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>} [onValidate] 
   */
  constructor(
    { configurable, enumerable, get, set }: ThisAccessorPropertyDescriptor<V, O, C, E>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>
  ) {
    onValidate && AccessorDescriptor.guard({ configurable, enumerable, get, set }, onValidate);
    super({
      configurable: configurable as C,
      enumerable: enumerable as E,
    });
    delete this.get, delete this.set;
    typeof get === 'function' && (this.get = get);
    typeof set === 'function' && (this.set = set);
  }
}
