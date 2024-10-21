import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {
    //json dosyasındaki  veriler arasında parametreyle gelen id'li eleman var mı?
    const found = data.find((i) => i.id === req.params.id);
    //eleman bulunamazsa hata gönder
    if (!found) {
        return res.status(404).json({ message: "Aradığınız id li eleman bulunamdı" })
    }
    //req nesnesi içerisine bulunan ekle
    req.foundRecipe = found;

    //eğer eleman bulunduysa sonraki adıma devam et
    next()

};

export default controlId;
