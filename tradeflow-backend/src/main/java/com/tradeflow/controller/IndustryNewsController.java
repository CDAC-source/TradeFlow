package com.tradeflow.controller;

import com.tradeflow.dto.IndustryNewsDto;
import com.tradeflow.service.IndustryNewsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/industry-news")
@CrossOrigin(origins = "http://localhost:5173")
public class IndustryNewsController {

    private final IndustryNewsService service;

    public IndustryNewsController(IndustryNewsService service) {
        this.service = service;
    }

    @GetMapping
    public List<IndustryNewsDto> getNews() {
        return service.fetchNews();
    }
}
