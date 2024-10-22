import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { LoaderSm } from "./Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const DeleteButton = ({ productId }) => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => api.delete(`/api/v1/recipes/${productId}`),

    onSuccess: () => {
      navigate("/");
      toast.success("Tarif kaldırıldı");
    },

    onError: () => {
      toast.error("İşlem Başarısız");
    },
  });

  return (
    <div>
      <button
        disabled={isLoading}
        onClick={mutate}
        className=" flex gap-2 items-center bg-orange-600 text-orange-100 font-semibold hover:bg-orange-200  hover:text-orange-800 py-1  px-2 rounded-md min-w-[70px] "
      >
        {isLoading ? (
          <LoaderSm />
        ) : (
          <>
            <FaTrashAlt />
            Sil
          </>
        )}
      </button>
    </div>
  );
};

export default DeleteButton;
