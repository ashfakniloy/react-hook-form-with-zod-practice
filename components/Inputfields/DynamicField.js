import { useFieldArray, useFormContext } from "react-hook-form";

const IconMinusCircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export function DynamicField({
  name,
  optionName,
  label,
  type,
  maxLength,
  ...props
}) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
    rules: {
      maxLength: maxLength,
    },
  });

  return (
    <div className="relative">
      <div className="space-y-7">
        {fields.map((field, index) => (
          <div key={field.id} className="">
            <label
              htmlFor={label + index}
              className="inline-block mb-2 cursor-pointer"
            >
              {label} {index !== 0 && index + 1}
            </label>
            <div className="relative">
              <input
                type={type}
                id={label + index}
                {...props}
                {...register(`${name}.${index}.${optionName}`)}
                className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
              />
              {(index > 0 || fields.length > 1) && (
                <div className="absolute -right-6 inset-y-0 flex items-center">
                  <button
                    type="button"
                    title="Remove"
                    className="hover:text-red-500 rounded-full overflow-hidden"
                    onClick={() => remove(index)}
                  >
                    <IconMinusCircle />
                  </button>
                </div>
              )}

              {errors[name] && (
                <p className="absolute mt-0.5 text-sm text-red-600">
                  {errors?.[name]?.[index]?.[optionName]?.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {fields.length < maxLength && (
        <div className="flex justify-end">
          <button
            type="button"
            title={`Add another ${label.toLowerCase()} field`}
            className="mt-2 text-xs font-bold bg-gray-800 px-4 py-2 rounded border border-transparent hover:border-gray-500"
            onClick={() => append({ [optionName]: "" })}
          >
            Add another
          </button>
        </div>
      )}
    </div>
  );
}
