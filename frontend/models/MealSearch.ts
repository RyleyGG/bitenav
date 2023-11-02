export interface MealSearchFilters {
    name: string,
    cuisine?: string,
    diet?: string,
    allergies?: string,
    highProtein?: boolean,
    lowCarb?: boolean,
    lowFat?: boolean
}

export interface MealSearchResult {
    name: string
    calories: string,
    protein: string,
    carbs: string,
    fat: string,
    photolink: string
}