import { useFormContext } from "react-hook-form";

export function SelectField({ name, label, placeholder, options, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <select
        id={name}
        {...props}
        {...register(name)}
        className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
      >
        <option value="" className="" defaultValue={true} hidden>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option} className="bg-gray-800">
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
