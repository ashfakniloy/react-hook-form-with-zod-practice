import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const IconX = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export function FileField({ name, label, ...props }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];

    setValue("imagePreview", URL.createObjectURL(imageFile));

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setImageUrl(URL.createObjectURL(imageFile));
    setIsLoading(false);

    // const formData = new FormData();
    // formData.append("file", imageFile);
  };

  useEffect(() => {
    console.log("imageurl", imageUrl);
    setValue("image", imageUrl);
    // console.log("imageFile", imageFile);
  }, [imageUrl, setValue]);

  const imageValue = watch("image");
  const imagePreview = watch("imagePreview");
  // const imageValue = getValues("image");
  // useEffect(() => {
  //   console.log("imageValue", imageValue);
  // }, [imageUrl]);

  const handleRemoveImage = () => {
    setImageUrl("");
    setValue("imagePreview", "");
  };

  return (
    <div className="relative h-[110px]">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      {!imageValue && !imagePreview ? (
        <div className="">
          <input
            type="file"
            accept="image/*"
            id={name}
            {...register(name)}
            name="imageFile"
            onChange={handleImageChange}
            className="hidden"
            {...props}
          />
          <label
            htmlFor={name}
            title="Choose an image from your device"
            className="bg-green-700 text-white text-sm font-bold px-3 py-1.5 rounded cursor-pointer border border-transparent hover:border-gray-300"
          >
            Choose an image
          </label>
          {errors[name] && (
            <p className="absolute mt-1.5 text-sm text-red-600">
              {errors[name]?.message}
            </p>
          )}
        </div>
      ) : (
        <div className="">
          {isLoading ? (
            <div className="relative w-[80px] h-[80px]">
              <Image
                src={imagePreview}
                alt="image preview"
                fill
                className="object-cover rounded-lg blur-sm"
              />
              <span className="absolute inset-0 flex justify-center items-center text-sm font-bold">
                Uploading
              </span>
            </div>
          ) : (
            imageValue &&
            imagePreview && (
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={imageValue}
                  placeholder="blur"
                  blurDataURL={imagePreview}
                  alt="image uploaded preview"
                  fill
                  className="object-cover rounded-lg"
                />

                <button
                  type="button"
                  title="Remove Image"
                  className="absolute top-1 right-1  p-[1px] rounded-full bg-white border border-black fill-black hover:scale-110"
                  onClick={handleRemoveImage}
                >
                  <IconX />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
