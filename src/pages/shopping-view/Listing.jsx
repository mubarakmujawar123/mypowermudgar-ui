import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { fetchFilteredProducts } from "@/store/shop/shoppingProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Listing = () => {
  const { productList } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();
  // const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");

  // useEffect(() => {
  //   setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  // }, [categorySearchParam]);

  useEffect(() => {
    const filters = JSON.parse(sessionStorage.getItem("filters")) || {};
    dispatch(fetchFilteredProducts({ filterParams: filters }));
  }, [dispatch, categorySearchParam]);
  return (
    <>
      {productList ? (
        productList.length > 0 ? (
          <div className="w-11/12  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                product={productItem}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-center font-semibold mt-5">
            No product found for this category.
          </h2>
        )
      ) : null}
    </>
  );
};

export default Listing;
