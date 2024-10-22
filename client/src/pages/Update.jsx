import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Update = ({}) => {
  //url'den düzenlenecek elamanın id 'sini al
  const { id } = useParams();
  const navigate = useNavigate();

  //api'den düzenlenecek elemanın bilgilerini al
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  //api ' a güncelleme isteği atacak mutasyonu hazırla
  const { isLoading, mutate } = useMutation({
    mutationFn: (updatedData) =>
      api.patch(`/api/v1/recipes/${id}`, updatedData),

    onSuccess: () => {
      toast.success("Güncelleme başarılı");
      navigate("/");
    },
    onError: () => {
      toast.error("Bir aksilik oldu");
    },
  });
  return (
    <div>
      <h1 className="text-orange-600 text-3xl font-bold mt-5">
        Tarifi Düzenle
      </h1>
      <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
    </div>
  );
};
export default Update;
