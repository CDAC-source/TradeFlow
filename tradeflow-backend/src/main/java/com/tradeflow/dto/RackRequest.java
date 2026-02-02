package com.tradeflow.dto;

import lombok.Data;

@Data
public class RackRequest {
    private Integer rackRow;
    private Integer rackCol;
	public Integer getRackRow() {
		return rackRow;
	}
	public void setRackRow(Integer rackRow) {
		this.rackRow = rackRow;
	}
	public Integer getRackCol() {
		return rackCol;
	}
	public void setRackCol(Integer rackCol) {
		this.rackCol = rackCol;
	}
    
    
}
