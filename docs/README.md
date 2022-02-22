<div align="center">
<h1>Vue pagination</h1>
<h4>🍉 Pagination component for Vue.js</h4>
</div>

## Installation

```bash
npm i vue-pagination
```

## Usage
This library is built with [vue-router](https://router.vuejs.org). It's strongly connected to the current URL:
> https://website.com/some/url?page=1

Query `Page` is used for our component. You can't change page without replacing current query data:

```vue
<template>
    <v-pagination pages-amount="5" @change="handlePaging"/>
</template>

<script>
export default {
    methods: {
        async handlePaging(page) {
            // MUST
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

It would be a good idea to create special `helper.js` file for reuse of router replacer.