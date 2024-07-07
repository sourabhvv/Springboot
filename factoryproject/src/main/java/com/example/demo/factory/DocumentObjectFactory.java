package com.example.demo.factory;

import com.example.demo.service.DocumentInterface;
import com.example.demo.service.PdfService;
import com.example.demo.service.WordService;

public class DocumentObjectFactory {

	
	
public static DocumentInterface	createObject(String type){
	
	if(type.equals("pdf")) {
		DocumentInterface di = new PdfService();
		return di;
	}
	
	if(type.equals("word")) {
		DocumentInterface di = new WordService();
		return di;
	}
	return null;
	
		
	}
}
