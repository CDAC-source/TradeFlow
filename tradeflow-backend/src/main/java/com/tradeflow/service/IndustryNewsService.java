package com.tradeflow.service;

import com.tradeflow.dto.IndustryNewsDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndustryNewsService {

    public List<IndustryNewsDto> fetchNews() {

        return List.of(
            new IndustryNewsDto(
                "Heidelberg introduces AI-powered offset press",
                "https://www.heidelberg.com",
                "Heidelberg",
                "2026-01-28"
            ),
            new IndustryNewsDto(
                "Komori focuses on sustainable printing solutions",
                "https://www.komori.com",
                "Komori",
                "2026-01-26"
            ),
            new IndustryNewsDto(
                "Digital printing demand grows in packaging sector",
                "https://www.printweek.com",
                "PrintWeek",
                "2026-01-25"
            ),
            new IndustryNewsDto(
                "Predictive maintenance reduces machine downtime",
                "https://www.industryeurope.com",
                "Industry Europe",
                "2026-01-24"
            )
        );
    }
}
