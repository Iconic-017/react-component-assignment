import InputField from "./InputField";
import { useState } from "react";

export default {
  title: "Components/InputField",
  component: InputField,
};

export const Default = () => {
  const [text, setText] = useState("");
  return (
    <InputField
      label="Name"
      placeholder="Enter your name"
      value={text}
      onChange={(e) => setText(e.target.value)}
      helperText="This is a helper text"
    />
  );
};

export const Invalid = () => (
  <InputField
    label="Email"
    placeholder="Enter email"
    invalid
    errorMessage="Invalid email address"
  />
);

export const Disabled = () => (
  <InputField label="Disabled" placeholder="Can't type" disabled />
);

export const PasswordToggle = () => {
  const [pwd, setPwd] = useState("");
  return (
    <InputField
      label="Password"
      placeholder="Enter password"
      value={pwd}
      onChange={(e) => setPwd(e.target.value)}
      passwordToggle
    />
  );
};

export const Clearable = () => {
  const [txt, setTxt] = useState("Hello");
  return (
    <InputField
      label="Search"
      placeholder="Type something"
      value={txt}
      onChange={(e) => setTxt(e.target.value)}
      clearable
    />
  );
};
