import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  //api isteği
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),
    onSuccess: () => {
      toast.success("Yeni Tarif Oluşturuldu");
      navigate("/");
    },
    onError: () => {
      toast.error("işlem başarısız");
    },
  });

  const handleSubimit = (e) => {
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

    //api ' a  istek at
    mutate(newRecipe);
  };

  return (
    <div>
      <h1 className="text-orange-600 text-3xl font-bold mt-5">
        Yeni Tarif Oluştur
      </h1>

      <form
        onSubmit={handleSubimit}
        className="my-10 flex flex-col gap-10 max-w-2xl"
      >
        <Field label="Tarif başlığı">
          <input className="inp " name="recipeName" required />
        </Field>
        <Field label="Kategori">
          <input className="inp " name="category" required />
        </Field>
        <Field label="Süre">
          <input className="inp " name="recipeTime" required />
        </Field>

        <Field label="Malzemeler">
          <Select
            required
            isMulti
            onChange={(options) => {
              setIngredients(options.map((opt) => opt.value));
            }}
          />
        </Field>

        <Field label="Tarif Adımları (, ile ayırın)">
          <textarea
            required
            name="instructions"
            className="inp min-h-[80px] max-h-[200px]"
          ></textarea>
        </Field>
        <Field label="Sunum Önerisi">
          <textarea
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
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};
//HOC
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-orange-700">{label}</label>
      {children}
    </div>
  );
};

export default Create;
