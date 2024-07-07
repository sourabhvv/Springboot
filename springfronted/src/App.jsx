import { useState } from 'react'
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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">PDF + Document + CSV</h1>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Reader</h2>
          
          <div className="mb-6">
            <input 
              type='file' 
              onChange={handleFileChange} 
              accept=".pdf,.docx,.csv"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
            <button 
              onClick={handleUpload}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Upload File
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            {selectedFile ? `Selected file: ${selectedFile.name}` : 'No file selected'}
          </p>
        </div>
      </div>

      {fileContent && (
        <div className="mt-8 mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">File Content:</h3>
          <div className="h-96 w-full overflow-auto bg-gray-800 rounded-lg shadow-lg">
            <SyntaxHighlighter
              language="html"
              style={vscDarkPlus}
              className="rounded-lg text-sm"
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
    </div>
  )
}

export default App