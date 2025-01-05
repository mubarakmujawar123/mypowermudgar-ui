import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  createSearchParams,
  Link,
  useNavigate,
  // useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config/config";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserPreference,
  logoutUser,
  updateUserPreferrence,
} from "@/store/auth-slice/authSlice";
import UserCartWrapper from "./UserCartWrapper";
import { fetchCartItems } from "@/store/shop/shoppingCartSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { calculateTotalProductsCount } from "@/config/utils";

// eslint-disable-next-line react/prop-types
const MenuItems = ({ setOpenMenu }) => {
  const navigate = useNavigate();

  const handleNavigation = (getCurrentMenuItem) => {
    setOpenMenu(false);
    navigate({
      pathname: getCurrentMenuItem.path,
      search: `?${createSearchParams({
        category: getCurrentMenuItem.id,
      })}`,
    });

    //setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
  };
  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    currentFilter !== null
      ? handleNavigation(getCurrentMenuItem)
      : navigate(getCurrentMenuItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer hover:underline"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

// eslint-disable-next-line react/prop-types
const HeaderRightContent = ({ setOpenMenu }) => {
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { preferredCurrencyList } = useSelector((state) => state.currencyRate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = () => {
    setOpenMenu(false);
    dispatch(logoutUser());
  };
  const currencyChangeHandler = (value) => {
    dispatch(
      editUserPreference({ id: user?.id, preferredCurrency: value })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(updateUserPreferrence({ preferredCurrency: value }));
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  if (!isAuthenticated && !user) {
    return (
      <div className="mt-6 lg:mt-0 md:mt-0">
        <Button
          onClick={() => {
            setOpenMenu(false);
            navigate("/auth/login");
          }}
          size="icon"
          className="pl-10 pr-10"
        >
          Login
        </Button>
      </div>
    );
  }
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        {/* <Label>Preferred Currency</Label> */}
        <Select
          onValueChange={(option) => currencyChangeHandler(option)}
          value={user?.preferredCurrency}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select Preferred Currency`} />
          </SelectTrigger>
          <SelectContent>
            {preferredCurrencyList?.length > 0
              ? preferredCurrencyList.map((optionItem) => (
                  <SelectItem
                    key={optionItem.id}
                    disabled={optionItem.disabled ? true : false}
                    value={optionItem.id}
                  >
                    {optionItem.label}
                    <span className="text-base ml-1">
                      ({optionItem.symbol})
                    </span>
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
          }}
          variant="outline"
          size="icon"
          className="relative flex w-auto"
        >
          <div>
            <ShoppingCart className="w-9 h-9 p-2" />
          </div>
          <div className=" font-bold text-xs p-1 rounded-3xl mr-1 bg-green-600 text-white ">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? calculateTotalProductsCount(cartItems.items)
              : 0}
          </div>
          <span className="sr-only"> User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          setOpenMenu={setOpenMenu}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-56">
          <DropdownMenuLabel> {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setOpenMenu(false);
              navigate("/shop/account");
            }}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/mymudgar-icon.svg"
            height={25}
            width={25}
            alt="mypowermudgar"
            className="self-center"
          />
          <span className="font-bold text-2xl">MyPowerMudgar</span>
        </Link>
        <Sheet open={openMenu} onOpenChange={() => setOpenMenu(false)}>
          {/* <SheetTrigger> */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpenMenu(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle header menu</span>
          </Button>
          {/* </SheetTrigger> */}
          <SheetContent className="w-full max-w-xs" side="left">
            <MenuItems setOpenMenu={setOpenMenu} />
            <HeaderRightContent setOpenMenu={setOpenMenu} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems setOpenMenu={setOpenMenu} />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
