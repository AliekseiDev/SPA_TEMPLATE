// class Field {
//     constructor(options) {
//         this._value = options.defaultValue || null
//     }
//     get value() {
//         return this._value
//     }
//     set value(val) {
//         this._value = val    
//         return val 
//     }


//     setNode(node) {

//     }

//     initInNode(node) {
//         if (node) console.log('set node')

//         let input = this.node.querySelector('input')
//         let plus = this.node.querySelector('.plus')
//         let minus = this.node.querySelector('.minus')

//         input.addEventListener('change', )
//         plus.addEventListener('click', () => {
//             this.value = this.value++
//         })
//         plus.addEventListener('click', () => {
//             this.value = this.value--
//         })
//     }
// }



// let counter = new Field({ defaultValue: 10 })
// counter.onChange = (val) => {

// }

class Test {
    constructor() {
        this.state = {
            value: { a: 'b' },
            error: null
        }
        subscribe(this.render)
    }

    get value() {
        return this.state.value
    }

    isValid() {
        if (!this.validate) return true
        let error = this.validate(this.value, this.state)
        this.setError(error)
        return !!error
    }

    setError(error) {
        // this.state.error = error
        this.setState({ error })
    }

    setValue(fn) {
        // this.state.value = fn(this.state.value)
        // this.state.error = null
        this.setState({ value: fn(this.state.value), error: false })
        // this.emit()
    }
    
    initInNode() {
        // this.render()
        let elem = document.querySelector('.a')
        elem.addEventListener('change', () => {
            this.setValue((prev) => ({ ...prev, a: Math.random() * 1000 }))
        })
        // this.node.addEventListener('click', () => {
        //     this.setState((prev) => {
        //         prev.loading = true
        //     })
        //     this.timer = setTimeout(() => this.setState({ loading: false }), 3000)
        // })
    }
    render() {
        let { value, error } = this.state
        let elem = document.querySelector('.a')
        elem.value = value.a

        // if (isLoading) elem.classList.add('loading')
        // else elem.classList.remove('loading')
        
        if (error) {
            // render error
            if (error.asyncValidation) return
        } else {
            // remove error
        }
    }

}

let t = new Test()
t.validate = (values, state) => {
    // let error = {}
    if (state.loading) return { asyncValidation: true }
}
t.setValue(() => ({ a: 'c' }))
console.log(t.value)


