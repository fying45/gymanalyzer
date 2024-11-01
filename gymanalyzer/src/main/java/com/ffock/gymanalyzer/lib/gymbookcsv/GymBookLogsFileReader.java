package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.io.BufferedReader;
import java.io.IOException;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

public class GymBookLogsFileReader {

    public GymBookLogsFile read(BufferedReader reader) throws IOException {
        CsvToBean<GymBookLogsRow> csvToBean = new CsvToBeanBuilder<GymBookLogsRow>(reader)
                .withType(GymBookLogsRow.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();

        return new GymBookLogsFile(csvToBean.parse());

    }
}
