// Class.
import { Descriptor } from "./descriptor.class";
// Type.
import { StrictPropertyDescriptor, PropertyDescriptorChain } from "@typedly/descriptor"

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
  D extends StrictPropertyDescriptor<V, O, C, E> = StrictPropertyDescriptor<V, O, C, E>,
  // Descriptor chain.
  DR extends Descriptor<O, K, V, C, E> = Descriptor<O, K, V, C, E>
> implements PropertyDescriptorChain<O, K, V, A, ED, C, E, D> {
  //#region Getter
  abstract get active(): A;
  abstract get current(): D;
  abstract get enabled(): ED;
  abstract get lastIndex(): number;
  abstract get size(): number;
  //#endregion Getter

  //#region Method
  abstract add(descriptor: D): this;
  abstract clear(): this;
  abstract delete(index: number): this;
  abstract entries(): IterableIterator<[number, D]>;
  abstract first(): D;
  abstract get(index: number): D;
  abstract has(index: number): boolean;
  abstract last(): D;
  abstract load(): this;
  abstract set(index: number, value: D): this;
  abstract update(index: number, value: D): this;
  abstract values(): IterableIterator<D>;
  //#endregion Method
}
