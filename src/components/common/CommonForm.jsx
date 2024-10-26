/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
const elementTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const renderElementUsingType = ({ controlItem, formData, setFormData }) => {
  let element;
  const value = formData[controlItem.name] || "";
  switch (controlItem.componentType) {
    case elementTypes.INPUT:
      element = (
        <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          type={controlItem.type}
          value={value}
          onChange={(event) => {
            setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            });
          }}
        />
      );

      break;
    case elementTypes.SELECT:
      element = (
        <Select
          onValueChange={(option) => {
            setFormData({
              ...formData,
              [controlItem.name]: option,
            });
          }}
          value={value}
        >
          <SelectTrigger>
            <SelectValue placeholder={controlItem.label} />
          </SelectTrigger>
          <SelectContent>
            {controlItem.options?.length > 0
              ? controlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      );

      break;
    case elementTypes.TEXTAREA:
      element = (
        <Textarea
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          value={value}
          onChange={(event) => {
            setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            });
          }}
        />
      );

      break;

    default:
      element = (
        <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          type={controlItem.type}
          value={value}
          onChange={(event) => {
            setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            });
          }}
        />
      );
      break;
  }
  return element;
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isFormValid,
}) => {
  console.log("formdata", formData);
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div className="grid w-full gap-1.5" key={item.name}>
            <label>{item.label}</label>
            {renderElementUsingType({
              controlItem: item,
              formData: formData,
              setFormData: setFormData,
            })}
          </div>
        ))}
      </div>
      <Button disabled={!isFormValid} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
