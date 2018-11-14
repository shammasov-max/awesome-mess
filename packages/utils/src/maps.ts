export class PropertyMap<P extends any> {

    public keyProperty: string
    public remap = (source: P[] = []) => {
        for (let i = 0; i < source.length; i++)
            this.set(String(source[i][this.keyProperty]), source[i])
    }
    public addToMap = (source: P[] = []) => {
        for (let i = 0; i < source.length; i++)
            this.set(String(source[i][this.keyProperty]), source[i])
    }
    public get = (key: any): P =>
        this._map.get(String(key))
    public set = (key: any, value: P) =>
        this._map.set(String(key), value)
    public has = (key: string) =>
        this._map.has(key)
    public clear = () =>
        this._map.clear()
    public delete = (key: string) =>
        this._map.delete(key)
    private _map: Map<string, P> = new Map<string, P>()

    constructor(keyProperty: string = 'id', source: P[] = []) {
        this.keyProperty = keyProperty
        this.remap(source)
    }
}


export class PropertyMultiMap<P extends any> {

    public keyProperty: string
    public secondProperty: string = 'id'
    public remap = (source: P[] = []) => {
        for (let i = 0; i < source.length; i++)
            this.getCreate(source[i][this.keyProperty]).push(source[i])
    }
    public addToMap = (source: P[] = []) => {
        let quant: number = source.length
        for (let i = 0; i < quant; i++) {
            var key: string = String(source[i][this.keyProperty])
            var subKey = String(source[i][this.secondProperty])
            var array = this.getCreate(key)

            var index = array.findIndex(o => o[this.secondProperty] == subKey)

            index != -1 ?
                array.splice(index, 1, source[i])
                :
                array.push(source[i])
        }
    }
    public getCreate = (keyProperty: any): P[] => {
        if (!this.has(keyProperty))
            this.set(keyProperty, [])

        return this.get(keyProperty)
    }
    public get = (key: any): P[] =>
        this._map.get(String(key))
    public set = (key: any, value: P[]): any =>
        this._map.set(String(key), value)
    public has = (key: any): boolean =>
        this._map.has(String(key))
    public clear = (): void =>
        this._map.clear()
    public delete = (key: any): boolean =>
        this._map.delete(String(key))
    private _map: Map<string, P[]> = new Map<string, P[]>()

    constructor(keyProperty: string = 'type_id', source: P[] = []) {
        this.keyProperty = keyProperty
        this.remap(source)
    }
}
