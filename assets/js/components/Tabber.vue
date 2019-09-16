<script>
export default {
    data: () => ({
        currentTab: 0,
    }),

    methods: {
        switchTab (e, index) {
            e.preventDefault();

            this.currentTab = index;
        },
    },

    render () {
        const tabs = this.$slots.default.filter(c => c.componentOptions);

        const tabList = tabs.map((child, index) => {
            const { title } = child.componentOptions.propsData;

            const classes = {
                'tab-btn': true,
                '--active': index === this.currentTab,
            };

            return (
                <button class={classes} onClick={e => this.switchTab(e, index)}>
                    {title}
                </button>
            );
        });

        return (
            <div class="tabber">
                <div class="tab-list">
                    {tabList}
                </div>

                {tabs[this.currentTab]}
            </div>
        );
    }
}
</script>
