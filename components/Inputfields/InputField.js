import { useFormContext } from "react-hook-form";

export function InputField({ name, label, type, ...props }) {
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
        type={type}
        id={name}
        // autoComplete="off"
        {...props}
        {...register(name)}
        className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
      />
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
