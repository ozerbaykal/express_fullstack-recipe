import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import crypto from "crypto"
import isInValid from "../utils/IsInValid.js";


const data = readRecipes();


export const getAllRecipes = (req, res) => {
    //tarif verisin bir kopyaısı oluştur
    let recipes = [...data];

    //aratılan kelime (küçük harfe çevir)
    const search = req.query?.search?.toLowerCase();

    //eğer search parametresi geldiyse filtreleme yap
    if (search) {
        recipes = data.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(search)
        );
    }
    //sıralama parametresini al
    const order = req.query?.order?.toLowerCase();
    //eğer sort parametresi geldiyse sıralama yap
    if (order) {
        recipes.sort((a, b) =>
            order === "asc"
                ? a.recipeTime - b.recipeTime
                : b.recipeTime - a.recipeTime
        );
    }

    res.status(200).json({
        status: "success",
        results: data.length,
        recipes: recipes,
    });
};

export const createRecipe = (req, res) => {
    //isteğin body bölümünde gelen veriye eriş
    let newRecipe = req.body;


    //verinin bütünlüğünü kontrol et
    if (isInValid(newRecipe)) {
        return res.status(404).json({ message: "lütfen bütün değerleri tanımlayın" })
    }
    //veriye id  ve photo ekle
    newRecipe = {
        ...newRecipe,
        id: crypto.randomUUID(),
        image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
    }

    //tarif verisini diziye ekle
    data.push(newRecipe);

    //json dosyasını güncelle
    writeRecipes(data);



    //cevap gönder
    res.status(201).json({ message: "Yeni tarif Eklendi", recipe: newRecipe })
};

export const getRecipe = (req, res) => {
    res.status(200).json({ message: "Aradığınız tarif bulundu", found: req.foundRecipe })
};

export const deleteRecipe = (req, res) => {
    //silinecek elemanın sırasını bul
    const index = data.findIndex((i) => i.id === req.params.id)
    //eleamnı diziden kaldır
    data.splice(index, 1)
    //json dosyasını güncelle
    writeRecipes(data);

    //cevap gönder
    res.status(204).json({})
};


export const updateRecipe = (req, res) => {
    //eski ratif nesnesini güncelle
    const updated = { ...req.foundRecipe, ...req.body }

    //güncellenecek elemanın sırasını bul 
    const index = data.findIndex((i) => i.id === req.params.id)

    //diziyi güncelle
    data.splice(index, 1, updated)


    //json dosyasını güncelle
    writeRecipes(data)

    //cevap gönder

    res.status(200).json({ message: "tarif başarıyla güncellendi", recipe: updated, })



};
