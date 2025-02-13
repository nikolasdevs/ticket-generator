"use client";
import axios from "axios";
import { configDotenv } from "dotenv";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
    if (!avatarUrl || !avatarUrl.startsWith("http"))
      errors.avatar = "Please upload an image";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
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
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      saveFormData({
        fullName,
        email,
        details,
        avatarUrl,
      });
      setFullName("");
      setEmail("");
      setDetails("");
      setAvatarUrl("");
      setErrors({});

      setTimeout(() => {
        router.push("/my-ticket");
      }, 2000);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await handleUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="pb-4 px-3 md:w-full w-full h-full">
      <div
        className={`${roboto.className} max-w-[700px] m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center p-5 sm:rounded-[40px] rounded-3xl h-full`}
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center w-full">
            <h2 className={`sm:text-[32px] text-2xl ${jeju.className} `}>
              Attendee Details
            </h2>
            <p>Step 2/3</p>
          </div>
          <div className="w-full h-1 bg-secondary rounded-3xl relative">
            <div className="w-[55%] h-1 bg-primary rounded-3xl absolute top-0"></div>
          </div>
        </div>

        <div className="sm:bg-ticket_box_background w-full sm:p-6 rounded-[32px] sm:border border-secondary flex flex-col gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center sm:gap-8 gap-4 p-6 pb-12 sm:pb-0 border-2 border-ticket_box_border sm:rounded-3xl rounded-[32px]  ">
              <p className=" flex items-start justify-start  w-full ps-6">
                Upload Profile Photo
              </p>
              <div className="sm:w-full sm:h-[200px] sm:bg-black/20 sm:flex sm:items-center sm:justify-center bg-transparent">
                <div
                  {...getRootProps()}
                  className={`relative h-[240px] w-[240px] text-center rounded-[32px] border-4 border-primary border-opacity-50 flex flex-col gap-4 items-center justify-center p-6 cursor-pointer ${
                    isDragActive ? "bg-black/10 border-dashed" : "bg-secondary"
                  }`}
                >
                  <input {...getInputProps()} />

                  {avatarUrl ? (
                    <div className="relative group h-[240px] w-[240px] flex items-center justify-center rounded-[32px]">
                      <Image
                        src={avatarUrl}
                        alt="avatar"
                        width={240}
                        height={240}
                        className="rounded-[32px] object-cover w-full h-full p-1"
                      />
                      <div
                        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 flex flex-col items-center justify-center rounded-[32px] ${
                          isDragActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={uploadIcon}
                          alt="Change Image"
                          height={48}
                          width={48}
                          className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                        />
                        <p className="w-40">Drag & drop or click to upload</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Image
                        src={uploadIcon}
                        alt="Upload Icon"
                        height={32}
                        width={32}
                      />
                      <p>Drag & drop or click to upload</p>
                    </div>
                  )}
                  <input
                    onChange={handleFileChange}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  {uploading && (
                    <p className="text-secondary_light">Uploading...</p>
                  )}
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
              <label htmlFor="details">Special request?</label>
              <textarea
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Textarea"
                className="bg-transparent border border-ticket_box_border p-3 h-[127px] rounded-xl outline-none"
              />
              {errors.details && (
                <p className="text-red-500">{errors.details}</p>
              )}
            </div>

            <div className="w-full flex sm:flex-row flex-col justify-between items-center sm:gap-8 gap-4">
              <button
                type="submit"
                className={`${jeju.className} py-3 px-6 text-center rounded-lg bg-primary text-foreground w-full sm:hidden btn_hover`}
              >
                Get My Free Ticket
              </button>
              <Link
                className={`${jeju.className} py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full btn_hover`}
                href="/"
              >
                <button>Back</button>
              </Link>
              <button
                type="submit"
                className={`${jeju.className} py-3 px-6 text-center rounded-lg bg-primary text-foreground w-full hidden sm:block btn_hover`}
              >
                Get My Free Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
