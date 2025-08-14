// Abstract.
import { CommonDescriptor } from './common-descriptor.abstract';
// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
import { DataDescriptor } from './data-descriptor.class';
// Interface.
import { DataPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ObjectPropertyDescriptors, StrictPropertyDescriptor } from '@typedly/descriptor';
import { ThisAccessorPropertyDescriptor } from '@typedly/descriptor';
import { ValidationCallback } from '@typedly/callback';
/**
 * @description The `Descriptor` class is a concrete implementation of the `CommonDescriptor` class that represents a property descriptor.
 * @export
 * @class Descriptor
 * @template [O=any] The type of the object.
 * @template {PropertyKey | keyof O} [K=keyof O] The type of the key.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
 * @template {boolean} [C=boolean] The type of the configurable flag.
 * @template {boolean} [E=boolean] The type of the enumerable flag.
 * @template {boolean} [W=boolean] The type of the writable flag.
 * @extends {CommonDescriptor<C, E>}
 */
export class Descriptor<
  // Object. `any` for proper type capturing by `V`.
  O = any,
  // Key.
  K extends PropertyKey | keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Writable.
  W extends boolean = boolean
> extends CommonDescriptor<C, E> {
  /**
   * @description Creates an instance of `Descriptor`.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of the key.
   * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
   * @template {boolean} [C=boolean] The type of the configurable flag.
   * @template {boolean} [E=boolean] The type of the enumerable flag.
   * @template {boolean} [W=boolean] The type of the writable flag.
   * @param {StrictPropertyDescriptor<V, O, C, E>} [attributes={}] The type of the descriptor.
   * @param {?O} [object] The object (non-stored) to define the descriptor on. The object is optional, if not provided the descriptor will be created without an object.
   * @param {?K} [key] The key (non-stored) to define the descriptor on. The key is optional, if not provided the descriptor will be created without a key.
   * @returns {Descriptor<O, K, V, C, E, W>} 
   */
  public static create<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    attributes: StrictPropertyDescriptor<V, O, C, E> = {},
    object?: O,
    key?: K,
  ): Descriptor<O, K, V, C, E, W> {
    return new Descriptor<O, K, V, C, E, W>(
      attributes,
      object,
      key
    );    
  }
  
  /**
   * @description Creates an instance of `Descriptor`.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of the key.
   * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
   * @template {boolean} [C=boolean] The type of the configurable.
   * @template {boolean} [E=boolean] The type of the enumerable.
   * @template {boolean} [W=boolean] The type of the writable.
   * @param {StrictPropertyDescriptor<V, O, C, E>} [attributes={}] Data descriptor properties.
   * @param {StrictPropertyDescriptor<V, O, C, E>} attributes.configurable The configurable property.
   * @param {StrictPropertyDescriptor<V, O, C, E>} attributes.enumerable The enumerable property.
   * @param {StrictPropertyDescriptor<V, O, C, E>} attributes.value The value for data descriptor.
   * @param {StrictPropertyDescriptor<V, O, C, E>} attributes.writable The writable property.
   * @param {?O} [object] The object (non-stored) to define the descriptor on.
   * @param {?K} [key] The key (non-stored) to define the descriptor on.
   * @returns {StrictPropertyDescriptor<V, O, C, E>} 
   */
  public static define<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    attributes: StrictPropertyDescriptor<V, O, C, E> = {},
    object?: O,
    key?: K,
  ): StrictPropertyDescriptor<V, O, C, E> {
    return {
      ...this.create<O, K, V, C, E, W>(
        attributes,
        object,
        key,
      )
    } as StrictPropertyDescriptor<V, O, C, E>;
  }

  /**
   * @description Returns accessor descriptor of a `ThisAccessorPropertyDescriptor<V, O, C, E>` type, on `get` or `set` property detected.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of the object key.
   * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
   * @template {boolean} [C=boolean] The type of configurable.
   * @template {boolean} [E=boolean] The type of enumerable.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0 The accessor descriptor attributes.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.configurable The configurable property.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.enumerable The enumerable property.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.get The getter function.
   * @param {ThisAccessorPropertyDescriptor<V, O, C, E>} param0.set The setter function.
   * @param {?O} [object] The object (non-stored) to define the descriptor on.
   * @param {?K} [key] The key (non-stored) to define the descriptor on.
   * @param {?ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>} [onValidate] 
   * @returns {(ThisAccessorPropertyDescriptor<V, O, C, E> | undefined)} 
   */
  public static defineAccessor<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any, 
    C extends boolean = boolean,
    E extends boolean = boolean
  >(
    {configurable, enumerable, get, set}: ThisAccessorPropertyDescriptor<V, O, C, E>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<ThisAccessorPropertyDescriptor<V, O, C, E>>
  ): ThisAccessorPropertyDescriptor<V, O, C, E> | undefined {
    return AccessorDescriptor.define<O, K, V, C, E>({ configurable, enumerable, get, set }, object, key, onValidate);
  }

  /**
   * @description Returns data descriptor of a `DataPropertyDescriptor<Value>` interface, on `writable` or `value` property detected.
   * @public
   * @static
   * @template [O=any] The type of the object.
   * @template {PropertyKey | keyof O} [K=keyof O] The type of the object key.
   * @template [V=K extends keyof O ? O[K] : any] The type of the value.
   * @template {boolean} [C=boolean] The type of configurable.
   * @template {boolean} [E=boolean] The type of enumerable.
   * @template {boolean} [W=boolean] The type of writable.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0 An `object` of a `DataPropertyDescriptor<Value>` interface, to set with the default values of the `CommonDescriptor`.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.configurable The configurable property.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.enumerable The enumerable property.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.value The value property.
   * @param {DataPropertyDescriptor<V, C, E, W>} param0.writable The writable property.
   * @param {?O} [object] The object (non-stored) to define the descriptor on.
   * @param {?K} [key] The key (non-stored) to define the descriptor on.
   * @param {?ValidationCallback<DataPropertyDescriptor<V, C, E, W>>} [onValidate] An optional `ValidationCallback` function to handle the result of the check whether or not the `descriptor` is an `object` with the `writable` or `value` property.
   * @returns {(DataPropertyDescriptor<V, C, E, W> | undefined)} 
   */
  public static defineData<
    O = any,
    K extends PropertyKey | keyof O = keyof O,
    V = K extends keyof O ? O[K] : any,
    C extends boolean = boolean,
    E extends boolean = boolean,
    W extends boolean = boolean
  >(
    {configurable, enumerable, value, writable}: DataPropertyDescriptor<V, C, E, W>,
    object?: O,
    key?: K,
    onValidate?: ValidationCallback<DataPropertyDescriptor<V, C, E, W>>
  ): DataPropertyDescriptor<V, C, E, W> | undefined {
    return DataDescriptor.define<O, K, V, C, E, W>({configurable, enumerable, writable, value}, object, key, onValidate);
  }

  /**
   * @description Returns property descriptors from the specified object and its prototype.
   * @public
   * @static
   * @template O The type of the object.
   * @param {O} object An `object` of a generic `Obj` type to get property descriptors.
   * @returns {(ObjectPropertyDescriptors<O> | undefined)} The return value is an `object` of a `ObjectPropertyDescriptors<O> | undefined` type.
   */
  public static fromObject<O>(
    object: O
  ): ObjectPropertyDescriptors<O> | undefined {
    return {
      ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(object)) || {}, // ['__proto__'] equivalent to getPrototypeOf()
      ...Object.getOwnPropertyDescriptors(object) || {},
    } as any;
  }

  /**
   * @description Returns property descriptor from the `object` or `class` prototype.
   * Wrapper function for the `getOwnPropertyDescriptor`, which "Gets the own property descriptor of the specified object."
   * @param object An `object` of a generic `Obj` type or a class to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype to get the property descriptor.
   * @param key A `keyof Obj` value to get property descriptor from the `object`.
   * @returns The return value is an `object` of a `PropertyDescriptor` interface or an `undefined`.
   * @example
   * // Useful here.
   * class A {
   *  get foo() { return "foo"; }
   * }
   * const a = new A();
   * Descriptor.fromProperty(a, 'foo'); // {set: undefined, enumerable: false, configurable: true, get: ƒ}
   */
  public static fromProperty<O, K extends keyof O>(
    object: O,
    key: K,
  ): PropertyDescriptor | undefined {
    return (
      Object.getOwnPropertyDescriptor(object, key) ||
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), key)
    );
  }

  /**
   * @alias fromProperty()
   */
  public static get<O, K extends keyof O>(object: O, key: K): PropertyDescriptor | undefined {
    return this.fromProperty(object, key);
  }

  /**
   * @alias fromObject()
   */
  public static getAll<O>(object: O): ObjectPropertyDescriptors<O> | undefined {
    return this.fromObject(object);
  }

  /**
   * @description Picks the descriptors of the specified keys from the `object`.
   * @public
   * @static
   * @template O 
   * @template {keyof O} K 
   * @param {O} object 
   * @param {...K[]} keys 
   * @returns {Pick<ObjectPropertyDescriptors<O>, K>} 
   */
  public static pick<O, K extends keyof O>(
    object: O,
    ...keys: K[]
  ): Pick<ObjectPropertyDescriptors<O>, K> {
    // Prepare constant to assign descriptors of picked keys.
    const result: Pick<ObjectPropertyDescriptors<O>, K> = {} as any;

    // Get all descriptors.
    const descriptors = this.getAll(object);

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
   * The static getter accessor to get descriptors from property or object.
   * @returns The returned value is an `object` with `object` and `property` properties.
   */
  public static get from(): {
    object: <O>(
      object: O
    ) => ObjectPropertyDescriptors<O> | undefined,
    property: <O, K extends keyof O>(
      object: O,
      key: K
    ) => PropertyDescriptor | undefined,
  } {
    return {
      object: this.fromObject,
      property: this.fromProperty,
    }
  }

  //#region Property descriptor
  /**
   * @description The configurable property.
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
   * @description The value property.
   * @public
   * @type {?V}
   */
  public value?: V;

  /**
   * @description The writable property.
   * @public
   * @type {?W}
   */
  public writable?: W;
  //#endregion

  /**
   * Creates an instance of `Descriptor`.
   * @constructor
   * @param {StrictPropertyDescriptor<V, O, C, E>} [param0={}] The attributes of the descriptor.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.configurable The configurable property.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.enumerable The enumerable property.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.get The getter function.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.set The setter function.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.writable The writable property.
   * @param {StrictPropertyDescriptor<V, O, C, E>} param0.value The value property.
   * @param {?O} [object] The object (non-stored) to define the descriptor on. The object is optional, if not provided the descriptor will be created without an object.
   * @param {?K} [key] The key (non-stored) of the property to define the descriptor on.
   */
  constructor(
    {configurable, enumerable, get, set, value, writable}: StrictPropertyDescriptor<V, O, C, E> = {},
    object?: O,
    key?: K
  ) {
    super({configurable, enumerable});

    // Deletes the PropertyDescriptor properties.
    delete this.get, delete this.set, delete this.value, delete this.writable;

    get && (this.get = get);
    set && (this.set = set);

    value && (this.value = value);
    writable && (this.writable = writable as W);
  }
}
