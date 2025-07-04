// Abstract.
import { CommonDescriptor } from './common-descriptor.abstract';
// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
import { DataDescriptor } from './data-descriptor.class';
// Interface.
import { DataPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ObjectPropertyDescriptors, StrictPropertyDescriptor } from '@typedly/descriptor';
import { ValidationCallback } from '@typedly/callback';
import { ThisAccessorPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description
 * @export
 * @class Descriptor
 * @template {object} [O=object] 
 * @template {keyof O} [K=keyof O] 
 * @template [V=O[K]] 
 */
export class Descriptor<
  O extends object = object,
  K extends keyof O = keyof O,
  V = O[K]
> extends CommonDescriptor {
  /**
   * @description Returns accessor descriptor of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param onValidate An optional `ValidationCallback` function to handle the result of the check whether or not the `descriptor` is an
   * `object` with `get` or `set` property, by default it uses  `accessorCallback()` function from the `guard`.
   * @throws Throws an `Error` if the `descriptor` is not an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type,
   * which means it doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type.
   */
  public static defineAccessor<V, O extends object>(
    descriptor: ThisAccessorPropertyDescriptor<V, O>,
    onValidate?: ValidationCallback
  ): ThisAccessorPropertyDescriptor<V, O> | undefined {
    return AccessorDescriptor.define(descriptor, onValidate);
  }

  /**
   * @description Returns data descriptor of a `DataPropertyDescriptor<Value>` interface, on `writable` or `value` property detected.
   * @param descriptor An `object` of a `DataPropertyDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param onValidate An optional `ValidationCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `DataPropertyDescriptors.guard()` method.
   * @returns The return value is an `object` of a `DataPropertyDescriptor<Value>` interface.
   */
  public static defineData<V>(
    descriptor: DataPropertyDescriptor<V>,
    onValidate?: ValidationCallback
  ): DataPropertyDescriptor<V> | undefined {
    return DataDescriptor.define(descriptor, onValidate);
  }

  /**
   * @description Returns property descriptors from the specified object and its prototype.
   * @param object An `object` of a generic `Obj` type to get property descriptors.
   * @returns The return value is an `object` of a `ObjectPropertyDescriptors<Obj>` type.
   */
  public static fromObject<O extends object>(
    object: O
  ): ObjectPropertyDescriptors<O> | undefined {
    return {
      ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(object)) || {}, // ['__proto__'] equivalent to getPrototypeOf()
      ...Object.getOwnPropertyDescriptors(object) || {},
    } as any;
  }

  /**
   * Returns property descriptor from the `object` or `class` prototype.
   * Wrapper function for the `getOwnPropertyDescriptor`, which "Gets the own property descriptor of the specified object."
   * @param object An `object` of a generic `Obj` type or a class to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype to get the property descriptor.
   * @param name A `keyof Obj` value to get property descriptor from the `object`.
   * @returns The return value is an `object` of a `PropertyDescriptor` interface or an `undefined`.
   * @example
   * // Useful here.
   * class A {
   *  get foo() { return "foo"; }
   * }
   * const a = new A();
   * Descriptor.fromProperty(a, 'foo'); // {set: undefined, enumerable: false, configurable: true, get: ƒ}
   */
  public static fromProperty<
    O extends object,
    N extends keyof O,
  >(
    object: O,
    name: N,
  ): PropertyDescriptor | undefined {
    return (
      Object.getOwnPropertyDescriptor(object, name) ||
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), name)
    );
  }

  /**
   * @alias fromProperty()
   */
  public static get<O extends object, K extends keyof O>(
    object: O,
    key: K
  ): PropertyDescriptor | undefined {
    return this.fromProperty(object, key);
  }

  /**
   * @alias fromObject()
   */
  public static getAll<O extends object>(
    object: O
  ): ObjectPropertyDescriptors<O> | undefined {
    return this.fromObject(object);
  }

  /**
   *
   * @param target
   * @param keys
   * @returns
   */
  public static pick<T extends object | Function, K extends keyof T>(
    target: T,
    ...keys: K[]
  ): Pick<ObjectPropertyDescriptors<T>, K> {
    // Prepare constant to assign descriptors of picked keys.
    const result: Pick<
      ObjectPropertyDescriptors<T>,
      K
    > = {} as any;

    // Get all descriptors.
    const descriptors = this.getAll(target);

    // If descriptors exists then set picked descriptor into the map storage.
    typeof descriptors === 'object' &&
      Object.keys(descriptors)
        .filter(key => keys.includes(key as any))
        .forEach(key =>
          Object.assign(result, {
            [key]: descriptors[key],
          })
        );
    return result;
  }

  /**
   * The static getter accessor to define `accessor` and `data` descriptor.
   * @returns The returned value is an `object` with `accessor` and `data` properties.
   */
  public static get define(): {
    accessor: <V, O extends object>(
      descriptor: ThisAccessorPropertyDescriptor<V, O>,
      callback?: ValidationCallback
    ) => ThisAccessorPropertyDescriptor<V, O> | undefined,
    data: <V>(
      descriptor: DataPropertyDescriptor<V>,
      callback?: ValidationCallback
    ) => DataPropertyDescriptor<V> | undefined
  } {
    return {
      accessor: this.defineAccessor,
      data: this.defineData
    }
  }

  /**
   * The static getter accessor to get descriptors from property or object.
   * @returns The returned value is an `object` with `object` and `property` properties.
   */
  public static get from(): {
    object: <O extends object>(
      object: O
    ) => ObjectPropertyDescriptors<O> | undefined,
    property: <O extends object, N extends keyof O>(
      object: O,
      name: N
    ) => PropertyDescriptor | undefined,
  } {
    return {
      object: this.fromObject,
      property: this.fromProperty,
    }
  }

  //#region Property descriptor
  /**
   * @description
   * @public
   * @type {?() => V}
   */
  public get?: () => V;

  /**
   * @description
   * @public
   * @type {?(value: V) => void}
   */
  public set?: (value: V) => void;

  /**
   * @description
   * @public
   * @type {?V}
   */
  public value?: V;

  /**
   * @description
   * @public
   * @type {?boolean}
   */
  public writable?: boolean;
  //#endregion

  /**
   * Creates an instance of `Descriptor`.
   * @constructor
   * @param {StrictPropertyDescriptor<V, O>} [param0={}] 
   * @param {StrictPropertyDescriptor<V, O>} param0.configurable 
   * @param {StrictPropertyDescriptor<V, O>} param0.enumerable 
   * @param {StrictPropertyDescriptor<V, O>} param0.get 
   * @param {StrictPropertyDescriptor<V, O>} param0.set 
   * @param {StrictPropertyDescriptor<V, O>} param0.value 
   * @param {StrictPropertyDescriptor<V, O>} param0.writable 
   * @param {?O} [object] 
   * @param {?K} [key] 
   */
  constructor(
    { configurable, enumerable, get, set ,value, writable }: StrictPropertyDescriptor<V, O> = {},
    object?: O,
    key?: K
  ) {
    super({ configurable, enumerable });

    // Deletes the PropertyDescriptor properties.
    delete this.get, delete this.set, delete this.value, delete this.writable;

    get && (this.get = get);
    set && (this.set = set);

    value && (this.value = value);
    writable && (this.writable = writable);
  }
}
