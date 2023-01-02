import BuyCard from "./BuyCard";
import PurchasedRatingCard from "./PurchasedRatingCard";

const GameActionCard = ({ id, price, rating, isPurchased, isAddToCartVisible }) => {
  return <div>{isPurchased ? <PurchasedRatingCard gameId={id} databaseRating={rating} /> : <BuyCard gameId={id} price={price} isAddToCartVisible={isAddToCartVisible} />}</div>;
};

export default GameActionCard;
