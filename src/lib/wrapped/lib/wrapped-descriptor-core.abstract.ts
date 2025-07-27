// Abstract.
import { CommonDescriptor } from '../../common-descriptor.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, SetterCallback } from '@typedly/callback';
/**
 * @description The abstract class for wrapped descriptors.
 * @export
 * @abstract
 * @class WrappedDescriptorCore
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [ED=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {WrappedDescriptorCore<O, K, V, A, ED, C, E, D>} [D=WrappedDescriptorCore<O, K, V, A, ED, C, E, any>] 
 * @extends {CommonDescriptor<C, E>}
 * @implements {WrappedPropertyDescriptor<O, K, V, A, ED, C, E, D>}
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
  // The type of the previous and current descriptor.
  D extends WrappedDescriptorCore<O, K, V, A, ED, C, E, D> = WrappedDescriptorCore<O, K, V, A, ED, C, E, any>
> extends CommonDescriptor<C, E>
  implements WrappedPropertyDescriptor<O, K, V, A, ED, C, E, D> {
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
   * @description The object key to define the descriptor on.
   * @abstract
   * @readonly
   * @type {K}
   */
  abstract get key(): K;

  /**
   * @description The index of the descriptor in the chain.
   * @abstract
   * @readonly
   * @type {number | undefined}
   */
  abstract get index(): number | undefined;

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
   * @type {(D | PropertyDescriptor | undefined)}
   */
  abstract get previousDescriptor(): D | PropertyDescriptor | undefined;

  /**
   * @description The private key used to store the value in the object.
   * @abstract
   * @readonly
   * @type {PropertyKey}
   */
  abstract get privateKey(): PropertyKey;
 
  //#region Accessor descriptor.  
  /**
   * @description The getter function.
   * @type {?(this: O, descriptor?: D) => V}
   */
  get?: (this: O, descriptor?: D) => V;

  /**
   * @description The setter function.
   * @type {?(this: O, value: V, descriptor?: D) => void}
   */
  set?: (this: O, value: V, descriptor?: D) => void;
  //#endregion
}
