import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>Slang</div>;
};

export default Search;
