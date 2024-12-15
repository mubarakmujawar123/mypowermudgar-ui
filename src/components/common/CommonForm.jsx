/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import Counter from "../ui/counter";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { getConstantValue } from "@/config/utils";
import { Combobox } from "../ui/combobox";
const elementTypes = {
  INPUT: "input",
  SELECT: "select",
  MULTISELECT: "multiselect",
  TEXTAREA: "textarea",
  COUNTER: "counter",
  CHECKBOX: "checkbox",
  COMBOBOX: "combobox",
};

const renderElementUsingType = ({ controlItem, formData, setFormData }) => {
  let element;
  let value = formData[controlItem.name] || "";
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
            <SelectValue placeholder={`Select ${controlItem.label}`} />
          </SelectTrigger>
          <SelectContent>
            {controlItem.options?.length > 0
              ? controlItem.options.map((optionItem) => (
                  <SelectItem
                    key={optionItem.id}
                    disabled={optionItem.disabled ? true : false}
                    value={optionItem.id}
                  >
                    {optionItem.label}
                    {optionItem.symbol ? (
                      <span className="text-base ml-1">
                        ({optionItem.symbol})
                      </span>
                    ) : null}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      );

      break;
    case elementTypes.MULTISELECT:
      element = (
        <MultiSelect
          options={controlItem.options}
          onValueChange={(options) => {
            setFormData({
              ...formData,
              [controlItem.name]: options,
            });
          }}
          defaultValue={value}
          placeholder={`Select ${getConstantValue(controlItem.name)}`}
          variant="inverted"
          hidden={controlItem.hidden}
        />
      );

      break;
    case elementTypes.COMBOBOX:
      element = (
        <Combobox
          onValueChange={(val) => {
            setFormData({
              ...formData,
              [controlItem.name]: val,
            });
          }}
          options={controlItem.options}
          defaultValue={value}
          placeholder={`Select ${getConstantValue(controlItem.name)}`}
        />
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
    case elementTypes.COUNTER:
      element = (
        <Counter
          name={controlItem.name}
          id={controlItem.name}
          data={formData}
          setData={setFormData}
        />
      );

      break;
    case elementTypes.CHECKBOX:
      element = (
        <Checkbox
          name={controlItem.name}
          id={controlItem.name}
          type={controlItem.type}
          checked={controlItem.isDefault}
          onCheckedChange={(checked) => {
            setFormData({
              ...formData,
              [controlItem.name]: checked,
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
  hideSubmitButton = false,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div className="grid w-full gap-1.5" key={item.name}>
            {item.hidden ? null : (
              <>
                <label>
                  {item.label}{" "}
                  {item.isMandatory ? (
                    <span className="text-red-600">*</span>
                  ) : (
                    ""
                  )}
                </label>
                {renderElementUsingType({
                  controlItem: item,
                  formData: formData,
                  setFormData: setFormData,
                })}
              </>
            )}
          </div>
        ))}
      </div>
      {!hideSubmitButton ? (
        <Button disabled={!isFormValid} type="submit" className="mt-5 w-full">
          {buttonText || "Submit"}
        </Button>
      ) : null}
    </form>
  );
};

export default CommonForm;
