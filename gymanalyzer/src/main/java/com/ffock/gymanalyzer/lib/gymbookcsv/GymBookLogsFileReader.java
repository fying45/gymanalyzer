package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

public class GymBookLogsFileReader {

    public GymBookLogsFile read(String filePath) throws IOException {
        try (Reader reader = new FileReader(filePath)) {
            CsvToBean<GymBookLogsRow> csvToBean = new CsvToBeanBuilder<GymBookLogsRow>(reader)
                    .withType(GymBookLogsRow.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            return new GymBookLogsFile(csvToBean.parse());
        }
    }
}
