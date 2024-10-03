import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

// Create directories for different types of uploads
const createFolder = (folderName: string) => {
  const dir = path.join(process.cwd(), 'public/uploads', folderName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Custom destination based on file type
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.includes('spreadsheetml') || file.mimetype.includes('excel')) {
      createFolder('participants');
      cb(null, path.join(process.cwd(), 'public/uploads/participants'));
    } else if (file.mimetype.includes('image')) {
      if (req.body.type === 'prize') {
        createFolder('prizes');
        cb(null, path.join(process.cwd(), 'public/uploads/prizes'));
      } else if (req.body.type === 'event') {
        createFolder('events');
        cb(null, path.join(process.cwd(), 'public/uploads/events'));
      } else {
        cb(new Error('Invalid image type'), '');
      }
    } else {
      cb(new Error('Unsupported file type'), '');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploader = multer({ storage,
  limits: { fileSize: 100 * 1024 * 1024 },
 });

export default uploader;