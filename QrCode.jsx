import "./qrcode.css";
import {useState} from "react";

function QrCode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setqrData] = useState("");
  const [qrsize, setqrSize] = useState("");
  const [error, setError] = useState("");

  async function generateQRCode() {
    if (!qrData) {
      setError("Please Enter the data for QR code!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(
        qrData
      )}`;

      setImg(url);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function qrDownloader() {
    if (!img) {
      setError("Please generate a QR code first!");
      return;
    }

    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(img);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRCode.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        setError("Error downloading QR code.");
      });
  }

  return (
    <div className="app-container">
      <h1>QR Code Generator</h1>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Please wait...</p>}

      {img && <img src={img} alt="QR Code" className="qr-img qr-border" />}

      <div>
        <label htmlFor="data-input" className="input-label">
          Data for QR code
        </label>
        <input
          type="text"
          value={qrData}
          placeholder="Enter data for QR Code"
          id="data-input"
          onChange={(e) => setqrData(e.target.value)}
        />
        <label htmlFor="size-input" className="input-label">
          Image Size (e.g., 150):
        </label>
        <input
          type="text"
          id="size-input"
          placeholder="Enter Image size"
          value={qrsize}
          onChange={(e) => setqrSize(e.target.value)}
        />
        <button className="generate-button" disabled={loading} onClick={generateQRCode}>
          Generate QR Code
        </button>
        <button className="download-button" onClick={qrDownloader}>
          Download QR Code
        </button>
      </div>

      <p>
        Designed By <a href="https://vijayasuriyan.netlify.app/">Vijaya Suriyan V</a>
      </p>
      {/* <p>
        <a href="https://github.com/VijayasuriyanV/QRCodeGenerator/">Source Code</a>
      </p> */}
    </div>
  );
}

export default QrCode;
