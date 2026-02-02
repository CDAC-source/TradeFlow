package com.tradeflow.service;

import com.tradeflow.dto.MachineTrendDto;
import com.tradeflow.repository.InvoiceItemRepository;
import com.tradeflow.repository.MachineRepository;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final MachineRepository machineRepo;
    private final InvoiceItemRepository invoiceItemRepo;

    public AnalyticsService(
            MachineRepository machineRepo,
            InvoiceItemRepository invoiceItemRepo
    ) {
        this.machineRepo = machineRepo;
        this.invoiceItemRepo = invoiceItemRepo;
    }

    /* ===============================
       MACHINE PURCHASE TREND (YEAR + MONTH)
    ================================ */
    public List<MachineTrendDto> machinePurchaseTrend() {

        return machineRepo.getMachinePurchaseTrendYearMonth()
                .stream()
                .map(row -> {
                    int year = ((Number) row[0]).intValue();
                    int monthNum = ((Number) row[1]).intValue();
                    int count = ((Number) row[2]).intValue();

                    String label = year + "-" + Month.of(monthNum).name();

                    return new MachineTrendDto(label, count);
                })
                .collect(Collectors.toList());
    }

    /* ===============================
       TOP SELLING MACHINES (REVENUE)
    ================================ */
    public List<Map<String, Object>> topMachinesByRevenue() {

        return invoiceItemRepo.getTopMachinesByRevenue()
                .stream()
                .map(row -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", row[0]);
                    map.put("revenue", row[1]);
                    return map;
                })
                .collect(Collectors.toList());
    }
}
