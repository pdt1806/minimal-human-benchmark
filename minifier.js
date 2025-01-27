const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const filePath = path.join(__dirname, "index.html");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const minified = data
    .replace(/\s+/g, " ")
    .trim()
    .replaceAll("> <", "><")
    .replaceAll(" = ", "=")
    .replaceAll("; ", ";")
    .replaceAll('" ', '"')
    .replaceAll("> ", ">")
    .replaceAll(" =>", "=>")
    .replaceAll(", ", ",")
    .replaceAll(" {", "{")
    .replaceAll("{ ", "{")
    .replaceAll("} ", "}")
    .replaceAll(" }", "}")
    .replaceAll(": ", ":")
    .replaceAll(" * ", "*")
    .replaceAll(" + ", "+");
  const minifiedFilePath = path.join(__dirname, "index_minified.html");
  fs.writeFile(minifiedFilePath, minified, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
  });

  const dataUri = "data:text/html;base64," + Buffer.from(minified).toString("base64");

  QRCode.toFile(path.join(__dirname, "qrcode.png"), dataUri, (err) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return;
    }
  });
});
