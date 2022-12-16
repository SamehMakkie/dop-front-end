import BuyCard from "./BuyCard";
import PurchasedRatingCard from "./PurchasedRatingCard";

const GameActionCard = ({ isPurchased, price }) => {
  return <div>{isPurchased ? <PurchasedRatingCard /> : <BuyCard price={price} />}</div>;
};

export default GameActionCard;
