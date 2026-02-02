package com.tradeflow.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Invoice invoice;

    @ManyToOne(optional = true)
    @JoinColumn(name = "machine_id", nullable = true)
    private Machine machine;

    @ManyToOne(optional = true)
    @JoinColumn(name = "spare_part_id", nullable = true)
    private SparePart sparePart;

    private double rate;
    private int quantity;
    private double amount;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Invoice getInvoice() {
		return invoice;
	}
	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}
	public Machine getMachine() {
		return machine;
	}
	public void setMachine(Machine machine) {
		this.machine = machine;
	}
	public SparePart getSparePart() {
		return sparePart;
	}
	public void setSparePart(SparePart sparePart) {
		this.sparePart = sparePart;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}

    
}
