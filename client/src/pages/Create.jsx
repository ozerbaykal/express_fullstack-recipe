import Select from "react-select/creatable";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div>
      <h1 className="text-orange-600 text-3xl font-bold mt-5">
        Yeni Tarif Oluştur
      </h1>

      <form className="my-10 flex flex-col gap-10 max-w-2xl">
        <Field label="Tarif başlığı">
          <input className="inp " name="recipeName" />
        </Field>
        <Field label="Kategori">
          <input className="inp " name="category" />
        </Field>
        <Field label="Süre">
          <input className="inp " name="recipeTime" />
        </Field>

        <Field label="Malzemeler">
          <Select isMulti />
        </Field>

        <Field label="Tarif Adımları (, ile ayırın)">
          <textarea
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
          <button className="bg-orange-700 px-4 rounded-md py-2 hover:bg-orange-200 text-orange-100 hover:text-orange-700 font-semibold">
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
