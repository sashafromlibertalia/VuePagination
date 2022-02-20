<template>
    <div class='pagination-wrapper' v-if='allPages.length > 1'>
        <template v-for='(page, index) of allPages'>
            <span :key='index'
                  :id='handleId(page, index)'
                  :class='{"active-page": page === thisPage, "action-btn": isActionButton(index)}'
                  @click='changePage'>{{ page }}</span>
        </template>
    </div>
</template>

<script>
const MAXIMUM_PAGE_DISPLAY = 5
const INITIAL_PAGE = 1

export default {
    name: 'Pagination',
    props: {
        pagesAmount: {
            type: Number,
            required: true,
            default: 1,
            validator(value) {
                typeof value === 'number' && value > 0
            }
        },
    },
    data() {
        return {
            subPage: INITIAL_PAGE,
            selectedPage: INITIAL_PAGE,
            maxPagesDisplay: MAXIMUM_PAGE_DISPLAY,
        }
    },
    computed: {
        pagination() {
            return [...Array.from({ length: this.pagesAmount }, (_, index) => index + 1)]
        },
        allPages() {
            if (this.pagesAmount > MAXIMUM_PAGE_DISPLAY) {
                if (this.pagination.slice(this.trimStart, this.trimEnd).includes(1)) {
                    return [...this.pagination.slice(this.trimStart, this.trimEnd), 'Next']
                }
                if (this.pagination.slice(this.trimStart, this.trimEnd).length < MAXIMUM_PAGE_DISPLAY) {
                    return ['Prev', ...this.pagination.slice(this.trimStart, this.trimEnd)]
                }
                return ['Prev', ...this.pagination.slice(this.trimStart, this.trimEnd), 'Next']
            } else {
                return this.pagination
            }
        },
        lastIndex() {
            /// NOTE: Why there is a pow? It's a guarantee that we won't get the same indexes on pagination.
            return Math.pow(this.allPages.length, 2)
        },
        thisPage() {
            return parseInt(`${this.$route.query.page}`, 10)
        },
        trimStart() {
            return (this.subPage - 1) * MAXIMUM_PAGE_DISPLAY
        },
        trimEnd() {
            return (this.trimStart) + MAXIMUM_PAGE_DISPLAY
        },
    },
    methods: {
        handleId(page, index) {
            if (this.pagination.length > this.maxPagesDisplay) {
                if (index === 0) {
                    if (!this.allPages.includes('Prev')) {
                        return page
                    } else {
                        return 0
                    }
                } else if (index === this.allPages.length - 1) {
                    if (!this.allPages.includes('Next')) {
                        return page
                    } else {
                        return this.lastIndex
                    }
                } else {
                    return page
                }
            } else {
                return page
            }
        },
        isActionButton(index) {
            if (this.pagination.length > this.maxPagesDisplay) {
                if ((index === 0 && !this.allPages.includes('Prev')) || (index === this.allPages.length - 1 && !this.allPages.includes('Next'))) {
                    return false
                } else {
                    return [0, this.allPages.length - 1].includes(index)
                }
            }
            return false
        },
        changePage(e) {
            const targetId = parseInt(e.target.id, 10)

            if (this.pagination.length > MAXIMUM_PAGE_DISPLAY) {
                // Selects any page except "Prev" and "Next" buttons
                if (![0, this.lastIndex].includes(targetId)) {
                    this.selectedPage = targetId
                }

                // Shows prev trimmed pages
                if (targetId === 0 && this.subPage !== 1) {
                    this.subPage--
                }

                // Shows next trimmed pages
                if (targetId === this.lastIndex && this.subPage !== Math.ceil(this.pagination.length / MAXIMUM_PAGE_DISPLAY)) {
                    this.subPage++
                }
            } else {
                this.selectedPage = targetId
            }
        },
    },
    updated() {
        this.selectedPage = this.$route.query.page
    },
    watch: {
        selectedPage: {
            handler() {
                this.$emit('change', this.selectedPage)
            },
            deep: true,
        },
    },
}
</script>

<style lang='scss'>
$brand3: #18214D;
$animation__template: cubic-bezier(0.4, 0.01, 0.165, 0.99);
$light_gray: #F2F2F2;
$brand2: #005AE8;

.pagination-wrapper {
    margin-top: 2rem;
    display: flex;

    & span {
        padding: 16px 20px;
        cursor: pointer;
        font-size: 1.1rem;
        color: $brand3;
        transition: all 200ms $animation__template;

        &:first-child {
            border-radius: 8px 0 0 8px;
        }

        &:last-child {
            border-radius: 0 8px 8px 0;
        }

        &:hover {
            background: $light_gray;
        }
    }

    .action-btn {
        user-select: none;
    }

    .active-page {
        background: $brand2;
        color: white;

        &:hover {
            background: $brand2;
        }
    }
}

</style>