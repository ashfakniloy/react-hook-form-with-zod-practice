import { useFormContext } from "react-hook-form";

export function NumberField({ name, label, type, min, max, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <input
        type="number"
        id={name}
        min={min}
        max={max}
        // inputMode="numeric"
        // autoComplete="off"
        {...props}
        {...register(name, { valueAsNumber: true })}
        className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
        // style={{
        //   MozAppearance: "textfield", // Firefox
        //   WebkitAppearance: "none", // Safari and Chrome
        //   appearance: "none", // Other browsers
        // }}
      />
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
