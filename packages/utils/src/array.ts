if (!Array.prototype['flatMap']) {
    Object.defineProperty(Array.prototype, 'flatMap', {
        value(f: (...rest: any[]) => any) {
            return this.reduce((ys: any, x: any) => {
                return ys.concat(f.call(this, x))
            }, [])
        },
        enumerable: false,
    })
}


export function sortBy(f) {
    for (var i = this.length; i;) {
        var o = this[--i];
        this[i] = [].concat(f.call(o, o, i), o)
    }
    this.sort(function (a, b) {
        for (var i = 0, len = a.length; i < len; ++i) {
            if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1
        }
        return 0;
    });
    for (var i = this.length; i;) {
        this[--i] = this[i][this[i].length - 1]
    }
    return this;
}

export type IndexedArray<T> = T[]

export type AssociativeArray<T> = {
    [key: string]: T
}

export const toAssociativeArray = <T>(property: string = 'id') => (array: IndexedArray<T>): AssociativeArray<T> => {
    const result: AssociativeArray<T> = {} as AssociativeArray<T>

    for (var i = 0; i < array.length; i++)
        result[array[i][property].toString()] = array[i]

    return result
}

export const toIndexedArray = <T>(array: AssociativeArray<T>, withKey?: string): IndexedArray<T> => {
    const result: IndexedArray<T> = []
    let index = 0
    for (const i in array) {
        result[index] = array[i]
        if (withKey)
            result[index][withKey] = i
        index++
    }

    return result
}

export type ToIndexedArray<T> = <T>(array: AssociativeArray<T>, withKey?: string) => IndexedArray<T>
export const orderBy = <T>(propertyName: string) =>
    (a: T, b: T): number =>
        a[propertyName] > b[propertyName]
            ? 1
            : -1

export const arrify = function <T>(val: T | T[]): T[] {
    if (val === null || val === undefined)
        return []
    return Array.isArray(val) ? val : [val]
}

export const isArray = Array.isArray
