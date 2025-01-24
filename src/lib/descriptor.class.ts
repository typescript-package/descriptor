// Abstract.
import { CommonDescriptor } from './common-descriptor.abstract';
// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
import { DataDescriptor } from './data-descriptor.class';
// Interface.
import { DataPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { AnyPropertyDescriptor } from '@typedly/descriptor';
import { ObjectPropertyDescriptors } from '@typedly/descriptor';
import { ValidationCallback } from '@typedly/callback';
import { ThisAccessorPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description
 * @export
 * @class Descriptor
 * @template {object} [Obj=object] 
 * @template {keyof Obj} [PropertyName=keyof Obj] 
 * @template [Value=Obj[PropertyName]] 
 */
export class Descriptor<
  Obj extends object = object,
  PropertyName extends keyof Obj = keyof Obj,
  Value = Obj[PropertyName],
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
  public static defineAccessor<Value, Obj extends object>(
    descriptor: ThisAccessorPropertyDescriptor<Value, Obj>,
    onValidate?: ValidationCallback
  ): ThisAccessorPropertyDescriptor<Value, Obj> | undefined {
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
  public static defineData<Value>(
    descriptor: DataPropertyDescriptor<Value>,
    onValidate?: ValidationCallback
  ): DataPropertyDescriptor<Value> | undefined {
    return DataDescriptor.define(descriptor, onValidate);
  }

  /**
   * @description Returns property descriptors from the specified object and its prototype.
   * @param object An `object` of a generic `Obj` type to get property descriptors.
   * @returns The return value is an `object` of a `ObjectPropertyDescriptors<Obj>` type.
   */
  public static fromObject<Obj extends object>(
    object: Obj
  ): ObjectPropertyDescriptors<Obj> | undefined {
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
   * @param key A `keyof Obj` value to get property descriptor from the `object`.
   * @returns The return value is an `object` of a `PropertyDescriptor` interface or an `undefined`.
   */
  public static fromProperty<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key
  ): PropertyDescriptor | undefined {
    return (
      Object.getOwnPropertyDescriptor(object, key) ||
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), key)
    );
  }

  /**
   * @alias fromProperty()
   */
  public static get<Obj extends object, Name extends keyof Obj>(
    object: Obj,
    name: Name
  ): PropertyDescriptor | undefined {
    return this.fromProperty(object, name);
  }

  /**
   * @alias fromObject()
   */
  public static getAll<Obj extends object>(
    object: Obj
  ): ObjectPropertyDescriptors<Obj> | undefined {
    return this.fromObject(object);
  }

  /**
   *
   * @param object
   * @param names
   * @returns
   */
  public static pick<Obj extends object | Function, Names extends keyof Obj>(
    object: Obj,
    ...names: Names[]
  ): Pick<ObjectPropertyDescriptors<Obj>, Names> {
    // Prepare constant to assign descriptors of picked keys.
    const pickedDescriptors: Pick<
      ObjectPropertyDescriptors<Obj>,
      Names
    > = {} as any;

    // Get all descriptors.
    const descriptors = this.getAll(object);

    // If descriptors exists then set picked descriptor into the map storage.
    typeof descriptors === 'object' &&
      Object.keys(descriptors)
        .filter(key => names.includes(key as any))
        .forEach(key =>
          Object.assign(pickedDescriptors, {
            [key]: descriptors[key],
          })
        );
    return pickedDescriptors;
  }

  /**
   * The static getter accessor to define `accessor` and `data` descriptor.
   * @returns The returned value is an `object` with `accessor` and `data` properties.
   */
  public static get define(): {
    accessor: <Value, Obj extends object>(
      descriptor: ThisAccessorPropertyDescriptor<Value, Obj>,
      callback?: ValidationCallback
    ) => ThisAccessorPropertyDescriptor<Value, Obj> | undefined,
    data: <Value>(
      descriptor: DataPropertyDescriptor<Value>,
      callback?: ValidationCallback
    ) => DataPropertyDescriptor<Value> | undefined
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
    object: <Obj extends object>(
      object: Obj
    ) => ObjectPropertyDescriptors<Obj> | undefined,
    property: <Obj extends object, Name extends keyof Obj>(
      object: Obj,
      name: Name
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
   * @type {?() => Value}
   */
  public get?: () => Value;

  /**
   * @description
   * @public
   * @type {?(value: Value) => void}
   */
  public set?: (value: Value) => void;

  /**
   * @description
   * @public
   * @type {?Value}
   */
  public value?: Value;

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
   * @param {AnyPropertyDescriptor<Value, Obj>} [param0={}] 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.configurable 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.enumerable 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.get 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.set 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.value 
   * @param {AnyPropertyDescriptor<Value, Obj>} param0.writable 
   * @param {?Obj} [object] 
   * @param {?PropertyName} [key] 
   */
  constructor(
    { configurable, enumerable, get, set ,value, writable }: AnyPropertyDescriptor<Value, Obj> = {},
    object?: Obj,
    key?: PropertyName
  ) {
    super({ configurable, enumerable });

    // Deletes the PropertyDescriptor properties.
    delete this.get, this.set, this.value, this.writable;

    get && (this.get = get);
    set && (this.set = set);

    value && (this.value = value);
    writable && (this.writable = writable);
  }
}
