//Vue.component('Multiselect', VueMultiselect.default)

let vm = new Vue({
    components: {
        Multiselect: VueMultiselect.default
    },
    data () {
        return {
        // multiselect
        selected: null,
            options: [
        'list', 'of', 'options'
            ]
        }
    },
    methods: {
        updateSelected (newSelected) {
        this.selected = newSelected
        },
        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    },
    el: '#app-vue'
})
