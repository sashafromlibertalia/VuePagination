<div align="center">
<h1>Vuepagify</h1>
<h4>🍉 Pagination component for Vue.js</h4>
</div>

## Installation

```bash
npm i vuepagify
```

## Usage
First, you need to register component globally
```js
import PaginationComponent from "vuepagify"

Vue.use(PaginationComponent)
```
Then use it in your template:
```vue
<template>
    <!--Your code-->
    <v-pagination pages-amount="5" @change="handlePaging"/>
</template>

<script>
export default {
    methods: {
        async handlePaging(page) {
            await this.$router.replace({
                name: this.$route.name,
                query: { page: page },
            }).catch(() => {})

            // ...
        }
    }
}
</script>
```
For further information check [API](/details/)