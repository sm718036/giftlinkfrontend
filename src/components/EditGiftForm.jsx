import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppInput from "./AppInput";
import { useUpdateGift } from "../hooks/giftHooks";
import { compressImageToTargetSize } from "../utils/imageCompression";

const CATEGORIES = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
const CONDITIONS = ["New", "Like New", "Older"];

const EditGiftForm = ({ gift, onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(gift?.image ?? null);
  const [imageBase64, setImageBase64] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const { updateGift, isUpdatingGift } = useUpdateGift(gift?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: gift?.name ?? "",
      category: gift?.category ?? "",
      condition: gift?.condition ?? "",
      ageInYears: gift?.ageInYears ?? 1,
      description: gift?.description ?? "",
      contactInfo: gift?.contactInfo ?? "",
    },
  });

  useEffect(() => {
    if (gift) {
      reset({
        name: gift.name ?? "",
        category: gift.category ?? "",
        condition: gift.condition ?? "",
        ageInYears: gift.ageInYears ?? 1,
        description: gift.description ?? "",
        contactInfo: gift.contactInfo ?? "",
        address: gift.address ?? "",
      });
      setImagePreview(gift.image ?? null);
      setImageBase64("");
    }
  }, [gift, reset]);

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
    const imageToSend = imageBase64 || gift?.image;
    if (!imageToSend) {
      toast.error("Please upload an image or keep the existing one.");
      return;
    }
    try {
      await updateGift({
        name: data.name,
        image: imageToSend,
        category: data.category,
        condition: data.condition,
        ageInYears: Number(data.ageInYears),
        description: data.description,
        contactInfo: data.contactInfo,
        address: data.address ?? "",
      });
      toast.success("Gift updated successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Error updating gift:", error);
    }
  }

  if (!gift) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isCompressing}
          className="field disabled:opacity-60"
        />
        {isCompressing && <p className="mt-1 text-sm text-gray-500">Compressing image...</p>}
        {imagePreview && !isCompressing && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-32 w-full object-cover rounded-lg border"
          />
        )}
        <p className="text-gray-500 text-xs mt-1">
          Leave empty to keep current image. New images are resized to ~200–300 KB.
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Category</label>
        <select className="field" {...register("category", { required: "Category is required" })}>
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Condition</label>
        <select className="field" {...register("condition", { required: "Condition is required" })}>
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

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Age (years): {ageInYears}</label>
        <input
          type="range"
          min="1"
          max="10"
          className="w-full mt-1"
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

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          className="field min-h-[80px]"
          placeholder="Describe the item..."
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

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isUpdatingGift} className="btn-primary flex-1">
          {isUpdatingGift ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
};

export default EditGiftForm;
