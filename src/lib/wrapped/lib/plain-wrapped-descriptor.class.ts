// Abstract.
import { PlainWrappedDescriptorBase } from './plain-wrapped-descriptor-base.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description The plain wrapped descriptor class.
 * @export
 * @class PlainWrappedDescriptor
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {PlainWrappedDescriptorBase<O, K, V, A, N, C, E, D>} [D=PlainWrappedDescriptorBase<O, K, V, A, N, C, E, any>] 
 */
export class PlainWrappedDescriptor<
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
  D extends PlainWrappedDescriptorBase<O, K, V, A, N, C, E, D> = PlainWrappedDescriptorBase<O, K, V, A, N, C, E, any>,
> extends PlainWrappedDescriptorBase<O, K, V, A, N, C, E, D> {
  constructor(object: O, key: K, descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>) {
    super(object, key, descriptor);
    // Wraps the `get` getter and `set` setter  of the descriptor.
    const {get, set} = super.wrap(descriptor);
    // Assigns the wrapped `get` getter and `set` setter to the descriptor.
    this.get = get;
    this.set = set;
  }
}