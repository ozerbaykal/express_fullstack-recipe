import { readRecipes } from "../model/recipeModel";

const data = readRecipes();

export const getAllRecipes = (req, res) => {

    res.status(200).json({
        status: "success",
        results: data.length,
        recipes: data,


    })





};

export const createRecipe = (req, res) => { };

export const getRecipe = (req, res) => { };

export const deleteRecipe = (req, res) => { };

export const updateRecipe = (req, res) => { };

