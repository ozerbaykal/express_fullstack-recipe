import Select from "react-select/creatable";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form = ({ isLoading, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);

  const handleSubmit = (e) => {
    //form gönderilince çalısacak fonk
    e.preventDefault();

    //bütün formlardaki verilere obje formunda eriş
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    console.log(newRecipe);
    //adımları "," e göre diziye çevir
    newRecipe.instructions = newRecipe.instructions.split(",");
    //malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    //eğer ki düzenleme modundaysak new recipe 'ye id değerini ekle
    if (recipeData) {
      newRecipe.id = recipeData.id;
    }

    //api isteği at
    mutate(newRecipe);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="my-10 flex flex-col gap-10 max-w-2xl"
    >
      <Field label="Tarif başlığı">
        <input
          defaultValue={recipeData?.recipeName}
          className="inp "
          name="recipeName"
          required
        />
      </Field>
      <Field label="Kategori">
        <input
          defaultValue={recipeData?.category}
          className="inp "
          name="category"
          required
        />
      </Field>
      <Field label="Süre">
        <input
          type="number"
          defaultValue={recipeData?.recipeTime}
          className="inp "
          name="recipeTime"
          required
        />
      </Field>

      <Field label="Malzemeler">
        <Select
          value={ingredients.map((i) => ({ value: i, label: i }))}
          required
          isMulti
          onChange={(options) => {
            setIngredients(options.map((opt) => opt.value));
          }}
        />
      </Field>

      <Field label="Tarif Adımları (, ile ayırın)">
        <textarea
          defaultValue={recipeData?.instructions}
          required
          name="instructions"
          className="inp min-h-[80px] max-h-[200px]"
        ></textarea>
      </Field>
      <Field label="Sunum Önerisi">
        <textarea
          defaultValue={recipeData?.servingSuggestion}
          name="servingSuggestion"
          className="inp min-h-[80px] max-h-[200px]"
        ></textarea>
      </Field>
      <div className="flex gap-4 justify-end">
        <Link
          to="/"
          className="bg-orange-200 px-4 rounded-md py-2 hover:bg-orange-500 text-orange-700 hover:text-orange-100 font-semibold"
        >
          Geri
        </Link>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-orange-700 px-4 rounded-md py-2 hover:bg-orange-200 text-orange-100 hover:text-orange-700 font-semibold"
        >
          {recipeData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-orange-700">{label}</label>
      {children}
    </div>
  );
};

export default Form;
