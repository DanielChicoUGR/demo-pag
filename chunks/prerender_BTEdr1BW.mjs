/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, A as AstroError, f as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, g as InvalidImageService, h as ImageMissingAlt, m as maybeRenderHead, s as spreadAttributes, i as renderComponent, j as UnknownContentCollectionError, k as renderUniqueStylesheet, l as renderScriptElement, n as createHeadAndContent, u as unescapeHTML, o as renderHead, p as renderSlot } from './astro_kddb4ice.mjs';
/* empty css                         */
import { r as resolveSrc, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS, p as prependForwardSlash } from './astro/assets-service_U_2fapEv.mjs';
/* empty css                         */
/* empty css                         */
/* empty css                         */

const $$Astro$g = createAstro("https://danielchicougr.github.io");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/demo_page/"}/favicon.svg`, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload"${addAttribute(`${"/demo_page/"}/fonts/atkinson-regular.woff`, "href")} as="font" type="font/ttf" crossorigin><link rel="preload"${addAttribute(`${"/demo_page/"}/fonts/atkinson-bold.woff`, "href")} as="font" type="font/ttf" crossorigin><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Support for spanish caracters --><!-- <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> --><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/BaseHead.astro", void 0);

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1)
      return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength)
      return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
      return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox)
      return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service_U_2fapEv.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$f = createAstro("https://danielchicougr.github.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/node_modules/.pnpm/astro@4.5.16_typescript@5.4.4/node_modules/astro/components/Image.astro", void 0);

const $$Astro$e = createAstro("https://danielchicougr.github.io");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && originalSrc.format in specialFormatsFallback) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/node_modules/.pnpm/astro@4.5.16_typescript@5.4.4/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$d = createAstro("https://danielchicougr.github.io");
const $$ImageComponent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$ImageComponent;
  const { src: imagePath, alt: altText, ...attrs } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"../assets/images/MJCaceres-150x130.jpeg": () => import('./MJCaceres-150x130_DzR5DK53.mjs'),"../assets/images/atoms-molecule-chemistry.jpg": () => import('./atoms-molecule-chemistry_Dg3uUULf.mjs'),"../assets/images/home_main.jpg": () => import('./home_main_FTN9pnTp.mjs'),"../assets/images/logo_centro_mediterraneo-1024x347.png": () => import('./logo_centro_mediterraneo-1024x347_Cwd_o99N.mjs'),"../assets/images/logo_centro_mediterraneo-1536x520.png": () => import('./logo_centro_mediterraneo-1536x520_Cp6DukDV.mjs'),"../assets/images/logo_centro_mediterraneo-2048x693.png": () => import('./logo_centro_mediterraneo-2048x693_Cyz0NQkM.mjs'),"../assets/images/logo_centro_mediterraneo-300x102.png": () => import('./logo_centro_mediterraneo-300x102_0The0NoH.mjs'),"../assets/images/logo_centro_mediterraneo-768x260.png": () => import('./logo_centro_mediterraneo-768x260_BF6ZTXww.mjs'),"../assets/images/logo_facultad_ciencias_negativo-300x255.png": () => import('./logo_facultad_ciencias_negativo-300x255_B_whfs9l.mjs'),"../assets/images/logo_facultad_ciencias_negativo-726-617.png": () => import('./logo_facultad_ciencias_negativo-726-617_gy8uU9p-.mjs'),"../assets/images/logo_ugr_negativo-1024x285.png": () => import('./logo_ugr_negativo-1024x285_DfGuHbsZ.mjs'),"../assets/images/logo_ugr_negativo-1536x428.png": () => import('./logo_ugr_negativo-1536x428_DnWuJ2R4.mjs'),"../assets/images/logo_ugr_negativo-2048x571.png": () => import('./logo_ugr_negativo-2048x571_BV8pNsY6.mjs'),"../assets/images/logo_ugr_negativo-300x84.png": () => import('./logo_ugr_negativo-300x84_D5mV5LGh.mjs'),"../assets/images/logo_ugr_negativo-768x214.png": () => import('./logo_ugr_negativo-768x214_Bf5qTpFB.mjs')

});
  if (!images[imagePath])
    throw new Error(
      `"${imagePath}" does not exist in folder: "src/assets/images/*.{jpeg,jpg,png,gif}"`
    );
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": images[imagePath](), "alt": altText, ...attrs })}`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/ImageComponent.astro", void 0);

const $$Astro$c = createAstro("https://danielchicougr.github.io");
const $$LinkWithIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$LinkWithIcon;
  const { iconPath, viewBox, url, linkText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="links"${addAttribute(url, "href")} data-astro-cid-qz3y4sc4> <div class="icon-text" data-astro-cid-qz3y4sc4> <span class="icon" data-astro-cid-qz3y4sc4> <svg aria-hidden="true"${addAttribute(viewBox, "viewBox")} xmlns="http://www.w3.org/2000/svg" data-astro-cid-qz3y4sc4> <path${addAttribute(iconPath, "d")} data-astro-cid-qz3y4sc4></path> </svg> </span> <div style="font-size: small" data-astro-cid-qz3y4sc4>${linkText}</div> </div> </a> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/LinkWithIcon.astro", void 0);

const $$Astro$b = createAstro("https://danielchicougr.github.io");
const $$LinkFooter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$LinkFooter;
  const { url, linkText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="links" style="font-size: small"${addAttribute(url, "href")} data-astro-cid-loplp3sb> ${linkText} </a> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/LinkFooter.astro", void 0);

const $$Astro$a = createAstro("https://danielchicougr.github.io");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Footer;
  const logoUgr = "../assets/images/logo_ugr_negativo-300x84.png";
  const logoCEMED = "../assets/images/logo_centro_mediterraneo-300x102.png";
  const logoCiencias = "../assets/images/logo_facultad_ciencias_negativo-300x255.png";
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="column logos" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$ImageComponent, { "src": logoUgr, "alt": "Logo de la Universidad de Granada", "width": 125, "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$ImageComponent, { "src": logoCEMED, "alt": "Logo de la Universidad de Granada", "width": 125, "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$ImageComponent, { "src": logoCiencias, "alt": "Logo de la Universidad de Granada", "width": 125, "data-astro-cid-sz7xmlte": true })} </div> <div class="column" data-astro-cid-sz7xmlte> <h3 data-astro-cid-sz7xmlte>Dónde encontrarnos</h3> <p data-astro-cid-sz7xmlte>Facultad de Ciencias de la Universidad de Granada</p> ${renderComponent($$result, "LinksWithIcon", $$LinkWithIcon, { "iconPath": "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z", "viewBox": "0 0 384 512", "url": "https://goo.gl/maps/K6eZqdto1TER6eeA8", "linkText": "Avenida de Fuentenueva s/n. CP 18071, Granada.", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "LinksWithIcon", $$LinkWithIcon, { "iconPath": "M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z", "viewBox": "0 0 512 512", "url": "mailto:interciencias@ugr.es", "linkText": "interciencias@ugr.es", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "LinksWithIcon", $$LinkWithIcon, { "iconPath": "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z", "viewBox": "0 0 512 512", "url": "tel:+34958246301", "linkText": "958 24 63 01", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "LinksWithIcon", $$LinkWithIcon, { "iconPath": "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z", "viewBox": "0 0 448 512", "url": "https://www.instagram.com/interciencias_ugr/", "linkText": "interciencias_ugr", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "LinksWithIcon", $$LinkWithIcon, { "iconPath": "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z", "viewBox": "0 0 512 512", "url": "https://x.com/intercienciasGR", "linkText": "intercienciasGR", "data-astro-cid-sz7xmlte": true })} </div> <div class="column" data-astro-cid-sz7xmlte> <h3 data-astro-cid-sz7xmlte>Enlaces de interés</h3> ${renderComponent($$result, "Link", $$LinkFooter, { "url": "", "linkText": "Contacto", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Link", $$LinkFooter, { "url": "", "linkText": "Universidad de Granada", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Link", $$LinkFooter, { "url": "", "linkText": "Facultad de Ciencias", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Link", $$LinkFooter, { "url": "", "linkText": "Centro Mediterraneo", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Link", $$LinkFooter, { "url": "", "linkText": "Proyectos Interdisciplinares CEMED", "data-astro-cid-sz7xmlte": true })} </div> </footer> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/Footer.astro", void 0);

const SITE_TITLE = "Astro Blog";
const SITE_DESCRIPTION = "Welcome to my website!";
const SCRIPT = process.env.npm_lifecycle_script || "";
SCRIPT.includes("astro build");

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/demo_page/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://danielchicougr.github.io", "ASSETS_PREFIX": undefined}, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('./first-post_JpCnPXd0.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('./markdown-style-guide_CzHPV0Wj.mjs'),"/src/content/blog/second-post.md": () => import('./second-post_CKsJHnSQ.mjs'),"/src/content/blog/third-post.md": () => import('./third-post_BZL6s70d.mjs'),"/src/content/blog/using-mdx.mdx": () => import('./using-mdx_L-lwAUK9.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"first-post":"/src/content/blog/first-post.md","markdown-style-guide":"/src/content/blog/markdown-style-guide.md","second-post":"/src/content/blog/second-post.md","third-post":"/src/content/blog/third-post.md","using-mdx":"/src/content/blog/using-mdx.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('./first-post_ZEz8I9qh.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('./markdown-style-guide_BopU3nM5.mjs'),"/src/content/blog/second-post.md": () => import('./second-post_DlR8m7VL.mjs'),"/src/content/blog/third-post.md": () => import('./third-post_nKddFNIV.mjs'),"/src/content/blog/using-mdx.mdx": () => import('./using-mdx_CAX_gthZ.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$9 = createAstro("https://danielchicougr.github.io");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/FormattedDate.astro", void 0);

const $$Astro$8 = createAstro("https://danielchicougr.github.io");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> <!-- <Header /> --> <main data-astro-cid-5tznm7mj> <section data-astro-cid-5tznm7mj> <ul data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li data-astro-cid-5tznm7mj> <a${addAttribute(`${post.slug}/`, "href")} data-astro-cid-5tznm7mj> <img${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(post.data.heroImage, "src")} alt="" data-astro-cid-5tznm7mj> <h4 class="title" data-astro-cid-5tznm7mj>${post.data.title}</h4> <p class="date" data-astro-cid-5tznm7mj> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "data-astro-cid-5tznm7mj": true })} </p> </a> </li>`)} </ul> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/pages/blog/index.astro", void 0);

const $$file$3 = "/home/daniel/Proyectos/practicas/demo-pag/src/pages/blog/index.astro";
const $$url$3 = "/demo_page/blog/";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro("https://danielchicougr.github.io");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  await post.render();
  return renderTemplate`<!-- <BlogPost {...post.data}> --><!-- <Content /> --><!-- </BlogPost> -->`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/pages/blog/[...slug].astro", void 0);

const $$file$2 = "/home/daniel/Proyectos/practicas/demo-pag/src/pages/blog/[...slug].astro";
const $$url$2 = "/demo_page/blog/[...slug]/";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file$2,
  getStaticPaths,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro("https://danielchicougr.github.io");
const $$NavComponent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$NavComponent;
  const menuItem = [
    {
      title: "Inicio",
      path: "/"
    },
    {
      title: "Nuestros Proyectos",
      path: "javascript:void(0)",
      children: [
        {
          title: "Proyecto 1",
          path: "/proyecto-1",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 2",
          path: "/proyecto-2",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 3",
          path: "/proyecto-3",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 4",
          path: "/proyecto-4",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 5",
          path: "/proyecto-5",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 6",
          path: "/proyecto-6",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        },
        {
          title: "Proyecto 7",
          path: "/proyecto-7",
          children: [
            { title: "Submenu1", path: "/submenu1" },
            { title: "Submenu2", path: "/submenu2" }
          ]
        }
      ]
    },
    {
      title: "\xBFQui\xE9nes somos?",
      path: "/quienes-somos/"
    },
    {
      title: "\xBFQu\xE9 hacemos?",
      path: "/que-hacemos/"
    },
    {
      title: "Difusi\xF3n",
      path: "/difusion/"
    },
    {
      title: "Contacto",
      path: "/contacto/"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="header" data-astro-cid-cuyjwqo6> <ul class="nav" data-astro-cid-cuyjwqo6> ${menuItem.map((item) => renderTemplate`<li data-astro-cid-cuyjwqo6> <a${addAttribute(item.path, "href")} data-astro-cid-cuyjwqo6>${item.title} </a> ${item.children && renderTemplate`<ul data-astro-cid-cuyjwqo6> ${item.children.map((subitem) => renderTemplate`<li data-astro-cid-cuyjwqo6> <a${addAttribute(subitem.path, "href")} data-astro-cid-cuyjwqo6>${subitem.title}</a> ${subitem.children && renderTemplate`<ul data-astro-cid-cuyjwqo6> ${subitem.children.map((subsubitem) => renderTemplate`<li data-astro-cid-cuyjwqo6> <a${addAttribute(subsubitem.path, "href")} data-astro-cid-cuyjwqo6>${subsubitem.title}</a> </li>`)} </ul>`} </li>`)} </ul>`} </li>`)} </ul> </header> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/NavComponent.astro", void 0);

const $$Astro$5 = createAstro("https://danielchicougr.github.io");
const $$PagesLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PagesLayout;
  const { title, description, imagePath, altText } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-2qeifwgs> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-2qeifwgs": true })}${renderHead()}</head> <body data-astro-cid-2qeifwgs> ${renderComponent($$result, "NavComponent", $$NavComponent, { "class": "nav-component", "data-astro-cid-2qeifwgs": true })} <main data-astro-cid-2qeifwgs> <section class="header-section" data-astro-cid-2qeifwgs> <div class="header-container" data-astro-cid-2qeifwgs> <div class="image_filter" data-astro-cid-2qeifwgs> ${renderComponent($$result, "Image", $$ImageComponent, { "src": imagePath, "alt": altText, "class": "background-image", "data-astro-cid-2qeifwgs": true })} </div> <div class="header-text" data-astro-cid-2qeifwgs> ${renderSlot($$result, $$slots["top"])} </div> </div> </section> <section class="content-section" data-astro-cid-2qeifwgs> ${renderSlot($$result, $$slots["default"])} </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-2qeifwgs": true })}  </body> </html>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/layouts/PagesLayout.astro", void 0);

const $$Astro$4 = createAstro("https://danielchicougr.github.io");
const $$QueHacemos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$QueHacemos;
  return renderTemplate`${renderComponent($$result, "Layout", $$PagesLayout, { "title": "About Us", "imagePath": "../assets/images/home_main.jpg", "altText": "" }, { "default": ($$result2) => renderTemplate` 
¿En Qué Consisten Los Proyectos Interdisciplinares?
${maybeRenderHead()}<p class="width">
Vivimos en una era en la que se compagina la especialización con la interdisciplinariedad. Cada
    día surgen nuevas demandas de la sociedad que crean nuevas carreras profesionales y nuevos
    retos, que requieren conocimientos de áreas muy diversas.
<br>
Con este curso pretendemos poner en práctica la especialización y la interdisciplinariedad,
    romper con la estructura encorsetada de asignaturas y grados y construir un espacio de encuentro
    entre alumnado y profesorado de ciencias para el desarrollo de proyectos concretos, mediante
    dinámicas participativas interdisciplinarias. Exactamente se plantearán siete proyectos
    originados en bioquímica, biología, física y óptica que serán realizados por grupos de seis
    estudiantes de distintas titulaciones con la tutorización de profesorado especialista. La
    heterogeneidad de los grupos de trabajo favorecerá la colaboración entre alumnado de distintos
    grados de ciencias.
<br>
Estas dinámicas de estudio distintas permitirán al alumnado:
<br>
Apreciar la necesidad de aprender un  lenguaje común entre las distintas áreas de conocimiento involucradas en el proyecto que deberán desarrollar.
<br>
Aprender a reconocer la disciplina en la que se está formando (bioquímica, biología,
  física, óptica, matemáticas, …) como una de las partes necesarias para el buen desarrollo del
  proyecto del que forma parte.
<br>
Aprender a trabajar de forma colaborativa en equipos interdisciplinarios.
<br>
Aprender a desarrollar, redactar y presentar un proyecto interdisciplinario.
<br>
Finalmente, este curso ayudará también a:
<br>
Iniciar colaboraciones entre las distintas áreas de
  conocimiento en la Facultad de Ciencias. Desarrollar dinámicas de estudio diferentes que tratan de
  reducir la brecha de género en las carreras STEM.
</p> `, "top": ($$result2) => renderTemplate`<h1 class="text-center">Qué hacemos</h1>` })}`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/pages/que-hacemos.astro", void 0);

const $$file$1 = "/home/daniel/Proyectos/practicas/demo-pag/src/pages/que-hacemos.astro";
const $$url$1 = "/demo_page/que-hacemos/";

const queHacemos = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QueHacemos,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://danielchicougr.github.io");
const $$TarjetaExperimento = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TarjetaExperimento;
  const { url, imagePath, titulo, descripcion } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card" data-astro-cid-eg5azgsa> <a href="/" data-astro-cid-eg5azgsa> ${renderComponent($$result, "Image", $$ImageComponent, { "src": imagePath, "alt": titulo, "data-astro-cid-eg5azgsa": true })} <h4 data-astro-cid-eg5azgsa>${titulo}</h4> <p data-astro-cid-eg5azgsa>${descripcion}</p> </a> </div> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/TarjetaExperimento.astro", void 0);

const $$Astro$2 = createAstro("https://danielchicougr.github.io");
const $$TarjetaProfesoresVertical = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TarjetaProfesoresVertical;
  const { nombre, imagePath, titulo, accion } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card" data-astro-cid-fses6jzl> ${renderComponent($$result, "Image", $$ImageComponent, { "src": imagePath, "alt": titulo, "class": "icon", "data-astro-cid-fses6jzl": true })} <h5 data-astro-cid-fses6jzl>${nombre}</h5> <p class="cap" data-astro-cid-fses6jzl>${accion}</p> <h6 class="cap" data-astro-cid-fses6jzl>${titulo}</h6> </div> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/TarjetaProfesoresVertical.astro", void 0);

const $$Astro$1 = createAstro("https://danielchicougr.github.io");
const $$ColumnasNombres = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ColumnasNombres;
  const { listado } = Astro2.props;
  const nombres = listado.split(",");
  return renderTemplate`${maybeRenderHead()}<ul class="two-columns" data-astro-cid-a2t27f7g> ${nombres.map((item) => renderTemplate`<li data-astro-cid-a2t27f7g>${item}</li>`)} </ul> `;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/components/ColumnasNombres.astro", void 0);

const $$Astro = createAstro("https://danielchicougr.github.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="es" data-astro-cid-j7pv25f6> ${renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Interciencias Home Page", "imagePath": "../assets/images/home_main.jpg", "altText": "", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h2 data-astro-cid-j7pv25f6>Descripción general</h2><p class="width" data-astro-cid-j7pv25f6>
Vivimos en una era en la que se compagina la especialización con la interdisciplinariedad.
      Cada día surgen nuevas demandas de la sociedad que crean nuevas carreras profesionales y
      nuevos retos, que requieren conocimientos de áreas muy diversas. Con este curso pretendemos
      poner en práctica la especialización y la interdisciplinariedad, romper con la estructura
      encorsetada de asignaturas y grados y construir un espacio de encuentro entre alumnado y
      profesorado de ciencias para el desarrollo de proyectos concretos, mediante dinámicas
      participativas interdisciplinarias.
</p><div class="grid" data-astro-cid-j7pv25f6>${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "ASIMOV. Aula de simulaci\xF3n y modelado virtual de procesos bio-moleculares", "descripcion": "El alumnado deber\xE1 documentar un sistema biol\xF3gico y plantear de forma conjunta una estrategia para abordar la definici\xF3n del modelo en t\xE9rminos de sistemas de ecuaciones diferenciales, el desarrollo de una aplicaci\xF3n inform\xE1tica de simulaci\xF3n del sistema propuesto, la definici\xF3n de una estrategia de ajuste de par\xE1metros, y an\xE1lisis de los resultados obtenidos.", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Estudio de part\xEDculas atmosf\xE9ricas a partir de su interacci\xF3n con un l\xE1ser multicolor", "descripcion": "Con este proyecto se pretende caracterizar las secciones eficaces de extinci\xF3n y de dispersi\xF3n de radiaci\xF3n por part\xEDculas individuales de aerosol de distintos tipos. Tambi\xE9n evaluar de forma precisa a partir de estos par\xE1metros las propiedades \xF3pticas y microf\xEDsicas del aerosol y su implicaci\xF3n en el cambio clim\xE1tico.", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Diferencias en la respiraci\xF3n de un suelo agr\xEDcola seg\xFAn el tipo de uso del suelo", "descripcion": "El objetivo fundamental de este proyecto consiste en estudiar el efecto que distintos tipos de sustrato tiene sobre la respiraci\xF3n de la comunidad heter\xF3trofa que habita en un suelo agr\xEDcola.", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Nanosuperficies. El mundo a escala molecular", "descripcion": "Consiste en realizar una descripci\xF3n anal\xEDtica de las superficies moleculares, establecida a partir de los datos obtenidos en la bibliograf\xEDa fundamental proporcionada. As\xED como su aplicaci\xF3n directa sobre estructuras macromoleculares, mediante el uso de ficheros de estructura tipo PDB (Protein Data Bank).", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Construcci\xF3n de un ojo artificial", "descripcion": "Consiste en la elaboraci\xF3n y montaje de un ojo artificial capaz de conseguir la proyecci\xF3n de im\xE1genes n\xEDtidas y de calidad. De manera general, se busca poner en juego de manera complementaria los conocimientos de trazado de rayos, propiedades f\xEDsicas y qu\xEDmicas de los materiales y conocer y manejar los factores que limitan la calidad de la imagen retiniana.", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Conduciendo la luz natural para el desarrollo de vegetaci\xF3n subterr\xE1nea", "descripcion": "Construcci\xF3n de un dispositivo capaz la mayor cantidad de luz natural favorable al desarrollo de algunas plantas, introducirla y distribuirla en el dispositivo, siendo \xE9ste un simulador de \u201Cespacio subterr\xE1neo\u201D (carente de luz).", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaExperimento", $$TarjetaExperimento, { "url": "/", "titulo": "Entre la f\xEDsica y la biolog\xEDa: el papel del polen en la formaci\xF3n de nubes y el clima", "descripcion": "En este proyecto el objetivo es determinar la capacidad de activaci\xF3n como n\xFAcleo de condensaci\xF3n de nube de diferentes tipos pol\xEDnicos caracter\xEDsticos del clima Mediterr\xE1neo.", "imagePath": "../assets/images/atoms-molecule-chemistry.jpg", "data-astro-cid-j7pv25f6": true })}</div><h2 data-astro-cid-j7pv25f6>Personal encargado</h2><p class="width" style="text-align:center" data-astro-cid-j7pv25f6>
El equipo está compuesto por profesorado y alumnado de los distintos grados impartidos en la
      facutad de ciencias.
</p><h4 data-astro-cid-j7pv25f6>Dirección y coordinación</h4><div class="grid2" data-astro-cid-j7pv25f6>${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Mar\xEDa Jos\xE9 C\xE1ceres Granados", "titulo": "profesora titular de Universidad, Departamento de matem\xE1tica aplicada", "accion": "Direcci\xF3n", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Paloma Cari\xF1anos Gonz\xE1lez", "titulo": "PROFESORA TITULAR DE UNIVERSIDAD, DEPARTAMENTO DE BOT\xC1NICA", "accion": "Coordinadora de biolog\xEDa", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Fernando Reyes Zurita", "titulo": "PROFESOR TITULAR DE UNIVERSIDAD, DEPARTAMENTO DE BIOQU\xCDMICA Y BIOLOG\xCDA MOLECULAR I", "accion": "COORDINADOR DE BIOQU\xCDMICA", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Mar\xEDa Jos\xE9 Granados Mu\xF1oz", "titulo": "Profesora contratada, Departamento de f\xEDsica aplicada", "accion": "Coordinadora de F\xEDsica", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Pilar Granados Delgado", "titulo": "Profesora sustituta interina, departamento de \xF3ptica", "accion": "Coordinadora de \xF3ptica", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "TarjetaProfesores", $$TarjetaProfesoresVertical, { "nombre": "Lidia Fern\xE1ndez Rodr\xEDguez", "titulo": "PROFESORA TITULAR DE UNIVERSIDAD, DEPARTAMENTO DE MATEM\xC1TICA APLICADA", "accion": "COORDINADORA DE MATEM\xC1TICAS", "imagePath": "../assets/images/MJCaceres-150x130.jpeg", "data-astro-cid-j7pv25f6": true })}</div><h4 style="margin-top:15px" data-astro-cid-j7pv25f6>Profesorado encargado de los experimentos</h4>${renderComponent($$result2, "Columnas", $$ColumnasNombres, { "listado": "Fabi\xE1n Casas Arenas,Pen\xE9lope Serrano Ortiz,Margarita Arias L\xF3pez,Nuria Rico Castro,Juan Campos Rodr\xEDguez,Ana Romero Freire,Hilario Ram\xEDrez Rodrigo,Fernando Reyes Zurita,Juan Sainz P\xE9rez,Mar\xEDa Jos\xE9 S\xE1ez Lara,Lidia Fern\xE1ndez Rodr\xEDguez,Aureliano M. Robles P\xE9rez,Mar\xEDa Jos\xE9 Granados Mu\xF1oz,Antonio Valenzuela Guti\xE9rrez,Mar\xEDa J. C\xE1ceres Granados,Ana Bel\xE9n L\xF3pez Baldomero,Paloma Cari\xF1anos Gonz\xE1lez,Gloria Titos Vela,Pilar Granados Delgado,Mar\xEDa de la Natividad Tejada Casado,Francesco Martino,Elena Bazo Gonz\xE1lez", "data-astro-cid-j7pv25f6": true })}<h4 style="margin-top:15px" data-astro-cid-j7pv25f6>Estudiantes Curso 2022-2023</h4>${renderComponent($$result2, "Columnas", $$ColumnasNombres, { "listado": "Inmaculada Agredano Espinal (Grado en Estad\xEDstica),Jorge Luis Jim\xE9nez da Silva (Grado en F\xEDsica),Jes\xFAs Mu\xF1oz Jim\xE9nez (Grado en \xD3ptica y Optometr\xEDa),Francisco Luis Navarro Mart\xEDnez (Grado en Estad\xEDstica),Jos\xE9 Antonio De La Rosa Cubero (Doble Grado en Ingenier\xEDa Inform\xE1tica y Matem\xE1ticas),Dolores Esteve D\xEDaz (Doble Grado en F\xEDsica y Matem\xE1ticas),Adrian Moreno Sanchez (Doble Grado en F\xEDsica y Matem\xE1ticas),Gabriel S\xE1nchez Mu\xF1oz (Doble Grado en Ingenier\xEDa Inform\xE1tica y Matem\xE1ticas),Higinio Paterna Ortiz (Doble Grado en Ingenier\xEDa Inform\xE1tica y Matem\xE1ticas),Nicol\xE1s Postigo L\xF3pez (Grado en Biolog\xEDa),\xC1lvaro Rodr\xEDguez Gallardo (Doble Grado en Ingenier\xEDa Inform\xE1tica y Matem\xE1ticas),Fco. Ismael Rom\xE1n Moreno (Licenciatura en Biolog\xEDa),Pablo V\xE1zquez Dom\xEDnguez Dom\xEDnguez (Grado en Biotecnolog\xEDa),Jorge Buenestado Dom\xEDnguez (Grado en F\xEDsica),Roc\xEDo Cadenas Pacheco (Grado en Ciencias Ambientales),Luc\xEDa Garc\xEDa Fern\xE1ndez-Santaella (Grado en \xD3ptica y Optometr\xEDa),Daniel Rodr\xEDguez Aguilar (Grado en Matem\xE1ticas),Miguel Rold\xE1n Rosales (Grado en Matem\xE1ticas),Gin\xE9s Santiago Gras Alix (Grado en Ciencias Ambientales),Iv\xE1n Donaire Pav\xF3n (Grado en \xD3ptica y Optometr\xEDa),Paloma Gil Franco (Grado en Matem\xE1ticas),Sabrin Milud Chanboun (Grado en \xD3ptica y Optometr\xEDa),Juan Lucas P\xE9rez Cervantes (Grado en F\xEDsica),F\xE1tima Esperanza Rodr\xEDguez Farfach (Grado en \xD3ptica y Optometr\xEDa),Mar\xEDa Victoria Bign\xFA (Grado en Biolog\xEDa),Josep Marti Puig (Grado en Biolog\xEDa),Juan Manuel Montes L\xF3pez (M\xE1ster FisyMat),\xC1lvaro Pel\xE1ez P\xE9rez (Grado en Biolog\xEDa),Marina Tello Madue\xF1o (Grado en Biolog\xEDa),Martina Riera Ojea (Grado en Matem\xE1ticas),Carmen Plata Fern\xE1ndez (Grado en Estad\xEDstica),Elena Beltr\xE1n Gallego (Grado en Biolog\xEDa),Javier Cabezas Berrido (Grado en Biolog\xEDa),Mar\xEDa Jos\xE9 P\xE9rez Mart\xEDn (Grado en Ciencias Ambientales),V\xEDctor Ram\xEDrez S\xE1ez (Grado en Estad\xEDstica),Alberto Aguilar Romero (Grado en Matem\xE1ticas)", "data-astro-cid-j7pv25f6": true })}<h4 style="margin-top:15px" data-astro-cid-j7pv25f6>Estudiantes Curso 2023-2024</h4>${renderComponent($$result2, "Columnas", $$ColumnasNombres, { "listado": "Ariadna Herruzo Estrada,Miguel \xC1ngel Jim\xE9nez L\xF3pez,Pablo Orellana Chornyak,Marc Planells Pelegr\xEDn,Mar\xEDa del Carmen Ram\xEDrez Trujillo,Taisiia Steiukha Romanova,Miguel Cuberos Mu\xF1oz,Lorena G\xF3mez G\xF3mez,V\xEDctor Gonz\xE1lez Garc\xEDa,Elena Torres Fern\xE1ndez,Alba Torres G\xF3mez,Cloe Biedma L\xF3pez,\xC1ngela Hidalgo Valverde,Jorge Rueda de Gracia,Fernando Cordero Mart\xEDn,Alba D\xEDez Santos,Jin Chengyu,Jos\xE9 Manuel Montes Armenteros,Elena Rios Martin,Esther Torralba Delgado,Jos\xE9 Luis Aguilera L\xF3pez,Oskar Borgvall Gonz\xE1lez,Lola Castell\xF3n Ruiz,Jes\xFAs Garc\xEDa Sanchez,Claudia Gonz\xE1lez Arnaiz,Daniel S\xE1nchez Correa,David Aguilar Zafra,Mar\xEDa Roc\xEDo Casas Aranda,Erika Hristov Palma,\xC1gueda Mar\xEDa Zamora Arisp\xF3n,Adri\xE1n Carballo Carballo,Alhambra Espigares Garc\xEDa,Luc\xEDa L\xF3pez Gonz\xE1lez,Pilar P\xE9rez Abell\xE1n,Luc\xEDa S\xE1nchez Plata", "data-astro-cid-j7pv25f6": true })}<h1 style="font-weight: bold; margin-top:1em;" data-astro-cid-j7pv25f6>Únete</h1><p data-astro-cid-j7pv25f6>Si deseas participar en alguno de nuestros proyectos futuros, no dudes en contactarnos</p><h4 data-astro-cid-j7pv25f6>Unete a unos de nuestros proyectos</h4><h6 data-astro-cid-j7pv25f6>contacto:</h6><a href="mailto:interciencias@ugr.es" style="font-weight:bold" data-astro-cid-j7pv25f6><h4 data-astro-cid-j7pv25f6>interciencias@ugr.es</h4></a><div class="social-icon-grid" data-astro-cid-j7pv25f6><a href="https://www.twitter.com/intercienciasGR" target="_blank" class="social-icon twitter" data-astro-cid-j7pv25f6><svg class="svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="25" height="25" data-astro-cid-j7pv25f6><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" data-astro-cid-j7pv25f6></path></svg></a><a href="https://www.instagram.com/interciencias_ugr/" target="_blank" class="social-icon instagram" data-astro-cid-j7pv25f6><svg class="svg" viewBox="0 0 450 512" xmlns="http://www.w3.org/2000/svg" width="25" height="25" data-astro-cid-j7pv25f6><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" data-astro-cid-j7pv25f6></path></svg></a></div>`, "top": ($$result2) => renderTemplate`<div class="top-element width" data-astro-cid-j7pv25f6><h1 data-astro-cid-j7pv25f6>Proyectos interdisciplinares en ciencias</h1><p class="text-style" style="color: white;" data-astro-cid-j7pv25f6>
Esta es una página en la que se muestra el trabajo realizado en el Proyecto de Innovación y
        Buenas Prácticas Docentes Avanzados/Coordinados 2022-2024 con referencia nº22-08. Este
        proyecto se lleva a cabo con el alumnado matriculado en los cursos del Centro Mediterráneo
</p><a style="font-size:80%; text-decoration: underline;" class="links" href="https://cemed.ugr.es/curso/22gr55/" data-astro-cid-j7pv25f6>Desarrollo de proyectos Interdisciplinares en Ciencias (2022-2023)</a><a style="font-size:80%; text-decoration: underline;" class="links" href="https://cemed.ugr.es/curso/23gr48/" data-astro-cid-j7pv25f6>Desarrollo de proyectos Interdisciplinares en Ciencias (II ed.) (2023-2024)</a></div>` })}</html>`;
}, "/home/daniel/Proyectos/practicas/demo-pag/src/pages/index.astro", void 0);

const $$file = "/home/daniel/Proyectos/practicas/demo-pag/src/pages/index.astro";
const $$url = "/demo_page/";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, ____slug_ as _, index as a, index$1 as i, queHacemos as q };
