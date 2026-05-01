// TOP画面で使う状態値
export const useTagStore = defineStore('tag', () => {
    // State
    const tag =  ref<string>();

    // Getters

    // Actions
    function update(newTag: string) {
        tag.value = newTag;
    }

    return { tag, update };
});
export const useDaysStore = defineStore('days', () => {
    // State
    const days =  ref<string>();

    // Getters

    // Actions
    const update = (newDays: string) => {
        days.value = newDays;
    }

    return { days, update };
});