import { Button } from "./button";
import { Input } from "./input";

// eslint-disable-next-line react/prop-types
const Counter = ({ name, id, data, setData }) => {
  let quantity = Number(data[name]);
  const handleDecrement = () => {
    if (quantity <= 1) {
      return;
    }
    setData({
      ...data,
      [name]: quantity - 1,
    });
  };
  const handleIncrement = () => {
    if (quantity >= 50) {
      return;
    }
    setData({
      ...data,
      [name]: quantity + 1,
    });
  };
  return (
    <div className="isolate flex">
      <Button
        type="button"
        onClick={handleDecrement}
        variant="outline"
        className="rounded-r-none focus:z-10"
      >
        -
      </Button>
      <Input
        type="number"
        disabled
        value={quantity}
        name={name}
        id={id}
        className=" rounded-none text-center w-[100px] !opacity-100 !cursor-default p-0"
      />
      <Button
        type="button"
        onClick={handleIncrement}
        variant="outline"
        className="rounded-l-none focus:z-10 "
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
