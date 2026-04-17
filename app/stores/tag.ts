export const useTagStore = defineStore('tag', () => {
    // State
    const tag =  ref<string>();

    // Getters
    const currentTag = computed(() => {
        return tag;
    });

    // Actions
    function update(newTag: string) {
        tag.value = newTag;
    }

    return { currentTag, update };
});