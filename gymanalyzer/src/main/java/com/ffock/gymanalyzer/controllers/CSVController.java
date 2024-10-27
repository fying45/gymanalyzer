package com.ffock.gymanalyzer.controllers;

import java.io.File;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ffock.gymanalyzer.services.CsvService;
import com.opencsv.exceptions.CsvException;

@RestController
@RequestMapping("/api/csv")
public class CSVController {

    private final CsvService csvService;

    public CSVController(CsvService csvService) {
        this.csvService = csvService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        try {
            String tempFilePath = System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename();
            file.transferTo(new File(tempFilePath));

            Integer savedLines = csvService.importCSV(tempFilePath);

            return ResponseEntity.ok("File uploaded and data saved successfully. " + savedLines + " lines saved");

        } catch (IOException | CsvException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing the file", e);
        }
    }

}
