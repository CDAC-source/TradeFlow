package com.tradeflow.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Entity
@Table(name = "spare_parts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SparePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String hsn;

    @Column(nullable = false)
    private Integer quantity;

    // ✅ NEW
    @Column(nullable = false)
    private Double price;

    private Integer rackRow;
    private Integer rackCol;

    @ManyToMany
    @JoinTable(
        name = "spare_part_machines",
        joinColumns = @JoinColumn(name = "spare_part_id"),
        inverseJoinColumns = @JoinColumn(name = "machine_id")
    )
    @JsonIgnoreProperties({"machines", "customer"})
    private List<Machine> machines;

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

	public String getHsn() {
		return hsn;
	}

	public void setHsn(String hsn) {
		this.hsn = hsn;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

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

	public List<Machine> getMachines() {
		return machines;
	}

	public void setMachines(List<Machine> machines) {
		this.machines = machines;
	}
    
    
}
