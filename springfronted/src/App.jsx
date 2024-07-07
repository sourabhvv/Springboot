import { useState } from 'react'
import './App.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [fileContent, setFileContent] = useState("");
 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
   
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension === "pdf" || extension === "docx" || extension === "csv") {
        setUrl(extension);
      } else {
        setUrl("");
        alert('Please select a valid file format (PDF, DOCX, or CSV)!');
      }
    } else {
      setUrl("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }
    if (!url) {
      alert('Please select a valid file format!');
      return;
    }
   
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch(`http://localhost:8080/upload/${url}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const content = await response.text();
        setFileContent(content);
        alert('File uploaded and processed successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <>
      <h1>PDF + Document + CSV</h1>
      <h2>Reader</h2>
      <div className="card">
        <input type='file' onChange={handleFileChange} accept=".pdf,.docx,.csv" />
        <button onClick={handleUpload}>Upload File</button>
     
        <p>
          {selectedFile ? `Selected file: ${selectedFile.name}` : 'No file selected'}
        </p>
      </div>
      {fileContent && (
        <div className="content-display">
          <h3>File Content:</h3>
          <div style={{ height: '400px', width: '100%', overflow: 'auto' }}>
            <SyntaxHighlighter
              language="html"
              style={vscDarkPlus}
              className="rounded-md text-sm"
              customStyle={{
                margin: 0,
                padding: '1em',
                width: '100%',
              }}
            >
              {fileContent}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  )
}

export default App