import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppInput from "./AppInput";
import { usePostNewGift } from "../hooks/giftHooks";
import { compressImageToTargetSize } from "../utils/imageCompression";

const CATEGORIES = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
const CONDITIONS = ["New", "Like New", "Older"];

const PostGiftForm = ({ onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const { createGift, isCreatingGift } = usePostNewGift();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      condition: "",
      ageInYears: 1,
      description: "",
      contactInfo: "",
      address: "",
    },
  });

  const ageInYears = watch("ageInYears");

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPEG, PNG, etc.).");
      return;
    }
    setIsCompressing(true);
    try {
      const dataUrl = await compressImageToTargetSize(file, {
        maxKB: 300,
        minKB: 200,
        maxDimension: 1200,
      });
      setImageBase64(dataUrl);
      setImagePreview(dataUrl);
    } catch (err) {
      console.error("Image compression failed:", err);
      toast.error(err?.message ?? "Failed to process image. Try another file.");
    } finally {
      setIsCompressing(false);
    }
  };

  async function onSubmit(data) {
    if (!imageBase64) {
      toast.error("Please upload an image.");
      return;
    }
    try {
      await createGift({
        name: data.name,
        image: imageBase64,
        category: data.category,
        condition: data.condition,
        ageInYears: Number(data.ageInYears),
        description: data.description,
        contactInfo: data.contactInfo,
        address: data.address,
      });
      toast.success("Gift posted successfully!");
      setImageBase64("");
      setImagePreview(null);
      setValue("name", "");
      setValue("category", "");
      setValue("condition", "");
      setValue("ageInYears", 1);
      setValue("description", "");
      setValue("contactInfo", "");
      setValue("address", "");
      onSuccess?.();
    } catch (error) {
      console.error("Error posting gift:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="pb-2">
        <p className="mt-1 text-sm leading-6 text-[#627168]">
          Add clear details so others know exactly what you&apos;re offering.
        </p>
      </div>

      {/* Image uploader */}
      <div>
        <label className="form-label">Gift image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isCompressing}
          className="field cursor-pointer border-dashed bg-[#f6f0df] file:mr-4 file:rounded-full file:border-0 file:bg-[#063f2c] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white disabled:opacity-60"
        />
        {isCompressing && <p className="mt-1 text-sm text-gray-500">Compressing image...</p>}
        {imagePreview && !isCompressing && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#10261d]/15 bg-[#f6f0df] p-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 w-full rounded-xl object-cover"
            />
          </div>
        )}
        {!isCompressing && (
          <p className="text-gray-500 text-xs mt-1">
            Your image is automatically resized and compressed to ~200–300 KB for faster loading.
          </p>
        )}
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      {/* Main details */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <AppInput
            label="Name"
            name="name"
            placeholder="e.g. Wooden bookshelf"
            register={register}
            error={errors.name}
            rules={{
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
          />
        </div>

        <div>
          <label className="form-label">Category</label>
          <select className="field" {...register("category", { required: "Category is required" })}>
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Condition & age */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="form-label">Condition</label>
          <select
            className="field"
            {...register("condition", { required: "Condition is required" })}
          >
            <option value="">Select condition</option>
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
          {errors.condition && (
            <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Age of item (years): {ageInYears}</label>
          <input
            type="range"
            min="1"
            max="10"
            className="mt-3 w-full"
            {...register("ageInYears", {
              required: "Age is required",
              min: { value: 1, message: "Min 1 year" },
              max: { value: 10, message: "Max 10 years" },
            })}
          />
          {errors.ageInYears && (
            <p className="text-red-500 text-sm mt-1">{errors.ageInYears.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="form-label">Description</label>
        <textarea
          className="field min-h-[100px]"
          placeholder="Describe the item, its condition, and any quirks..."
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Contact & address */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <AppInput
            label="Contact info"
            name="contactInfo"
            type="text"
            placeholder="Email or phone for interested users"
            register={register}
            error={errors.contactInfo}
            rules={{
              required: "Contact info is required",
              minLength: {
                value: 3,
                message: "Contact info must be at least 3 characters",
              },
            }}
          />
        </div>

        <div>
          <AppInput
            label="Address"
            name="address"
            type="text"
            placeholder="Pick-up or delivery address"
            register={register}
            error={errors.address}
            rules={{
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            }}
          />
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 -mb-5 border-t border-[#10261d]/10 bg-[#fffaf0]/95 px-5 pb-1 pt-5 backdrop-blur sm:-mx-7 sm:-mb-7 sm:px-7 sm:pb-2">
        <button
          type="submit"
          disabled={isCreatingGift || isCompressing}
          className="btn-primary w-full sm:flex-1"
        >
          {isCreatingGift ? "Posting..." : "Post Gift"}
        </button>
      </div>
    </form>
  );
};

export default PostGiftForm;
