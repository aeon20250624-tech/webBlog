// TOP画面で使う状態値
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
export const useDaysStore = defineStore('days', () => {
    // State
    const days =  ref<string>();

    // Getters
    const currentDays = computed(() => {
        return days;
    });

    // Actions
    const update = (newDays: string) => {
        days.value = newDays;
    }

    return { currentDays, update };
});