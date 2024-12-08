const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const codeTypes = {
  'application/javascript': 'uploads/code/javascript',
  'text/javascript': 'uploads/code/javascript',
  'application/x-javascript': 'uploads/code/javascript',
  'application/x-sh': 'uploads/code/shell',
  'text/x-python': 'uploads/code/python',
  'application/java': 'uploads/code/java',
  'text/x-csrc': 'uploads/code/c',
  'text/x-c++src': 'uploads/code/cpp',
  'application/ruby': 'uploads/code/ruby',
  'application/go': 'uploads/code/go',
  'application/php': 'uploads/code/php',
  'application/swift': 'uploads/code/swift',
};
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    format: async (req, file) => 'jpg',
    folder: (req, file) => {
      const mimeType = file.mimetype;
      if (mimeType.startsWith('image/'))return 'uploads/images';
      if (mimeType.startsWith('video/'))return 'uploads/videos';
      if (mimeType.startsWith('audio/'))return 'uploads/music';
      if (codeTypes[mimeType])return codeTypes[mimeType];
      return 'uploads/others'; // その他のファイル
    },
    public_id: (req, file) => file.originalname, // ファイル名を使用
  },
});
const upload=multer({ storage: storage });
module.exports = upload;