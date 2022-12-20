import BuyCard from "./BuyCard";
import PurchasedRatingCard from "./PurchasedRatingCard";

const GameActionCard = ({ id, isPurchased, price, rating }) => {
  return <div>{isPurchased ? <PurchasedRatingCard gameId={id} databaseRating={rating} /> : <BuyCard gameId={id} price={price} />}</div>;
};

export default GameActionCard;
