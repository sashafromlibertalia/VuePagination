<template>
    <div class='pagination-wrapper' v-if='allPages.length > 1'>
        <div v-for='(page, index) of allPages' :key='index'>
            <span :key='index'
                  :id='handleId(page, index)'
                  :class='{"active-page": page === thisPage, "action-btn": isActionButton(index)}'
                  @click='changePage'>{{ page }}</span>
        </div>
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
                return typeof value === 'number' && value > 0
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
            return [...Array.from({length: this.pagesAmount}, (_, index) => index + 1)]
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
            if (this.pagination.length <= this.maxPages) return page

            if (!index) {
                if (!this.allPages.includes('Prev')) {
                    return page
                }

                return 0
            } else if (index === this.allPages.length - 1) {
                if (!this.allPages.includes('Next')) {
                    return page
                }

                return this.lastIndex
            }

            return page
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

<style scoped>
:root {
    --brand2: #005AE8;
    --brand3: #18214D;
    --animation-template: cubic-bezier(0.4, 0.01, 0.165, 0.99);
    --light-gray: #F2F2F2;
}

.pagination-wrapper {
    margin-top: 2rem;
    display: flex;
}

.pagination-wrapper span {
    padding: 16px 20px;
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--brand3);
    transition: all 200ms var(--animation-template);

    &:hover {
        background: var(--light-gray);
    }
}

.pagination-wrapper span:first-child {
    border-radius: 8px 0 0 8px;
}

.pagination-wrapper span:last-child {
    border-radius: 0 8px 8px 0;
}

.action-btn {
    user-select: none;
}

.active-page {
    background: var(--brand2);
    color: white;
}

.active-page:hover {
    background: var(--brand2);
}
</style>