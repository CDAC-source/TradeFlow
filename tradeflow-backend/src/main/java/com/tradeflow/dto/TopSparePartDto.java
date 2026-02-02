package com.tradeflow.dto;

public class TopSparePartDto {
    private String name;
    private Long totalSold;

    public TopSparePartDto(String name, Long totalSold) {
        this.name = name;
        this.totalSold = totalSold;
    }

    public String getName() {
        return name;
    }

    public Long getTotalSold() {
        return totalSold;
    }
}
