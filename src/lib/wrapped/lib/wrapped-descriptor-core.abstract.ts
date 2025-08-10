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
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {WrappedDescriptorCore<O, K, V, A, N, C, E, D>} [D=WrappedDescriptorCore<O, K, V, A, N, C, E, any>] 
 * @extends {CommonDescriptor<C, E>}
 * @implements {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>}
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
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // The type of the previous and current descriptor.
  D extends WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> | PropertyDescriptor = WrappedPropertyDescriptor<O, K, V, A, N, C, E, any>
> extends CommonDescriptor<C, E>
  implements WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> {
  /**
   * @description The defaults for instance `active` property.
   * @public
   * @static
   * @type {boolean}
   */
  public static active: boolean = true;

  /**
   * @description The defaults for instance `enabled` property.
   * @public
   * @static
   * @type {boolean}
   */
  public static enabled: boolean = true;

  /**
   * @description The prefix for the private key.
   * @public
   * @static
   * @type {string}
   */
  public static prefix: string = '_';

    /**
   * @description Whether the descriptor is active.
   * If `true`, the descriptor is active.
   * If an object, it can have `onGet` and `onSet` properties
   * that indicate whether the `onGet` and `onS et` methods are active.
   * @abstract
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  abstract active: A | { onGet?: boolean; onSet?: boolean };

  /**
   * @description Whether the descriptor is enabled.
   * If `true`, the descriptor is enabled.
   * If `false`, the descriptor is disabled.
   * @abstract
   * @type {N}
   */
  abstract enabled: N;
  
  /**
   * @description The `get` getter for the descriptor.
   * @abstract
   * @type {(this: O, descriptor?: D) => V}
   */
  abstract get: (this: O, descriptor?: D) => V;

  /**
   * @description The index of the descriptor in the chain.
   * @abstract
   * @type {number | undefined}
   */
  abstract index?: number;

  /**
   * @description The object key to define the descriptor on.
   * @abstract
   * @type {K}  
   */
  abstract key: K;

  /**
   * @description The custom getter function for the descriptor.
   * @abstract
   * @type {?GetterCallback<O, K>}
   */
  abstract onGet?: GetterCallback<O, K>;

  /**
   * @description The custom setter function for the descriptor.
   * @abstract
   * @type {?SetterCallback<O, K>}
   */
  abstract onSet?: SetterCallback<O, K>;

  /**
   * @description The previous descriptor that this descriptor wraps.
   * @abstract
   * @type {?D}
   */
  abstract previous?: D;
  abstract previousDescriptor?: D;

  /**
   * @description The private key used to store the value in the object.
   * @abstract
   * @type {PropertyKey}
   */
  abstract privateKey: PropertyKey;

  /**
   * @description The `set` getter for the descriptor.
   * @abstract
   * @type {(this: O, value: V, descriptor?: D) => void}
   */
  abstract set: (this: O, value: V, descriptor?: D) => void;

  /**
   * @description Wraps the property with the descriptor.
   * @protected
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} param0 The wrapped property `set` and `get` descriptor.
   * @returns {(Pick<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>, 'get' | 'set'>)} 
   */
  protected wrap({ get, set }: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>): Pick<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>, 'get' | 'set'> {
    // Use descriptor instance.
    const descriptor = this;
    // Return the wrapped property.
    return {
      get: get
        ? (function (this: O): V { return get?.call(this, descriptor as unknown as D) as V; })
        : (function (this: O): V {
          const o = (this as O);

          // Check if the descriptor is active.
          const active = (typeof descriptor.active === 'object' ? descriptor.active.onGet : descriptor.active) === true;

          // Check if the descriptor is enabled.
          const enabled = (typeof descriptor.enabled === 'boolean' ? descriptor.enabled : WrappedDescriptorCore.enabled) === true;

          // Perform previous descriptor `get`.
          let previousValue = descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
            ? 'value' in descriptor.previousDescriptor
              ? (descriptor.previousDescriptor as PropertyDescriptor).value
              : descriptor.previousDescriptor?.get
                ? descriptor.previousDescriptor.get.call(o, descriptor.previousDescriptor as D)
                : undefined as V
            : undefined as V;

          // Returns 
          return enabled === true
            ? descriptor.onGet && active === true
              ? descriptor.onGet.call(o, descriptor.key as K, previousValue, o[descriptor.privateKey as K] as V, o) as V
              : o[descriptor.privateKey as K] as V
            : undefined as V;
        }
      ),
      set: set
        ? function(this: O, value: V) {
          set?.call(this, value, descriptor as unknown as D);
        }
        : function(this: O, value: V): void {
          // Set the this as the target object.
          const o = (this as O);

          // Check if the descriptor is active.
          const active = (typeof descriptor.active === 'object' ? descriptor.active.onSet : descriptor.active) === true;

          // Check if the descriptor is enabled.
          const enabled = (typeof descriptor.enabled === 'boolean' ? descriptor.enabled : WrappedDescriptorCore.enabled) === true;

          // Initialize `previousValue`.
          let previousValue: V = undefined as V;

          // Get the previous value from previous descriptor or current value.
          if (enabled === true) {
            previousValue = descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
              ? 'value' in descriptor.previousDescriptor
                ? (descriptor.previousDescriptor as PropertyDescriptor).value
                : (descriptor.previousDescriptor as WrappedPropertyDescriptor).privateKey
                  ? o[(descriptor.previousDescriptor as WrappedPropertyDescriptor).privateKey as K] as V
                  : o[descriptor.privateKey as K] as V
              : o[descriptor.privateKey as K] as V;
          }

          // Perform previous descriptor.
          descriptor.previousDescriptor?.set
            && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
            && descriptor.previousDescriptor.set.call(o, value, descriptor.previousDescriptor as D);

          if (enabled === true) {
            // Set the value under the `privateKey`.
            Object.assign(
              o as any,
              {
                [descriptor.privateKey as K]: descriptor.onSet && active === true
                  ? descriptor.onSet.call(o, value, previousValue, descriptor.key, o) as V
                  : value
              }
            );
          }
        }};
  }
}
