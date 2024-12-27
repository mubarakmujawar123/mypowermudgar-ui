import { APIConfig } from "@/config/apiConfig";
import { allowedCurrencies } from "@/config/constant";
import { getCurrencySymbol } from "@/config/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  currencyRateList: null,
  preferredCurrencyList: [],
};

export const getCurrencyRatesForAdmin = createAsyncThunk(
  "/currency/getCurrencyRatesForAdmin",
  async () => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/latest?base=INR"
      );
      const _ratesObj = response?.data?.rates;
      const rates = {};
      for (const key in _ratesObj) {
        if (allowedCurrencies.includes(key)) {
          rates[key] = _ratesObj[key].toFixed(4);
        }
      }
      return rates;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const setCurrencyRates = createAsyncThunk(
  "/currency/setCurrencyRates",
  async ({ rates }) => {
    try {
      const response = await APIConfig.post("/currency/setCurrencyRates", {
        rates,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getCurrencyRates = createAsyncThunk(
  "/currency/getCurrencyRates",
  async () => {
    try {
      // const response = await axios.get(
      //   "https://api.frankfurter.app/latest?base=INR"
      // );
      // const _ratesObj = response?.data?.rates;
      // const rates = {};
      // for (const key in _ratesObj) {
      //   if (allowedCurrencies.includes(key)) {
      //     rates[key] = _ratesObj[key].toFixed(3);
      //   }
      // }
      // return rates;
      const response = await APIConfig.get("/currency/getCurrencyRates");
      return response?.data;
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
        state.currencyRateList = action?.payload?.data?.rates;
        state.preferredCurrencyList = updatePreferredCurrencyList(
          action?.payload?.data?.rates
        );
      })
      .addCase(getCurrencyRates.rejected, (state) => {
        state.isLoading = false;
        state.currencyRateList = [];
      })
      .addCase(getCurrencyRatesForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencyRatesForAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrencyRatesForAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setCurrencyRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrencyRates.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setCurrencyRates.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { updatePreferredCurrencyList } = currencyRateSlice.actions;
export default currencyRateSlice.reducer;
