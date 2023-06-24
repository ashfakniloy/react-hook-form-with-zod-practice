import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Form from "@/components/Form";
import { InputField } from "@/components/Inputfields/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectField } from "@/components/Inputfields/SelectField";
import { CheckboxField } from "@/components/Inputfields/CheckboxField";
import { RadioField } from "@/components/Inputfields/RadioFIeld";
import { PasswordField } from "@/components/Inputfields/PasswordField";
import { DynamicField } from "@/components/Inputfields/DynamicField";
import { NumberField } from "@/components/Inputfields/NumberField";
import { FileField } from "@/components/Inputfields/FileField";
import { DateField } from "@/components/Inputfields/DateField";
import { SelectInput } from "@/components/Inputfields/SelectInput";
// import { DevTool } from "@hookform/devtools";
const DevTool = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

function HomePage() {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: [{ number: "" }],
    item: "",
    option: "",
    age: 0,
    date: undefined,
    gender: undefined,
    image: "",
    imagePreview: "", //will not submit
    agreement: "",
  };

  const schema = z
    .object({
      username: z.string().nonempty("Username is required"),
      email: z.string().nonempty("Email is required").email("Invalid email"),
      password: z.string().nonempty("Password is required"),
      confirmPassword: z.string().nonempty("Confirm password is required"),
      contactNo: z.array(
        z.object({
          number: z.string().nonempty("Number required"),
        })
      ),
      // .refine((values) => values.some((value) => value.number), {
      //   message: "At least one option field is required",
      // }),
      item: z.string().nonempty("Item is required"),
      option: z.string().nonempty("Option is required"),
      // option: z.array(z.string()).min(1, "Please select at least one option"),
      image: z.string().nonempty("Please choose an image"),
      age: z
        .number()
        .min(18, "Age must be at least 18 years")
        .max(100, "Age must be less than 100 years")
        .refine((value) => value !== null && value !== undefined, {
          message: "Age is required",
        }),
      // date: z.string().nonempty("Date required"),
      // date: z.date().refine((value) => value !== undefined, {
      //   message: "Date is required",
      //   path: ["date"],
      // }),
      date: z.date({
        invalid_type_error: "Invalid date",
        required_error: "Date is required",
      }),
      gender: z.enum(["Male", "Female"], {
        errorMap: () => ({
          message: "Gender is required",
        }),
      }),
      // gender: z.enum(["Male", "Female"], {
      //   required_error: "Gender is required",
      // }),
      agreement: z.literal(true, {
        errorMap: () => ({
          message: "You must accept terms and conditions.",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // const hookForm = useForm({ defaultValues });
  const hookForm = useForm({ defaultValues, resolver: zodResolver(schema) });
  const { reset, control, handleSubmit } = hookForm;

  const formSubmit = (values) => {
    console.log(values);
    reset();
  };

  return (
    <>
      <div className="my-20 flex justify-center items-center min-h-screen">
        <div className="p-10 border-2 border-gray-600 rounded-2xl">
          <h1 className="text-center text-3xl font-bold">Sign in</h1>
          {/* {renderCount && (
            <p className="text-lg"> {`Render ${renderCount / 2}`}</p>
          )} */}

          <Form
            hookForm={hookForm}
            onSubmit={handleSubmit(formSubmit)}
            className="mt-5 w-[400px] space-y-7"
          >
            <InputField label="Username" name="username" type="text" />
            <InputField label="Email" name="email" type="email" />
            <PasswordField
              label="Password"
              name="password"
              // autoComplete="true"
            />
            <PasswordField
              label="Confirm password"
              name="confirmPassword"
              // autoComplete="true"
            />
            <DynamicField
              label="Contact Number"
              type="text"
              name="contactNo"
              optionName="number"
              maxLength={4}
            />
            <SelectField
              label="Select Item"
              name="item"
              options={["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]}
              placeholder="Select an item"
            />
            <NumberField label="Age" name="age" min={18} max={100} />
            <DateField label="Select Date" name="date" />
            <SelectInput
              name="option"
              label="Select Option (react-select)"
              placeholder="Select an option"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              // isMulti={true}
            />
            <RadioField
              label="Select Gender"
              name="gender"
              options={["Male", "Female"]}
            />
            <FileField label="Add Image" name="image" />
            <CheckboxField
              label="I agree with terms and policy"
              name="agreement"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-bold active:bg-gray-700"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
      <DevTool control={control} />
    </>
  );
}

export default HomePage;
