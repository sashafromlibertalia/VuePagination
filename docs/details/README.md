## API

### Props
#### PagesAmount
Provides a number of pages for pagination component.

**Usage**
```vue
<template>
    <v-pagination pages-amount="5" />
</template>
```

### Events

#### Change
Handles page changes.

**Usage**

```vue
<template>
    <v-pagination @change="handlePaging" />
</template>

<script>
export default {
    methods: {
        async handlePaging(page) {
            await this.$router.replace({
                name: this.$route.name,
                query: { page: page },
            }).catch(() => {})
            
            // Rest of code
        }
    }
}
</script>
```

This library is built with [vue-router](https://router.vuejs.org). It's strongly connected to the current URL:
```
https://website.com/some/url?page=1
```
You see query string `page`. It's **strongly** connected with `vuepagify`. Once you changed page, your URL also will be changed with new query string. Without `$router.replace` it **won't** be possible.

If you're using this component in multiple templates, it will be a good idea to make replacing function reusable like this

```js
const paginationReplacePage = async (router, route, page) => {
    await router.replace({
        name: route,
        query: { page: page },
    }).catch(() => {})
}

export default paginationReplacePage
```

```vue
<template>
    <v-pagination @change="handlePaging" />
</template>

<script>
import paginationReplacePage from "helper"

export default {
    methods: {
        async handlePaging(page) {
            await paginationReplacePage(this.$router, this.$route.name, page)
            
            // Rest of code
        }
    }
}
</script>
```

## Preview

In progress

## Themes

In progress