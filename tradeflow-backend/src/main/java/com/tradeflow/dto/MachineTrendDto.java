package com.tradeflow.dto;

public class MachineTrendDto {

    private String month;
    private int count;

    public MachineTrendDto(String month, int count) {
        this.month = month;
        this.count = count;
    }

    public String getMonth() {
        return month;
    }

    public int getCount() {
        return count;
    }
}
