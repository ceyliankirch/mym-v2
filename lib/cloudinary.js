// lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

// 📸 Upload public (photos de séjours, galerie, animateurs) — accessible via URL directe
export async function uploadPublicImage(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBuffer(buffer, { folder, resource_type: "image" });
  return { url: result.secure_url, publicId: result.public_id };
}

// 🔒 Upload privé (documents familles) — non accessible sans URL signée
export async function uploadPrivateDocument(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBuffer(buffer, { folder, resource_type: "auto", type: "authenticated" });
  const url = cloudinary.url(result.public_id, {
    resource_type: result.resource_type,
    type: "authenticated",
    sign_url: true,
    version: result.version,
  });
  return { url, publicId: result.public_id, resourceType: result.resource_type };
}

// 🗑️ Supprime un asset public à partir de son URL Cloudinary
export async function deletePublicAsset(url) {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image", type: "upload" });
  } catch (e) {
    console.error("Erreur suppression Cloudinary (public)", e);
  }
}

// 🗑️ Supprime un document privé à partir de son URL Cloudinary signée
export async function deletePrivateAsset(url, resourceType = "raw") {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, type: "authenticated" });
  } catch (e) {
    console.error("Erreur suppression Cloudinary (privé)", e);
  }
}

// Extrait le public_id (avec dossier) depuis une URL Cloudinary, publique ou signée
function extractPublicId(url) {
  if (!url) return null;
  const match = url.match(/\/(?:upload|authenticated)\/(?:s--[^/]+--\/)?(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/);
  return match ? decodeURIComponent(match[1]) : null;
}
