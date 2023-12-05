export interface MealSearchFilters {
    name?: string,
    cuisine?: string,
    diet?: string,
    allergies?: string,
    highProtein?: boolean,
    lowCarb?: boolean,
    lowFat?: boolean,
    offset?: string
}

export interface MealSearchResult {
    id: string
    name: string
    calories: string,
    protein: string,
    carbs: string,
    fat: string,
    photolink: string
}

export interface SingleMealSearch {
    id: string
}