import BuyCard from "./BuyCard";
import PurchasedRatingCard from "./PurchasedRatingCard";

const GameActionCard = ({ id, isPurchased, price, rating, showAddToCart }) => {
  return <div>{isPurchased ? <PurchasedRatingCard gameId={id} databaseRating={rating} /> : <BuyCard gameId={id} price={price} showAddToCart={showAddToCart} />}</div>;
};

export default GameActionCard;
