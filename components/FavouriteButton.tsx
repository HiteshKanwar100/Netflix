import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { data: currentUser, mutate } = useCurrentUser();
  const { mutate: mutateFavourites } = useFavourites();
  const isFavourite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = await axios.delete("/api/favourite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favourite", { movieId });
    }

    const updatedfavoriteIds = response?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updatedfavoriteIds,
    });
    mutateFavourites();
  }, [movieId, isFavourite, mutate, mutateFavourites, currentUser]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourites}
      className="
                cursor-pointer
                group/item
                w-6
                h-6
                lg:w-10
                lg:h-10
                border-white
                border-2
                rounded-full
                flex
                items-center
                justify-center
                transition
                hover:border-neutral-300
                "
    >
      <Icon className="text-white" size={20} />
    </div>
  );
};

export default FavouriteButton;
