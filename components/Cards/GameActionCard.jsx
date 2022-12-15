import BuyCard from "./BuyCard";
import PurchasedRatingCard from "./PurchasedRatingCard";

const GameActionCard = ({ isPurchased }) => {
  return <div>{isPurchased ? <PurchasedRatingCard /> : <BuyCard />}</div>;
};

export default GameActionCard;
