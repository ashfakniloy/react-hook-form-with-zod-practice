import { useFormContext } from "react-hook-form";

export function CheckboxField({ name, label, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          {...props}
          {...register(name)}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor={name} className="cursor-pointer">
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
