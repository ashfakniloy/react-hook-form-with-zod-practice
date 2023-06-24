import { useFormContext } from "react-hook-form";

export function RadioField({ name, label, options, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label className="block mb-2">{label}</label>
      {options.map((option, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="radio"
            id={option}
            value={option}
            {...props}
            {...register(name)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor={option} className="cursor-pointer">
            {option}
          </label>
        </div>
      ))}

      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
