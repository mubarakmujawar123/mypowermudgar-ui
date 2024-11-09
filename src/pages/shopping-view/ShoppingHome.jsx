import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const categoriesWithIcon = [
  { id: "all-products", label: "All Products", icon: ShirtIcon },
  { id: "mudgar", label: "Mudgar", icon: ShirtIcon },
  { id: "gada", label: "Gada", icon: CloudLightning },
  { id: "samtola", label: "Samtola", icon: BabyIcon },
  { id: "pushUpBoard", label: "Push Up Board", icon: WatchIcon },
  { id: "comboKit", label: "Combo Kit", icon: WatchIcon },
];
const videoOptions = {
  height: "500",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

const featureImageList = [
  { image: bannerOne },
  { image: bannerTwo },
  { image: bannerThree },
];
const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    let filterString = ``;
    if (getCurrentItem.id !== "all-products") {
      const currentFilter = {
        [section]: [getCurrentItem.id],
      };
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      filterString = `?${section}=${getCurrentItem.id}`;
    }
    navigate(`/shop/listing${filterString}`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            );
          }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Fiteness video
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* <YouTube
              videoId="f4b1mdPC1nU"
              opts={videoOptions}
            />
            <YouTube
              videoId="f4b1mdPC1nU"
              opts={videoOptions}
            /> */}
          </div>
        </div>
      </section>
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="left-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p>About us text</p>
        </div>
        <div className="left-4 px-4">
          <img src={bannerTwo} />
        </div>
      </section>
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="left-4 px-4">
          <img src={bannerThree} />
        </div>
        <div className="left-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <p>contact us text</p>
        </div>
      </section>
      <section className="mb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Follow Us On</h2>
          <div className="flex gap-2 justify-center">
            <div>youtube</div>
            <div>facebook</div>
            <div>instagram</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
