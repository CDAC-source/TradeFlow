package com.tradeflow.controller;

import com.tradeflow.dto.MachineTrendDto;
import com.tradeflow.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // ✅ Monthly machine purchases
    @GetMapping("/machine-purchase-trend")
    public List<MachineTrendDto> machinePurchaseTrend() {
        return analyticsService.machinePurchaseTrend();
    }

    // ✅ Revenue-based top machines
    @GetMapping("/top-machines")
    public List<Map<String, Object>> topMachines() {
        return analyticsService.topMachinesByRevenue();
    }
}
