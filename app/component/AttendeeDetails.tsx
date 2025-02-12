"use client";
import axios from "axios";
import { configDotenv } from "dotenv";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import uploadIcon from "../../public/Icon/Icon/cloud-download.svg";
import mailIcon from "../../public/Icon/Icon/Icon/envelope.svg";
import { jeju, roboto } from "../fonts";
import { getFormData, saveFormData } from "../utils/indexedDB";

configDotenv();

const AttendeeDetails = () => {
  interface Errors {
    fullName?: string;
    email?: string;
    avatar?: string;
    details?: string;
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    getFormData().then((data) => {
      setFullName(data?.fullName || "");
      setEmail(data?.email || "");
      setDetails(data?.details || "");
      setAvatarUrl(data?.avatarUrl || "");
    });
  }, []);

  const validateForm = () => {
    const errors: Errors = {};
    if (!fullName) errors.fullName = "Full name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";
    if (!details) errors.details = "Event details are required";
    if (!avatarUrl || !avatarUrl.startsWith("http"))
      errors.avatar = "Invalid avatar URL";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          throw new Error("Cloudinary cloud name is missing!");
        }

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        );

        setAvatarUrl(response.data.secure_url);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      saveFormData({ fullName, email, details, avatarUrl });
      setFullName("");
      setEmail("");
      setDetails("");
      setAvatarUrl("");
      setErrors({});
      router.push("/my-ticket");
    }
  };

  return (
    <div
      className={`${roboto.className} w-[700px] h-auto m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center p-12 rounded-[40px] mt-8`}
    >
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <h2 className={`${jeju.className} text-[32px] text-foreground`}>
            Attendee Details
          </h2>
          <p>Step 2/3</p>
        </div>
        <div className="w-full h-1 bg-secondary rounded-3xl relative">
          <div className="w-[40%] h-1 bg-primary rounded-3xl absolute top-0"></div>
        </div>
      </div>

      <div className="bg-ticket_box_background w-full p-6 rounded-[32px] border border-secondary flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col items-start justify-center gap-8 p-6 border-2 border-ticket_box_border rounded-3xl">
            <p className="text-foreground">Upload Profile Photo</p>
            <div className="w-full bg-black/20 flex items-center justify-center">
              <div className="relative h-[240px] w-[240px] text-center  rounded-[32px] bg-secondary flex flex-col gap-4 items-center justify-center">
                {avatarUrl ? (
                  <div className="relative group h-[240px] w-[240px] flex items-center justify-center overflow-hidden rounded-[32px]">
                    {" "}
                    <Image
                      src={avatarUrl}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[32px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-[32px] cursor-pointer">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center justify-center w-full h-full "
                      >
                        <Image
                          src={uploadIcon}
                          alt="Change Image"
                          height={48}
                          width={48}
                          className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                        />
                        <p className="mt-2 text-sm w-40">
                          Drag & drop or click to upload
                        </p>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="imageUpload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Image
                        src={uploadIcon}
                        alt="Upload Icon"
                        height={48}
                        width={48}
                      />
                      <p className="mt-2 text-sm">
                        Drag & drop or click to upload
                      </p>
                    </label>
                  </div>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
                {uploading && <p className="text-blue-500">Uploading...</p>}
                {errors.avatar && (
                  <p className="text-red-500">{errors.avatar}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-1 bg-ticket_box_border"></div>

          <div className="input-group">
            <label htmlFor="fullName">Enter your name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="input-group relative">
            <label htmlFor="email">Enter your email *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@avioflagos.io"
                className="ps-10"
              />
              <Image
                src={mailIcon}
                alt="Mail Icon"
                width={24}
                height={24}
                className="absolute top-3 left-3"
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="details">About the project</label>
            <textarea
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Textarea"
              className="bg-transparent border border-ticket_box_border p-3 h-[127px] rounded-xl"
            />
            {errors.details && <p className="text-red-500">{errors.details}</p>}
          </div>

          <div className="w-full h-12 flex justify-between items-center gap-8">
            <button
              onClick={handleBack}
              className={`${jeju.className} py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full`}
            >
              Back
            </button>
            <button
              type="submit"
              className={`${jeju.className} py-3 px-6 text-center rounded-lg bg-primary text-foreground w-full`}
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDetails;
