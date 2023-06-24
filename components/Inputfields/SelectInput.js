import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

export function SelectInput({
  name,
  label,
  placeholder,
  options,
  isMulti,
  ...props
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const handleChange = (selectedOption, field) => {
    return isMulti
      ? field.onChange(
          selectedOption ? selectedOption.map((option) => option.value) : []
        )
      : field.onChange(selectedOption?.value ?? "");
  };

  const handleValue = (field) => {
    return isMulti
      ? field.value
        ? options.value
        : []
      : field.value
      ? options.value
      : "";
  };

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "rgb(31 41 55)",
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "rgb(107 114 128)" : "transparent",
      "&:hover": {
        borderColor: "none",
      },
      //
      boxShadow: "none",
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? "rgb(75 85 99)" : "rgb(31 41 55)",
      color: state.isSelected ? "rgb(243 244 246)" : "rgb(243 244 246)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: state.isSelected ? "" : "rgb(55 65 81)",
      },
      "&:active": {
        backgroundColor: state.isSelected ? "rgb(75 85 99)" : "rgb(55 65 81)",
      },
    }),
    input: (styles) => ({
      ...styles,
      color: "rgb(243 244 246)",
      "input:focus": {
        boxShadow: "none",
      },
      padding: "5px",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "rgb(243 244 246)",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "rgb(31 41 55)",
      borderRadius: "0.375rem",
    }),
    multiValue: (styles, { data }) => {
      const gray700 = "rgb(55 65 81)";
      return {
        ...styles,
        backgroundColor: gray700,
        borderRadius: "0.25rem",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: "rgb(127 29 29)",
        color: "white",
      },
    }),
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <Controller
        id={name}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            instanceId="select-box"
            isClearable
            isSearchable
            options={options}
            value={handleValue(field)}
            isMulti={isMulti}
            onChange={(selectedOption) => handleChange(selectedOption, field)}
            placeholder={placeholder}
            styles={customStyles}
          />
        )}
      />
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
