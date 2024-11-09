import ShoppingHeader from "@/components/shopping-view/ShoppingHeader";
import ShoppingHome from "../shopping-view/ShoppingHome";

const Home = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <ShoppingHome />
      </main>
    </div>
  );
};

export default Home;
