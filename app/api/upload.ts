// import type { NextApiRequest, NextApiResponse } from "next";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const file = req.body.file;
//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       folder: "conference_tickets",
//     });

//     res.status(200).json({ url: uploadResponse.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// }
