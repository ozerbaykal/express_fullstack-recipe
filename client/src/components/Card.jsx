import React from "react";
import { TbClockHour8 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <Link to={`/tarif/${recipe.id}`} className="bg-orange-100 rounded-lg p-4">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="rounded-lg -h-[150] w-full object-cover "
        />
        <p className="bg-orange-200 rounded-lg py-1 px-2 font-semibold text-orange-700 flex gap-2 items-center absolute bottom-1 left-1">
          <TbClockHour8 />
          <span>{recipe.recipeTime} dakika</span>
        </p>
      </div>
      <h2 className="my-3 text-xl font-semibold text-orange-900">
        {recipe.recipeName}
      </h2>
      <p className="text-orange-300">{recipe.category}</p>
      <p className="flex gap-3 mt-3">
        <span className="text-orange-700 p-1 rounded-md bg-orange-200 line-clamp-1">
          {recipe.ingredients[0]}
        </span>
        <span className="text-orange-700 p-1 rounded-md bg-orange-200 line-clamp-1">
          {recipe.ingredients[1]}
        </span>
      </p>
    </Link>
  );
};

export default Card;
