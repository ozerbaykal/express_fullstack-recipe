import { readRecipes, writeRecipes } from "../model/recipeModel.js";


const data = readRecipes();

export const getAllRecipes = (req, res) => {
    //tarif verisin bir kopyaısı oluştur
    let recipes = [...data]

    //aratılan kelime (küçük harfe çevir)
    const search = req.query?.search?.toLowerCase();


    //eğer search parametresi geldiyse filtreleme yap
    if (search) {
        recipes = data.filter((recipe) => recipe.recipeName.toLowerCase().includes(search))


    }
    //sıralama parametresini al
    const order = req.query?.order?.toLowerCase();
    //eğer sort parametresi geldiyse sıralama yap
    if (order) {
        recipes.sort((a, b) => order === "asc" ? a.recipeTime - b.recipeTime : b.recipeTime - a.recipeTime)


    }


    res.status(200).json({
        status: "success",
        results: data.length,
        recipes: recipes,


    })





};

export const createRecipe = (req, res) => { };

export const getRecipe = (req, res) => {
    //res.status(200).json({ message: "Aradığınız tarif bulundu", found: req.foundRecipe })

};


export const deleteRecipe = (req, res) => { };
// //silinecek elemanın sırasını bul
// const index = data.findIndex((i) => i.id === req.params.id)
// //eleamnı diziden kaldır
// data.splice(index, 1)
// //json dosyasını güncelle
// writeRecipes.apply(data);

// //cevap gönder
// res.status(204)





export const updateRecipe = (req, res) => { };

