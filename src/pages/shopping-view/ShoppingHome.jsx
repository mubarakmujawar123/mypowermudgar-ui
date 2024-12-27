import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.jpeg";
import bannerTwo from "../../assets/banner-2.jpeg";
import bannerThree from "../../assets/banner-3.jpeg";
import aboutus from "../../assets/about-us.jpeg";
import contactus from "../../assets/contact-us.jpeg";
import instagram from "../../assets/instagram.png";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// import YouTube from "react-youtube";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const categoriesWithIcon = [
  { id: "all-products", label: "All Products", icon: ShirtIcon },
  { id: "mudgar", label: "Mudgar", icon: ShirtIcon },
  { id: "gada", label: "Gada", icon: CloudLightning },
  { id: "samtola", label: "Samtola", icon: BabyIcon },
  { id: "pushUpBoard", label: "Push Up Board", icon: WatchIcon },
  { id: "comboKit", label: "Combo Kit", icon: WatchIcon },
];
// const videoOptions = {
//   height: "500",
//   width: "100%",
//   playerVars: {
//     autoplay: 0,
//   },
// };
const bannerTextObj = {
  0: "Unleash Your Inner Strength with the Power of Tradition.Discover premium handcrafted wooden workout equipment designed to engage your body and mind for holistic fitness.",
  1: "Elevate Your Training with Timeless Tradition. Premium wooden workout equipment designed for holistic fitness and unparalleled durability.",
  2: "Redefine Fitness with the Strength of Tradition. Handcrafted wooden tools to empower your body and mind with every movement.",
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

  const getBannerText = useMemo(() => {
    return bannerTextObj[currentSlide];
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[400px] lg:h-[800px] md:h-[800px] xl:h-[800px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <>
                <img
                  src={slide?.image}
                  key={index}
                  className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000`}
                />
                {console.log("currentSlide", currentSlide)}
                <div
                  className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } p-10 absolute bottom-0 text-xl md:text-3xl  lg:text-3xl  xl:text-3xl text-center bg-gradient-to-t from-slate-400/70 via-slate-700/90 to-slate-400/70 text-white `}
                >
                  {getBannerText}
                </div>
              </>
            ))
          : null}
        {/* <img
          src={bannerOne}
          className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000`}
        /> */}
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
      {/* <section className="mb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Fiteness video
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <YouTube
              videoId="f4b1mdPC1nU"
              opts={videoOptions}
            />
            <YouTube
              videoId="f4b1mdPC1nU"
              opts={videoOptions}
            /> 
          </div>
        </div>
      </section> */}
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="left-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 mt-3">About Us</h2>
          <p className="text-lg ml-14">
            At <b>MyPowerMudgar</b>, we are dedicated to preserving and sharing
            the timeless strength of traditional Indian fitness practices. Our
            expertly crafted workout equipment is designed to enhance both
            mental and physical well-being. Each tool in our collection—Indian
            Clubs, Mace (Gada), Mugdars/Mudgars, and Samtola—carries the legacy
            of generations, offering a sustainable and holistic approach to
            fitness.
          </p>
          <br />
          <p className="text-lg ml-14">
            Our mission is to bring these age-old training techniques to
            enthusiasts worldwide. With a focus on quality craftsmanship and
            global accessibility, we ensure our wooden training aids deliver a
            comprehensive workout experience that engages the entire body.
          </p>
          <br />
          <p className="text-lg ml-14">
            Discover the transformative power of tradition with us, and join a
            community that values heritage, sustainability, and total-body
            strength.
          </p>
        </div>
        <div className="left-4 px-4">
          <img src={aboutus} />
        </div>
      </section>
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="left-4 px-4">
          <img src={contactus} />
        </div>
        <div className="left-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <p className="text-lg ml-14">
            We&apos;re here to help! Have questions, concerns, or need
            assistance?
          </p>
          <p className="text-lg ml-14">
            Reach out to us through any of the following methods:
          </p>
          <br />
          <p className="text-lg ml-14">
            <b>Email</b>
            <br />
            <a
              href="mailto:demo@demo.com"
              className="cursor-pointer text-blue-700"
            >
              mypowerMudgar@gmail.com
            </a>
          </p>
          <br />
          <p className="text-lg ml-14">
            <b>Call</b>
            <br />
            <span className=" text-blue-700">+91 1234567890</span>
          </p>
          <br />
          <p className="text-lg ml-14">
            <b>WhatsUp</b>
            <br />
            <span className="text-blue-700">+91 1234567890</span>
          </p>
          <br />
          <p className="text-lg ml-14">
            We value your feedback and are committed to providing the best
            shopping experience. Let us know how we can assist you today!
          </p>
          <br />
        </div>
      </section>
      <section className="mb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Follow Us</h2>
          <div className="flex gap-2 justify-center">
            <div>
              Connect with us below social media platform for updates,
              promotions, and more.
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <a href="" className="cursor-pointer text-blue-700" target="_blank">
              <img src={instagram} height={50} width={50} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
