// import { useFormContext } from "react-hook-form";

// export function DateField({ name, label, type, ...props }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="relative">
//       <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
//         {label}
//       </label>
//       <input
//         type="date"
//         id={name}
//         // autoComplete="off"
//         {...props}
//         {...register(name)}
//         className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
//       />
//       {errors[name] && (
//         <p className="absolute mt-0.5 text-sm text-red-600">
//           {errors[name]?.message}
//         </p>
//       )}
//     </div>
//   );
// }

import { useFormContext, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";

export function DateField({ name, label, type, ...props }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const customDayClassName = (date) => {
    // Add custom logic to apply classes based on specific conditions
    // Return the desired class names as a string
    return date.getDay() === 0 ? "text-red-500" : "";
  };

  const customMonthClassName = (date) => {
    // Add custom logic to apply classes based on specific conditions
    // Return the desired class names as a string
    return date.getMonth() === 0 ? "text-green-500" : "";
  };

  const customYearClassName = (date) => {
    // Add custom logic to apply classes based on specific conditions
    // Return the desired class names as a string
    return date.getFullYear() === 2023 ? "text-blue-500" : "";
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>

      <Controller
        name={name}
        // control={control}
        render={({ field }) => (
          // <Datepicker
          //   useRange={false}
          //   asSingle={true}
          //   // showShortcuts={true}
          //   displayFormat={"DD/MM/YYYY"}
          //   readOnly={true}
          //   {...field}
          //   inputClassName="w-full  text-gray-100 bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500"
          //   containerClassName=""
          //   // toggleClassName="absolute bg-blue-400"
          // />
          <ReactDatePicker
            {...field}
            selected={field.value}
            // showPopperArrow={false}
            popperPlacement="bottom"
            // peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            // calendarClassName="!bg-gray-800 border border-gray-300 rounded-md shadow-lg p-4"
            // dayClassName={customDayClassName}
            // monthClassName={customMonthClassName}
            // yearClassName={customYearClassName}
            // showIcon
            // showTimeSelect
            // timeFormat="HH:mm"
            // timeIntervals={15}
            // timeCaption="time"
            // dateFormat="MMMM d, yyyy h:mm aa"
            // onChange={(date) => field.onChange(date)}
            // onChange={(date) =>
            //   field.onChange(date.toISOString().split("T")[0])
            // }
            // onChange={(date) =>
            //   field.onChange(date.toISOString().split("T")[0])
            // }
            // onChange={(date) => handleDateChange(date)}
            // onChange={(date) => {
            //   const x = new Date(date.toISOString().split("T"));
            //   return field.onChange(x);
            // }}
            // minDate={new Date()}
            filterDate={(date) => date.getDay() !== 5 && date.getDay() !== 6}
            // dateFormat="dd/MM/yyyy"
            // dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="w-full bg-gray-800 p-2 rounded-md outline-none border border-transparent focus:border-gray-500 "
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
