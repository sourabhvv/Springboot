# PDF, Document, and CSV Reader

This project is a web application that allows users to upload PDF, DOCX, or CSV files and view their contents. It consists of a React frontend and a Spring Boot backend.
![File Upload](/Screenshot 2024-07-07 at 18-00-34 Spring react.png)
## Features

- File upload for PDF, DOCX, and CSV formats
- Display of file contents with syntax highlighting
- Cross-Origin Resource Sharing (CORS) enabled

## Technologies Used

### Frontend
- React
- react-syntax-highlighter for code highlighting

### Backend
- Spring Boot
- Apache PDFBox for PDF processing

## Setup and Installation

### Backend (Spring Boot)

1. Ensure you have Java JDK 11 or later installed.
2. Navigate to the backend directory.
3. Run `./mvnw spring-boot:run` to start the Spring Boot application.

The backend will start on `http://localhost:8080`.

### Frontend (React)

1. Ensure you have Node.js and npm installed.
2. Navigate to the frontend directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

The frontend will start on `http://localhost:3000`.

## Usage

1. Open the application in your web browser.
2. Click on the file input to select a PDF, DOCX, or CSV file.
3. Click the "Upload File" button to process the file.
4. The contents of the file will be displayed with syntax highlighting.

## API Endpoints

- `POST /upload/{type}`: Uploads and processes a file. `{type}` can be 'pdf', 'docx', or 'csv'.

## Dependencies

### Backend
- Spring Boot Starter Web
- Apache PDFBox

### Frontend
- React
- react-syntax-highlighter

## Known Limitations

- DOCX processing is not currently implemented.
- Large files may take some time to process and display.

## Future Improvements

- Implement DOCX processing
- Add pagination for large files
- Improve error handling and user feedback
- Add unit and integration tests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
