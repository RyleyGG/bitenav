export interface MealSearchFilters {
    name: string,
    diet?: string,
    allergies?: string
}

export interface MealSearchResult {
    name: string
    calories: string,
    protein: string,
    carbs: string,
    fat: string,
    photolink: string
}