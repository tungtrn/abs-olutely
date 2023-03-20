// What meal of the day is this (Breakfast, Lunch, Brunch, Dinner)? 
// How many people will be eating this meal? 
// What cuisine do you prefer? 
// Do you have any dietary restrictions (calorie limit, diet type, allergies)? 
// Do you have any items in your pantry that you would like to use? If not, we can suggest some ingredients.
// How much time do you have to prepare the meal? 
// What type of dish are you looking to make (e.g. appetizer, entree, dessert)? 
// Are there any cultural or religious dietary restrictions to consider?


export const RecipeQuestions = [
    {
        question: "What meal of the day is this?",
        options: ["Breakfast", "Lunch", "Brunch", "Dinner"],
        type: "select",
        id: "meal",
    },
    {
        question: "How many people will be eating this meal?",
        type: "number",
        id: "people",
    },
    {
        question: "What cuisine do you prefer?",
        options: ["American", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Thai"],
        type: "select",
        id: "cuisine",
    },
    {
        question: "Do you have any dietary restrictions?",
        options: ["Calorie Limit", "Diet Type", "Allergies"],
        type: "select",
        id: "dietary",
    },
    {
        question: "Do you have any items in your pantry that you would like to use? If not, we can suggest some ingredients.",
        type: "text",
        id: "pantry",
    },
    {
        question: "How much time do you have to prepare the meal?",
        options: ["Less than 30 minutes", "30-60 minutes", "1-2 hours", "More than 2 hours"],
        type: "select",
        id: "time",
    },
    {
        question: "What type of dish are you looking to make?",
        options: ["Appetizer", "Entree", "Dessert"],
        type: "select",
        id: "dish",
    },
    {
        question: "Are there any cultural or religious dietary restrictions to consider?",
        type: "text",
        id: "cultural",
    },
]

export const Recipe = [
    {
        name: "Chicken",
        amount: "100g",
        calories: 100,
    },
    {
        name: "Rice",
        amount: "100g",
        calories: 100,
    },
    {
        name: "Egg",
        amount: "100g",
        calories: 100,
    },
    {
        name: "Tomato",
        amount: "100g",
        calories: 100,
    },
    {
        name: "Onion",
        amount: "100g",
        calories: 100,
    },
    {
        name: "Garlic",
        amount: "100g",
        calories: 100,
    },
]

export const ingredientType = typeof Recipe;

export const Steps = [
    "Cook the chicken",
    "Cook the rice",
    "Cook the egg",
    "Cook the tomato",
    "Cook the onion",
    "Cook the garlic",
]

export type RecipeQuestionAnswer = {
    question: string;
    answer: string | number;
}

export type RecipeInformation = {
    step: string[];
    ingredients: typeof Recipe[];
    shoppingList: string[];
}