package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.factory.DocumentObjectFactory;
import com.example.demo.service.DocumentInterface;

import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

@RestController

@CrossOrigin(origins = "*")
public class DocumentController {

    @GetMapping("/print/{type}")
    public String printDocument(@PathVariable("type") String type) {
        DocumentInterface service = DocumentObjectFactory.createObject(type);
        return service.show();
    }
    
    @PostMapping("upload/{type}")
    public String uploadFile(@PathVariable("type") String type, @RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }
        
        DocumentInterface service = DocumentObjectFactory.createObject(type);
           
        return service.print(file.getInputStream());
    }

   
}