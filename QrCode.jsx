import "./qrcode.css";
import {useState} from "react";

function QrCode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setqrData] = useState("");
  const [qrsize, setqrSize] = useState("");

  async function generateQRCode() {
    setLoading(true); //set loading to true while loading the p tag have to visible
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating in QR", error);
    } finally {
      setLoading(false);
    }
  }

  function qrDownloader() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRCode.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading QR", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR Code Gererator</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="QR Code" className="qr-img" />}
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
          Image Size (e.g.. 150):
        </label>
        <input
          type="text"
          id="data-input"
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
    </div>
  );
}

export default QrCode;
