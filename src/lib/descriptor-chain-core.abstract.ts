// Type.
import { PropertyDescriptorChain, ThisAccessorPropertyDescriptor } from "@typedly/descriptor"
/**
 * @description The core abstract class for descriptor chains to store related property descriptors.
 * @export
 * @abstract
 * @class DescriptorChainCore
 * @template [O=any] The type of the object that the property descriptors are associated with.
 * @template {keyof O} [K=keyof O] The type of the property name in the object.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the property in the object.
 * @template {boolean} [A=boolean] The type of the active state of the descriptor.
 * @template {boolean} [ED=boolean] The enabled state of the descriptor.
 * @template {boolean} [C=boolean] The configurable state of the descriptor.
 * @template {boolean} [E=boolean] The enumerable state of the descriptor.
 * @template {ThisAccessorPropertyDescriptor<V, O, C, E>} [D=ThisAccessorPropertyDescriptor<V, O, C, E>] The strict property descriptor type.
 * @implements {PropertyDescriptorChain<O, K, V, A, ED, C, E, D>}
 */
export abstract class DescriptorChainCore<
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
  // Descriptor
  D extends ThisAccessorPropertyDescriptor<V, O, C, E> = ThisAccessorPropertyDescriptor<V, O, C, E>,
> implements PropertyDescriptorChain<O, K, V, A, ED, C, E, D> {
  //#region Getter
  /**
   * @description The active state of the descriptor chain.
   * @abstract
   * @readonly
   * @type {A}
   */
  abstract get active(): A;

  /**
   * @description The current descriptor that is being used by the property.
   * @abstract
   * @readonly
   * @type {D}
   */
  abstract get current(): D;

  /**
   * @description The enabled state of the descriptor chain.
   * @abstract
   * @readonly
   * @type {ED}
   */
  abstract get enabled(): ED;

  /**
   * @description The last index of the descriptor chain.
   * @abstract
   * @readonly
   * @type {number}
   */
  abstract get lastIndex(): number;

  /**
   * @description The size of the descriptor chain.
   * @abstract
   * @readonly
   * @type {number}
   */
  abstract get size(): number;
  //#endregion Getter

  //#region Method
  /**
   * @description Adds a new descriptor to the chain.
   * @abstract
   * @param {D} descriptor 
   * @returns {this} The instance of the descriptor chain for method chaining.
   */
  abstract add(descriptor: D): this;

  /**
   * @description Clear the descriptor chain.
   * @abstract
   * @returns {this} The instance of the descriptor chain for method chaining.
   */
  abstract clear(): this;

  /**
   * @description Deletes a descriptor from the chain at the specified index.
   * @abstract
   * @param {number} index 
   * @returns {this} 
   */
  abstract delete(index: number): this;

  /**
   * @description Returns an iterable iterator of the entries in the descriptor chain.
   * @abstract
   * @returns {IterableIterator<[number, D]>} 
   */
  abstract entries(): IterableIterator<[number, D]>;

  /**
   * @description Returns the first descriptor in the chain.
   * @abstract
   * @returns {D} 
   */
  abstract first(): D;

  /**
   * @description Returns the descriptor at the specified index.
   * @abstract
   * @param {number} index 
   * @returns {D} 
   */
  abstract get(index: number): D;

  /**
   * @description Checks if a descriptor exists at the specified index.
   * @abstract
   * @param {number} index 
   * @returns {boolean} 
   */
  abstract has(index: number): boolean;

  /**
   * @description Returns the last descriptor in the chain.
   * @abstract
   * @returns {D} 
   */
  abstract last(): D;

  /**
   * @description Loads the  the descriptor chain.
   * @abstract
   * @returns {this} The instance of the descriptor chain for method chaining.
   */
  abstract load(): this;

  /**
   * @description Sets the descriptor at the specified index with a new value.
   * @abstract
   * @param {number} index The index at which to set the descriptor.
   * @param {D} value The new descriptor value to set. 
   * @returns {this} The instance of the descriptor chain for method chaining.
   */
  abstract set(index: number, value: D): this;

  /**
   * @description The update method updates the descriptor at the specified index with a new value.
   * @abstract
   * @param {number} index The index at which to update the descriptor.
   * @param {D} value The new descriptor value to set.
   * @returns {this} The instance of the descriptor chain for method chaining.
   */
  abstract update(index: number, value: D): this;

  /**
   * @description Returns an iterable iterator of the values in the descriptor chain.
   * @abstract
   * @returns {IterableIterator<D>} 
   */
  abstract values(): IterableIterator<D>;
  //#endregion Method
}
