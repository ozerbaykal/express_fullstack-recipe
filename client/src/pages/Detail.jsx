import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/index";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
const Detail = () => {
  const { id } = useParams();

  //id si bilinen eleamanın verilerini api'den al
  const { isLoading, error, data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Link
          to={-1}
          className="flex items-center gap-2 bg-orange-300 py-1 px-3 rounded-md shadow-lg text-orange-800 font-semibold hover:bg-orange-600 hover:text-orange-100 transition"
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>
        <button className=" flex gap-2 items-center bg-orange-600 text-orange-100 font-semibold hover:bg-orange-200  hover:text-orange-800 py-1  px-2 rounded-md">
          <FaTrashAlt />
          Sil
        </button>
      </div>
      {isLoading
        ? "loader"
        : error
        ? "error"
        : data && (
            <div>
              <h1 className="text-3xl font-bold text-orange-400">
                {data.recipeName}
              </h1>
            </div>
          )}
    </div>
  );
};

export default Detail;
