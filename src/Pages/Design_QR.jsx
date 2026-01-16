import { useContext, useRef, useState, useEffect } from "react"
import QrContext from "../context/QRcontext"
import { QRCodeSVG } from "qrcode.react";


const Design_QR = () => {
  const { qrValue, setQrValue } = useContext(QrContext);
  const [text, setText] = useState("");

  const generateQR = () => {
    if (!text.trim()) {
      return;
    }

    setQrValue(text);
  };

  const [design, setDesign] = useState({
    fgColor: "#000000",
    bgColor: "#ffffff",
    size: 256,
    level: "M",
  })

  const [logo, setLogo] = useState(null)
  const [imageSettings, setImageSettings] = useState(null)

  const qrRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (logo) {
      setDesign(d => ({ ...d, level: "H" }));
    }
  }, [logo]);


  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Logo too large (max 1MB)");
      return;
    }
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const logoUrl = e.target.result
        setLogo(logoUrl)
        setImageSettings({
          src: logoUrl,
          height: 60,
          width: 60,
          excavate: true
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg')
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      const border = 10;
      canvas.width = design.size + 2 * border
      canvas.height = design.size + 2 * border

      ctx.fillStyle = design.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, border, border)

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement('a')
      downloadLink.download = 'qr-code.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center lg:mt-5">
        <p className="text-2xl font-bold tracking-wide sm:text-4xl"> QR Code Designer</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-10 mt-5 pb-5">
        <div className="flex flex-col items-center gap-5">
          <div ref={qrRef} className="w-42 sm:w-52 lg:w-60 p-4 bg-white border-none rounded-md">
            {qrValue && (
              <QRCodeSVG
                value={qrValue}
                size={design.size}
                bgColor={design.bgColor}
                fgColor={design.fgColor}
                level={design.level}
                imageSettings={imageSettings}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%"
                }}
              />
            )}
          </div>
          <button className="bg-green-500 rounded-md w-40 cursor-pointer" onClick={downloadQR}>
            Download
          </button>
        </div>
        <div className="flex flex-col gap-3 lg:mt-5 w-[70vw] lg:max-w-lg">
          <div className="flex flex-col justify-center gap-2 rounded-lg p-2 bg-[#ffffffa7]">
            <label className="text-sm font-bold tracking-wider">QR Code Data :</label>
            <input type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text"
              className="border-none bg-[#fffffffe] pl-2 lg: rounded-md h-7"
            />
            <button className="bg-green-500 rounded-md" onClick={generateQR}>Update</button>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-lg py-2 px-4  bg-[#ffffffa7]">
            <label className="text-sm font-bold tracking-wider">Size: {design.size}px</label>
            <input type="range"
              min="200"
              max="500"
              value={design.size}
              onChange={(e) => setDesign({ ...design, size: parseInt(e.target.value) })}
              className="border-none bg-[#fffffffe] rounded-md h-7"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-lg py-2 px-4 bg-[#ffffffa7]">
            <label className="text-sm font-bold tracking-wider">Error Correction Level:</label>
            <select value={design.level}
              onChange={(e) => setDesign({ ...design, level: e.target.value })}
              className="p-2 mb-2 border-none rounded-md bg-white px-3 text-s"
            >
              <option value="L">Low ( 7% )</option>
              <option value="M">Medium ( 15% )</option>
              <option value="Q">Quartlite ( 25% )</option>
              <option value="H">High ( 30% )</option>
            </select>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-lg py-2 px-4 bg-[#ffffffa7]">
            <div className="flex justify-between items-center pr-4">
              <label className="text-sm font-bold tracking-wider">Foreground Color:</label>
              <input
                type="color"
                value={design.fgColor}
                onChange={(e) => setDesign({ ...design, fgColor: e.target.value })}
                className="w-[20%]"
              />
            </div>
            <div className="flex justify-between items-center pr-4">
              <label className="text-sm font-bold tracking-wider">Background Color:</label>
              <input
                type="color"
                value={design.bgColor}
                onChange={(e) => setDesign({ ...design, bgColor: e.target.value })}
                className="w-[20%]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-lg py-2 px-4 bg-[#ffffffa7]">
            <label className="text-sm font-bold tracking-wider">Logo:</label>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
            <div className="flex  justify-center gap-5">
              <button onClick={() => fileInputRef.current?.click()} className="bg-[#53c353e4] rounded-md w-40">
                {logo ? "Change Logo" : "Upload Logo"}
              </button>
              {logo && (
                <button onClick={() => { setLogo(null); setImageSettings(null) }} className="bg-[#53c353e4] rounded-md w-40">
                  Remove Logo
                </button>
              )}
            </div>
            {logo && (
              <div className="flex flex-col justify-center">
                <label className="text-sm font-bold tracking-wider">Logo Size: {imageSettings?.width}px</label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={imageSettings?.width || 60}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value)
                    setImageSettings({
                      ...imageSettings,
                      height: newSize,
                      width: newSize
                    })
                  }}
                  className="border-none bg-[#fffffffe] rounded-md h-7"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Design_QR