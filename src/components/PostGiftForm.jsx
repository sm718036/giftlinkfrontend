import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImagePlus, Loader2, X } from "lucide-react";
import { usePostNewGift } from "../hooks/giftHooks";
import { compressImageToTargetSize } from "../utils/imageCompression";

const CATEGORIES = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
const CONDITIONS = ["New", "Like New", "Older"];

const Field = ({ label, htmlFor, hint, error, children }) => (
  <div>
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="form-label !mb-0">
        {label}
      </label>
      {hint && <span className="text-xs text-[#61746d]">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="mt-1.5 text-sm text-[#a5342a]" role="alert">
        {error.message}
      </p>
    )}
  </div>
);

const PostGiftForm = ({ onSuccess, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const { createGift, isCreatingGift } = usePostNewGift();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
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
  const description = watch("description") ?? "";

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
      e.target.value = "";
    }
  };

  const clearImage = () => {
    setImageBase64("");
    setImagePreview(null);
  };

  async function onSubmit(data) {
    if (!imageBase64) {
      toast.error("Please add a photo of the gift.");
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
      clearImage();
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error posting gift:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="form-label !mb-0">Photo</span>
          <span className="text-xs text-[#61746d]">Required</span>
        </div>

        {imagePreview ? (
          <div className="relative overflow-hidden rounded-2xl border border-[#102a24]/10 bg-[#fcf8f5]">
            <img
              src={imagePreview}
              alt="Gift preview"
              className="h-52 w-full object-cover sm:h-60"
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <label
                htmlFor="gift-image"
                className="cursor-pointer rounded-full bg-[#fffdfa]/95 px-3 py-1.5 text-xs font-bold text-[#04413b] shadow-sm transition hover:bg-[#fffdfa]"
              >
                Replace
              </label>
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove photo"
                className="grid h-8 w-8 place-items-center rounded-full bg-[#fffdfa]/95 text-[#04413b] shadow-sm transition hover:bg-[#f9ded4] hover:text-[#8b241a]"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="gift-image"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#102a24]/25 bg-[#fcf8f5]/60 px-6 py-9 text-center transition hover:border-[#035954]/50 hover:bg-[#fcf8f5]"
          >
            {isCompressing ? (
              <Loader2 size={22} className="animate-spin text-[#035954]" />
            ) : (
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e7f0ec] text-[#035954]">
                <ImagePlus size={20} />
              </span>
            )}
            <span className="text-sm font-bold text-[#102a24]">
              {isCompressing ? "Preparing photo…" : "Add a photo"}
            </span>
            <span className="text-xs text-[#61746d]">
              {isCompressing ? "Resizing it for a quick upload" : "JPG or PNG · resized for you"}
            </span>
          </label>
        )}
        <input
          id="gift-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isCompressing}
          className="sr-only"
        />
      </div>

      <Field label="Gift name" htmlFor="name" error={errors.name}>
        <input
          id="name"
          className="field"
          placeholder="Oak bookshelf"
          {...register("name", {
            required: "Give your gift a short name",
            minLength: { value: 2, message: "Use at least 2 characters" },
          })}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="category" error={errors.category}>
          <select
            id="category"
            className="field"
            {...register("category", { required: "Pick a category" })}
          >
            <option value="">Choose one</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Condition" htmlFor="condition" error={errors.condition}>
          <select
            id="condition"
            className="field"
            {...register("condition", { required: "Pick a condition" })}
          >
            <option value="">Choose one</option>
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="How old is it?"
        htmlFor="ageInYears"
        hint="Slide to the closest year"
        error={errors.ageInYears}
      >
        <div className="flex items-center gap-4">
          <input
            id="ageInYears"
            type="range"
            min="0"
            max="10"
            step="1"
            className="w-full"
            {...register("ageInYears", {
              required: "Age is required",
              min: { value: 0, message: "Age can't be negative" },
              max: { value: 10, message: "Ages above 10 years aren't supported yet" },
            })}
          />
          <span className="min-w-[62px] rounded-full bg-[#f2e9e2] px-3 py-1 text-center text-sm font-bold text-[#04413b]">
            {Number(ageInYears) === 0 ? "New" : `${ageInYears} yr`}
          </span>
        </div>
      </Field>

      <Field label="Description" htmlFor="description" hint="A few honest sentences" error={errors.description}>
        <textarea
          id="description"
          className="field min-h-[110px] resize-y"
          placeholder="What is it, how has it held up, and anything a new owner should know?"
          {...register("description", {
            required: "Tell people a little about the gift",
            minLength: { value: 10, message: "Use at least 10 characters" },
          })}
        />
        <p className="mt-1.5 text-xs text-[#61746d]">
          {description.trim().length === 0
            ? "Mention any wear, missing parts or quirks."
            : `${description.trim().length} characters`}
        </p>
      </Field>

      <div className="grid gap-5 border-t border-[#102a24]/10 pt-6 sm:grid-cols-2">
        <Field label="Contact info" htmlFor="contactInfo" error={errors.contactInfo}>
          <input
            id="contactInfo"
            className="field"
            placeholder="Email or phone number"
            {...register("contactInfo", {
              required: "Add a way to reach you",
              minLength: { value: 3, message: "Use at least 3 characters" },
            })}
          />
        </Field>

        <Field label="Pickup address" htmlFor="address" error={errors.address}>
          <input
            id="address"
            className="field"
            placeholder="Street, area or landmark"
            {...register("address", {
              required: "Where can this be collected?",
              minLength: { value: 5, message: "Use at least 5 characters" },
            })}
          />
        </Field>
      </div>

      <div className="sticky bottom-0 -mx-5 flex flex-col-reverse gap-3 border-t border-[#102a24]/10 bg-[#fffdfa]/95 px-5 py-4 backdrop-blur sm:-mx-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="hidden text-xs text-[#61746d] sm:block">
          You can edit this listing at any time.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isCreatingGift || isCompressing}
            className="btn-primary"
          >
            {isCreatingGift ? "Publishing…" : "Publish gift"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostGiftForm;
