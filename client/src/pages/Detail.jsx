import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/index";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { TbClockHour8 } from "react-icons/tb";
import DeleteButton from "../components/DeleteButton";
const Detail = () => {
  const { id } = useParams();

  //id si bilinen eleamanın verilerini api'den al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Link
          to={-1}
          className="flex items-center gap-2 bg-orange-300 py-1 px-3 rounded-md shadow-lg text-orange-800 font-semibold hover:bg-orange-600 hover:text-orange-100 transition"
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>
        <DeleteButton productId={data.id} />
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data && (
          <div>
            <h1 className="text-3xl title">{data.recipeName}</h1>
            <div className="flex gap-4 my-5">
              <span className="badge"> {data.category}</span>
              <span className="badge flex items-center gap-1">
                <TbClockHour8 />
                {data.recipeTime} dak.
              </span>
            </div>
            <img
              className="rounded-lg max-h-[350px] w-full object-cover"
              src={data.image}
              alt={data.recipeName}
            />
            <div className="my-5">
              <h2 className="title">Malzemeler</h2>
              <ul>
                {data.ingredients.map((i) => (
                  <li className="font-semibold text-lg text-orange-900">{i}</li>
                ))}
              </ul>
            </div>

            <div className="my-5">
              <h2 className="title">Tarif</h2>
              <ol className="list-decimal ps-4">
                {data.instructions.map((i) => (
                  <li className=" font-semibold text-lg text-orange-900">
                    {i}
                  </li>
                ))}
              </ol>
            </div>
            {data.servingSuggestion && (
              <div className="my-5">
                <h2 className="title">Sunum Önerisi</h2>
                <p className="text-lg text-orange-900 font-semibold">
                  {data.servingSuggestion}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
