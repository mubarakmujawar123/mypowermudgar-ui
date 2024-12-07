import { countryList } from "./constant";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
    isMandatory: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    isMandatory: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    isMandatory: true,
  },
  {
    name: "reEnterpassword",
    label: "Re-Enter Password",
    placeholder: "Re-Enter your password",
    componentType: "input",
    type: "password",
    isMandatory: true,
  },
  {
    name: "preferredCurrency",
    label: "Preferred Currency",
    componentType: "select",
    options: [],
    isMandatory: true,
  },
];
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    isMandatory: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    isMandatory: true,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
    isMandatory: true,
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
    isMandatory: true,
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "mudgar", label: "Mudgar" },
      { id: "gada", label: "Gada" },
      { id: "pushUpBoard", label: "Push Up Board" },
      { id: "samtola", label: "Samtola" },
      { id: "comboKit", label: "Combo Kit" },
    ],
    isMandatory: true,
  },
  {
    label: "Wood Type",
    name: "woodType",
    componentType: "multiselect",
    options: [
      { id: "babool", label: "Babool (Acacia)", value: "babool" },
      { id: "sagwan", label: "Sagwan (Teak Wood)", value: "sagwan" },
    ],
    isMandatory: true,
  },
  {
    label: "Height",
    name: "height",
    componentType: "multiselect",
    options: [
      { id: "0", label: "0", value: "0" },
      { id: "1-2", label: "1-2", value: "1-2" },
      { id: "2-3", label: "2-3", value: "2-3" },
    ],
    isMandatory: true,
  },
  {
    label: "Weight",
    name: "weight",
    componentType: "multiselect",
    options: [
      { id: "0", label: "0", value: "0" },
      { id: "1-2", label: "1-2", value: "1-2" },
      { id: "2-3", label: "2-3", value: "2-3" },
    ],
    isMandatory: true,
  },
  {
    label: "Price (per kg)",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
    isMandatory: true,
  },
  {
    label: "Sale Price (per kg)",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price",
    isMandatory: true,
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
    isMandatory: true,
  },
];
export const addProducToCartElements = [
  {
    label: "Wood Type",
    name: "woodType",
    componentType: "select",
    hidden: false,
    options: [
      { id: "babool", label: "Babool (Acacia)" },
      { id: "sagwan", label: "Sagwan (Teak Wood)" },
    ],
    isMandatory: true,
  },
  {
    label: "Height (feet)",
    name: "height",
    componentType: "select",
    hidden: false,
    options: [],
    isMandatory: true,
  },
  {
    label: "Weight (kg)",
    name: "weight",
    componentType: "select",
    hidden: false,
    options: [],
    isMandatory: true,
  },

  {
    label: "Quantity",
    name: "quantity",
    hidden: false,
    componentType: "counter",
    isMandatory: true,
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "all-products", label: "All Products", path: "/shop/listing" },
  { id: "mudgar", label: "Mudgar", path: "/shop/listing" },
  { id: "gada", label: "Gada", path: "/shop/listing" },
  { id: "pushUpBoard", label: "Push Up Board", path: "/shop/listing" },
  { id: "samtola", label: "Samtola", path: "/shop/listing" },
  { id: "comboKit", label: "Combo Kit", path: "/shop/listing" },
  // { id: "search", label: "Search", path: "/shop/search" },
];

export const addressFormControls = [
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
    isMandatory: true,
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
    isMandatory: true,
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
    isMandatory: true,
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
    isMandatory: true,
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your state/region",
    isMandatory: true,
  },
  {
    label: "Country",
    name: "country",
    componentType: "combobox",
    options: countryList,
    placeholder: "Select your country",
    isMandatory: true,
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
    isMandatory: false,
  },
  // {
  //   label: "Set as default address",
  //   name: "isDefault",
  //   type: "checkbox",
  //   componentType: "checkbox",
  //   isMandatory: false,
  // },
];

export const adminOrderStatusControls = [
  {
    label: "Order Status",
    name: "orderStatus",
    componentType: "select",
    isMandatory: true,
    options: [
      { id: "CONFIRMED", label: "CONFIRMED", disabled: true },
      { id: "PENDING", label: "PENDING" },
      { id: "INPROGRESS", label: "IN PROGRESS" },
      { id: "INSHIPPING", label: "IN SHIPPING" },
      { id: "DELIVERED", label: "DELIVERED" },
      { id: "REJECTED", label: "REJECTED" },
    ],
  },
];
