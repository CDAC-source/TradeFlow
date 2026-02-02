package com.tradeflow.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import java.time.LocalDate;



@Entity
@Table(name = "machines")
@JsonIgnoreProperties({"spareParts", "hibernateLazyInitializer", "handler"})
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String model;
    private String serial;
    private LocalDate purchaseDate;
    @Column(nullable = true)
    private Double price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    @JsonIgnoreProperties("machines")
    private Customer customer;
    
    @ManyToMany(mappedBy = "machines")
    @JsonIgnoreProperties({"machines"})
    private List<SparePart> spareParts;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<SparePart> getSpareParts() {
		return spareParts;
	}

	public void setSpareParts(List<SparePart> spareParts) {
		this.spareParts = spareParts;
	}

	
}
