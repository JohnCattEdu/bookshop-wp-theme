<template>
    <div class="filters">
        <label for="sort" class="wrapper">
            <span class="material-icons">sort</span>

            <select name="sort" id="sort" v-model="sort">
                <option v-for="(label, key) in sorts" :key="key" :value="key">
                    {{label}}
                </option>
            </select>
        </label>

        <label for="order" class="wrapper" @click="toggleOrder">
            <span class="material-icons">{{ order === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</span>

            <p class="value">{{ order === 'asc' ? 'Ascending' : 'Descending' }}</p>
        </label>
    </div>
</template>

<script>
import qs from 'query-string';

export default {
    props: {
        sorts: Object,
        initialSort: String,
        initialOrder: String,
    },

    data: function () {
        return {
            sort: this.initialSort,
            order: this.initialOrder,
        };
    },

    methods: {
        toggleOrder (e) {
            e.preventDefault();

            this.order = this.order === 'asc' ? 'desc' : 'asc';
        },

        applyChange () {
            const query = qs.parse(window.location.search);

            query.sort = this.sort;
            query.order = this.order;

            window.location.search = qs.stringify(query);
        },
    },

    watch: {
        order () {
            this.applyChange();
        },

        sort () {
            this.applyChange();
        },
    },
}
</script>
