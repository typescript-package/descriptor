// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description
 * @export
 * @abstract
 * @class WrappedDescriptorBase
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [N=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @template {WrappedDescriptorBase<O, K, V, A, N, C, E, D>} [D=WrappedDescriptorBase<O, K, V, A, N, C, E, any>] 
 * @extends {WrappedDescriptorCore<O, K, V, A, N, C, E, D>}
 */
export abstract class WrappedDescriptorBase<
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
  // The type of the previous descriptor.
  D extends WrappedDescriptorBase<O, K, V, A, N, C, E, D> = WrappedDescriptorBase<O, K, V, A, N, C, E, any>
> extends WrappedDescriptorCore<O, K, V, A, N, C, E, D> {
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
   * @description
   * @public
   * @readonly
   * @type {((this: O, descriptor?: D | undefined) => V) | undefined}
   */
  public get get() {
    return this.#get;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {((this: O, value: V, descriptor?: D | undefined) => void) | undefined}
   */
  public get set() {
    return this.#set;
  }

  #get?: (this: O, descriptor?: D) => V;
  #set?: (this: O, value: V, descriptor?: D) => void;

  /**
   * Creates an instance of `WrappedDescriptor`.
   * @constructor
   * @param {O} object 
   * @param {K} key
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} param0 
   */
  constructor(
    object: O,
    key: K, 
    { configurable, enumerable }: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
  ) {
    super({ configurable, enumerable });
  }

  /**
   * @description Activate the callbacks `onGet` and `onSet`.
   * @abstract
   * @returns {this} 
   */
  abstract activate(): this;

  /**
   * @description Deactivate the callbacks `onGet` and `onSet`.
   * @abstract
   * @returns {this} 
   */
  abstract deactivate(): this;

  /**
   * @description Disables the descriptor.
   * @abstract
   * @returns {this} 
   */
  abstract disable(): this;

  /**
   * @description Enables the descriptor.
   * @abstract
   * @returns {this} 
   */
  abstract enable(): this;
 
  /**
   * @description Checks whether the descriptor callback `onGet` or `onSet` is active or 'both' are active.
   * @public
   * @param {('both' | 'onGet' | 'onSet')} type 
   * @returns {boolean} 
   */
  public isActive(type: 'both' | 'onGet' | 'onSet'): boolean {
    switch(type) {
      case 'both':
        return this.active === true || (typeof this.active === 'object' && (this.active.onGet === true && this.active.onSet === true));
      case 'onGet':
      case 'onSet':
        return typeof this.active === 'object'
          ? this.active[type] === true || false
          : this.active === true;
      default:
        throw new Error(`Invalid type: ${type}. Expected 'both', 'onGet' or 'onSet'.`);
    }
  }

  /**
   * @description Wraps the property with the descriptor.
   * @protected
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} param0 The wrapped property `set` and `get` descriptor.
   */
  protected wrap({ get, set }: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>): void {
    // Use descriptor instance.
    const descriptor = this;

    // Set the `get`.
    this.#get = get
      ? (function (this: O): V { return get?.call(this, descriptor as unknown as D) as V; })
      : (function (this: O): V {
        if (descriptor.enabled === true) {
          const o = (this as O);

          // Get the previous value from descriptor.
          const previousValue = descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
            ? descriptor.previousDescriptor.get && typeof descriptor.previousDescriptor.get === 'function'
              ? descriptor.previousDescriptor.get.call(this)
              : 'value' in descriptor.previousDescriptor
                ? descriptor.previousDescriptor.value
                : undefined
            : undefined;

          // Current descriptor.
          return descriptor.onGet && descriptor.isActive('onGet')
            ? descriptor.onGet.call(o, descriptor.key as K, previousValue, o[descriptor.privateKey as K] as V, o) as V
            : o[descriptor.privateKey as K] as V;
        } else {
          return undefined as V;
        }
      }
    );

    // Set the `set`.
    this.#set = set
      ? function(this: O, value: V) {
        set?.call(this, value, descriptor as unknown as D);
      }
      : function(this: O, value: V): void {
        if (descriptor.enabled === true) {
          // Set the this as the target object.
          const o = (this as O);

          // Get the previous value from previous descriptor or current value.
          const previousValue = o[descriptor.privateKey as K] as V
            || (
              descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
                ? descriptor.previousDescriptor.get
                  ? descriptor.previousDescriptor.get.call(this)
                  : 'value' in descriptor.previousDescriptor
                    ? descriptor.previousDescriptor.value
                    : undefined
                : undefined
            ) as V;


          // Perform previous descriptor.
          descriptor.previousDescriptor?.set
            && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
            && descriptor.previousDescriptor.set.call(o, value);

          // Set the private property value.
          Object.assign(
            o as any,
            {
              [descriptor.privateKey as K]: descriptor.onSet && descriptor.isActive('onSet')
                ? descriptor.onSet.call(o, value, previousValue, descriptor.key, o) as V
                : value
            }
          );
        }
      };
  }
}
