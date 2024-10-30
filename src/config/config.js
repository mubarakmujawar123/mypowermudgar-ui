export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
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
  },
  {
    label: "Wood Type",
    name: "woodType",
    componentType: "multiselect",
    options: [
      { id: "babool", label: "Babool (Acacia)", value: "babool" },
      { id: "sagwan", label: "Sagwan (Teak Wood)", value: "sagwan" },
    ],
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
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
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
  },
  {
    label: "Height (feet)",
    name: "height",
    componentType: "select",
    hidden: false,
    options: [],
  },
  {
    label: "Weight (kg)",
    name: "weight",
    componentType: "select",
    hidden: false,
    options: [],
  },

  {
    label: "Quantity",
    name: "quantity",
    hidden: false,
    componentType: "counter",
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/listing" },
  { id: "mudgar", label: "Mudgar", path: "/shop/listing" },
  { id: "gada", label: "Gada", path: "/shop/listing" },
  { id: "pushUpBoard", label: "Push Up Board", path: "/shop/listing" },
  { id: "samtola", label: "Samtola", path: "/shop/listing" },
  { id: "comboKit", label: "Combo Kit", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const categoryOptionsMap = {
  mudgar: "Mudgar",
  gada: "Gada",
  pushUpBoard: "Push Up Board",
  samtola: "Samtola",
  comboKit: "Combo Kit",
};
export const optionsMap = {
  babool: "Babool (Acacia)",
  sagwan: "Sagwan (Teak Wood)",
  woodType: "Wood Type",
  weight: "Weight",
  height: "Height",
  "1-2": "1-2",
  "2-3": "2-3",
};
