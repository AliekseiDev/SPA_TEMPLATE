import { StateManager } from "./state-manager";

export class Field extends StateManager {
    constructor(options) {
        let state = {
            error: null,
            value: options.defaultValue
        }

        super(state)


        this.subscribe(this.render)
        this.subscribe(() => {
            if (this.onChange) {
                this.onChange(this.value, this.state)
            }
        })
        if (!this.initInNode) throw new Error(`"${this.constructor.name}" does'not have "initInNode" method`)
        if (!this.render) throw new Error(`"${this.constructor.name}" does'not have "render" method`)
    }

    get value() {
        return this.state.value
    }

    setError(error) {
        // this.state.error = error
        this.setState({ error })
    }

    setValue(fn) {
        // this.state.value = fn(this.state.value)
        // this.state.error = null
        this.setState({ value: fn(this.state.value), error: false })
    }

    isValid() {
        if (!this.validate) return true
        let error = this.validate(this.value, this.state)
        this.setError(error)
        return !!error
    }

    handleChange() {
        
    }
}