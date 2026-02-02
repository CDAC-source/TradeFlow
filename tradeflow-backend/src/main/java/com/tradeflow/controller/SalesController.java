package com.tradeflow.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tradeflow.entity.Invoice;
import com.tradeflow.repository.InvoiceRepository;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SalesController {

    @Autowired
    private InvoiceRepository invoiceRepo;

    // =========================
    // KPI OVERVIEW
    // =========================
    @GetMapping("/overview")
    public Map<String, Object> overview() {

        double totalRevenue = invoiceRepo.getTotalRevenue();
        long totalOrders = invoiceRepo.getTotalPaidOrders();
        String topProduct = invoiceRepo.getTopProduct();

        return Map.of(
            "totalRevenue", totalRevenue,
            "totalOrders", totalOrders,
            "topProduct", topProduct
        );
    }

    // =========================
    // CUSTOMER SALES TABLE
    // =========================
    @GetMapping("/customers")
    public List<Map<String, Object>> customers() {

        List<Invoice> invoices =
            invoiceRepo.findAll().stream()
                .filter(i -> "PAID".equals(i.getPaymentStatus()))
                .toList();

        Map<Long, Map<String, Object>> map = new LinkedHashMap<>();

        for (Invoice inv : invoices) {
            Long cid = inv.getCustomer().getId();

            map.putIfAbsent(cid, new HashMap<>());
            Map<String, Object> row = map.get(cid);

            row.put("customer", inv.getCustomer().getName());

            // =========================
            // MACHINES
            // =========================
            row.putIfAbsent("machines", new HashSet<String>());
            Set<String> machines =
                (Set<String>) row.get("machines");

            // =========================
            // SPARE PARTS
            // =========================
            row.putIfAbsent("spareParts", new HashSet<String>());
            Set<String> spareParts =
                (Set<String>) row.get("spareParts");

            inv.getItems().forEach(item -> {
                if (item.getMachine() != null) {
                    machines.add(item.getMachine().getName());
                }
                if (item.getSparePart() != null) {
                    spareParts.add(item.getSparePart().getName());
                }
            });

            double spent =
                (double) row.getOrDefault("totalSpent", 0.0);

            row.put("totalSpent", spent + inv.getTotalAmount());
        }

        // convert sets → lists
        return map.values().stream().map(r -> {
            r.put("machines", new ArrayList<>((Set<?>) r.get("machines")));
            r.put("spareParts", new ArrayList<>((Set<?>) r.get("spareParts")));
            return r;
        }).toList();
    }
}
