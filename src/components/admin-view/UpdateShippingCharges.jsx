import { Check, PencilIcon, Plus, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { countryList } from "@/config/constant";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import {
  getShippingCharges,
  setShippingCharges,
} from "@/store/admin/shippingChargesSlice";

const UpdateShippingCharges = () => {
  const [countryListArray, setCountryListArray] = useState(countryList);
  const [data, setData] = useState([]);
  const [disabledItemsList, setDisabledItemsList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editModeCounter, setEditModeCounter] = useState(0);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const addNewEntryHandler = () => {
    setIsEditMode(true);
    setEditModeCounter((prev) => prev + 1);
    const _newObj = {
      country: `New-${Math.floor(100000000 + Math.random() * 900000000)}`,
      shippingCharges: 0,
      status: `editing`,
    };
    setData([...data, _newObj]);
  };

  const updateNewEntry = (selectedCountry, val, field) => {
    if (!selectedCountry) return;
    let _val = val;
    if (val < 0) {
      toast({
        title: "Value should not be less than 0.",
        variant: "destructive",
      });
      _val = 0;
    }
    const _list = data.map((ele) => {
      if (ele.country === selectedCountry) {
        ele[field] = _val;
      }
      return ele;
    });
    setData(_list);
  };

  const editHandler = (editedCountry) => {
    setIsEditMode(true);
    setEditModeCounter((prev) => prev + 1);
    if (!editedCountry) return;
    const _list = disabledItemsList.map((ele) => {
      if (ele.value === editedCountry) {
        ele.disabled = false;
      }
      return ele;
    });
    const _dataList = data.map((ele) => {
      if (ele.country === editedCountry) {
        ele.status = "editing";
      }
      return ele;
    });
    setData(_dataList);
    setDisabledItemsList(_list);
  };

  const submitRowHandler = (editedCountry) => {
    setIsEditMode(false);
    setEditModeCounter((prev) => prev - 1);
    if (editedCountry && editedCountry.startsWith("New")) {
      const _dataList = data.filter((ele) => ele.country !== editedCountry);
      setData(_dataList);
      return;
    }
    const _disabledItemsList = disabledItemsList.map((ele) => {
      if (ele.value === editedCountry) {
        ele.disabled = true;
      }
      return ele;
    });
    const _dataList = data.map((ele) => {
      if (ele.country === editedCountry) {
        ele.status = "";
      }
      return ele;
    });
    setData(_dataList);
    setDisabledItemsList(_disabledItemsList);
  };

  const deleteHandler = (deletedCountry) => {
    if (!deletedCountry) return;
    const _list = data.filter((ele) => ele.country !== deletedCountry);
    setData(_list);
  };

  const submitShippingChargesHandler = (e) => {
    e.preventDefault();
    dispatch(setShippingCharges({ charges: data })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        dispatch(getShippingCharges()).then((info) => {
          if (!data?.payload?.success) {
            toast({
              title: info?.payload?.message,
              variant: "destructive",
            });
          }
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
    if (countryList && countryList.length > 0 && data && data.length > 0) {
      const _countriesArray = countryList.map((item) => {
        const obj = {
          label: item.label,
          value: item.value,
          disabled: false,
        };
        if (
          data.find(
            (ele) => item.value === ele.country && ele.status !== "editing"
          )
        ) {
          obj.disabled = true;
        }
        return obj;
      });
      setCountryListArray(_countriesArray);
      setDisabledItemsList(_countriesArray.filter((item) => item.disabled));
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (!data || (data && data.length === 0)) {
      dispatch(getShippingCharges()).then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
          setData(data?.payload?.data);
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  }, []);

  return (
    <div className="flex justify-around flex-col md:flex-row lg:flex-row gap-4">
      <div className="">
        <div className="font-bold mb-5">Current Shipping Charges Info</div>
        {data &&
        data.length > 0 &&
        countryListArray &&
        countryListArray.length > 0
          ? data.map((item) => {
              return (
                <div
                  className="flex justify-around gap-4 mb-4"
                  key={item.country}
                >
                  <div className="w-96">
                    <Combobox
                      onValueChange={(val) => {
                        updateNewEntry(item.country, val, "country");
                      }}
                      options={countryListArray}
                      defaultValue={item.country}
                      placeholder={`Select Country`}
                      disabled={
                        disabledItemsList?.find(
                          (ele) => ele.label === item.country
                        )
                          ? true
                          : false
                      }
                    />
                  </div>
                  <Input
                    className="w-[30%]"
                    name="shppingCharges"
                    placeholder={"Shpping Charges"}
                    id="shppingCharges"
                    type="number"
                    value={item.shippingCharges}
                    onChange={(event) => {
                      updateNewEntry(
                        item.country,
                        +event.target.value,
                        "shippingCharges"
                      );
                    }}
                    disabled={
                      disabledItemsList?.find(
                        (ele) => ele.label === item.country && ele.disabled
                      )
                        ? true
                        : false
                    }
                  />
                  <div className="flex gap-2">
                    {disabledItemsList?.find(
                      (ele) => ele.label === item.country && ele.disabled
                    ) ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => editHandler(item.country)}
                        >
                          <PencilIcon className="h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteHandler(item.country)}
                        >
                          <Trash2Icon className="h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => submitRowHandler(item.country)}
                      >
                        <Check className="h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          : null}

        <br />
        <Button onClick={addNewEntryHandler} variant="outline" size="icon">
          <Plus />
        </Button>
      </div>
      <div>
        <div className="mb-4 font-semibold">
          Update new shipping charges into Database
        </div>
        <Button
          disabled={editModeCounter !== 0}
          onClick={(e) => submitShippingChargesHandler(e)}
        >
          Update Shipping Charges
        </Button>
      </div>
    </div>
  );
};

export default UpdateShippingCharges;
