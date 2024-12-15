import { allowedCurrencies } from "@/config/constant";
import { getCurrencySymbol } from "@/config/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  currencyRateList: [],
  preferredCurrencyList: [],
};

export const getCurrencyRates = createAsyncThunk(
  "/getCurrencyRates",
  async () => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/latest?base=INR"
      );
      const _ratesObj = response?.data?.rates;
      const rates = {};
      for (const key in _ratesObj) {
        if (allowedCurrencies.includes(key)) {
          rates[key] = _ratesObj[key].toFixed(3);
        }
      }
      return rates;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const updatePreferredCurrencyList = (_currencyRateList) => {
  const list = Object.keys(_currencyRateList)?.map((item) => ({
    id: item,
    label: item,
    image: "",
    symbol: getCurrencySymbol(item),
  }));
  return list ? list.sort((a, b) => a.label.localeCompare(b.label)) : [];
};

const currencyRateSlice = createSlice({
  name: "currencySlice",
  initialState,
  reducers: {
    // updatePreferredCurrencyList: (state, action) => {
    //   let _preferredCurrencyList = [...action.payload];
    //   state.preferredCurrencyList = _preferredCurrencyList.sort((a, b) =>
    //     a.label.localeCompare(b.label)
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencyRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencyRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currencyRateList = { INR: 1, ...action?.payload?.rates };
        state.preferredCurrencyList = updatePreferredCurrencyList({
          INR: 1,
          ...action?.payload,
        });
      })
      .addCase(getCurrencyRates.rejected, (state) => {
        state.isLoading = false;
        state.currencyRateList = [];
      });
  },
});

// export const { updatePreferredCurrencyList } = currencyRateSlice.actions;
export default currencyRateSlice.reducer;
