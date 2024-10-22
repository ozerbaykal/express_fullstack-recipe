const Error = ({ info, refetch }) => {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="mt-36 bg-orange-400 rounded-lg p-5 text-orange-100 text-lg text-center">
        <h1>Üzgünüz bir sorun oluştu !!!</h1>
        <h1 className="text-orange-900">{info}</h1>
      </div>
      <button
        className="bg-orange-700 py-2 rounded-md text-orange-100 font-semibold hover:bg-orange-200 hover:text-orange-700 "
        onClick={refetch}
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
