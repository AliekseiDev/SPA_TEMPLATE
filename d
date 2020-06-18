somejsFile
    import inputTextView from '$common/forms/inputText/inputText.pug'
    let html = inputTextView({ hasAsd })


static
    fonts
    images
    svg-sprite
    font-icons single-color
    svgspritemap.svg
apps
    desktop
        scss
            index.scss
        js
            header.js
        layouts
            main-layout.pug
        pages
            home
                parts
                    welcome.pug
                    welcome.scss
                home.page.pug
                home.page.scss
                home.page.js
                    import { InputTextField } from '$common/forms/inputText'
                    import Observer from '$common/modules/observer'
                    import '$desktop/js/header.js'
                    let email = new InputTextField({ defaultValue: '' })
                    email.onChange = () => {}
                    let node = '.login #email'
                    email.initNode(node)
                    email.removeNode()
                    email.value
                    email.value = '' // call onChange
                    class Field {
                        constructor(options) {
                            let { defaultValue, node } = options
                            if ('defaultValue' in options) this.defaultValue = defaultValue
                            this.value = defaultValue || null
                            this.node = node
                            this.onChange = onChange || null
                            this.initNode = null
                            this.removeNode = () => {
                                if (this.node) {
                                    this.node.remove()
                                    this.node = null
                                }
                            }
                            this.getValueFromNode = null
                            this.setValue = null
                            this.renderError = null

                        }
                        get value() {
                            if (!this.node) return this.value
                            return this.getValueFromNode()
                        }
                        set value(val) {
                            this.setValue(val)
                            if (this.onChange) this.onChange(val)
                        }
                    }

    common
        modules
            observer.js
        scss
            vars.scss
            webpack-svg-sprite.scss
            components
        forms
            inputText
                inputText.pug
                inputText.js
            compositeFields
                newItemColor
                    newItemColor.pug
                        include ../../inputText
                        div
                            +inputText()
                            img(src=require('$image'))
                    newItemColor.js
                        class NewItemColorField {
                            constructor(opts) {
                                super(opts)
                            }

                            initNode(node) {
                                this.node.find('input').on('change', (e) => {
                                    this.setValue(this.getValueFromNode())
                                })
                            }

                            getValueFromNode() {
                                return this.node.find('input').value
                            }

                            setValue(val, toNode) {
                                this.value = val
                            }
                        }
        pug
            svgSprite.pug
                +svgSprite(icon)
                    svg
                        use(xlink:href=`${require('$static/svgspritemap.svg')}#${icon}`)