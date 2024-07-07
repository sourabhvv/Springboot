package com.example.demo.service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.io.IOException;
import java.io.InputStream;


public class PdfService implements DocumentInterface {
	public String print(InputStream inputStream) {
		
		try {
            PDDocument document = PDDocument.load(inputStream);
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            return text;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing PDF: " + e.getMessage();
        }
	}
	
	public String write() {
		return "Writing pdf...";
	}
	
	public String show() {
		return "show pdf...";
	}
}
