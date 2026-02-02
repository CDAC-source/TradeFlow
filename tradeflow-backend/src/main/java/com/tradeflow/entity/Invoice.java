package com.tradeflow.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoice")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "invoice_date")
    private LocalDate invoiceDate = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(
        mappedBy = "invoice",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<InvoiceItem> items = new ArrayList<>();

    private double subtotal;

    @Column(name = "discount_percent", nullable = false)
    private double discountPercent;

    @Column(name = "discount_amount", nullable = false)
    private double discountAmount;

    @Column(name = "gst_type")
    private String gstType;

    @Column(name = "gst_percent", nullable = false)
    private double gstPercent;

    @Column(name = "tax_percent", nullable = false)
    private double taxPercent;

    private double cgst;
    private double sgst;
    private double igst;

    @Column(name = "tax_amount", nullable = false)
    private double taxAmount;

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @Column(name = "company_name")
    private String companyName = "TradeFlow Pvt Ltd";

    @Column(name = "company_address")
    private String companyAddress = "Nashik, Maharashtra, India";
    
    @Column(name = "paid_amount", nullable = false)
    private double paidAmount = 0;

    @Column(name = "payment_status")
    private String paymentStatus = "UNPAID";

    @Column(name = "delivery_status")
    private String deliveryStatus = "PENDING";

    /* ===== Getters & Setters ===== */

    public Long getId() { return id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public LocalDate getInvoiceDate() { return invoiceDate; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<InvoiceItem> getItems() { return items; }
    public void setItems(List<InvoiceItem> items) { this.items = items; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(double discountPercent) { this.discountPercent = discountPercent; }

    public double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(double discountAmount) { this.discountAmount = discountAmount; }

    public String getGstType() { return gstType; }
    public void setGstType(String gstType) { this.gstType = gstType; }

    public double getGstPercent() { return gstPercent; }
    public void setGstPercent(double gstPercent) { 
        this.gstPercent = gstPercent;
        this.taxPercent = gstPercent; // 🔥 IMPORTANT
    }

    public double getTaxPercent() { return taxPercent; }

    public double getCgst() { return cgst; }
    public void setCgst(double cgst) { this.cgst = cgst; }

    public double getSgst() { return sgst; }
    public void setSgst(double sgst) { this.sgst = sgst; }

    public double getIgst() { return igst; }
    public void setIgst(double igst) { this.igst = igst; }

    public double getTaxAmount() { return taxAmount; }
    public void setTaxAmount(double taxAmount) { this.taxAmount = taxAmount; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getCompanyName() { return companyName; }
    public String getCompanyAddress() { return companyAddress; }
    
    public double getPaidAmount() { return paidAmount; }
    public void setPaidAmount(double paidAmount) { this.paidAmount = paidAmount; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getDeliveryStatus() { return deliveryStatus; }
    public void setDeliveryStatus(String deliveryStatus) { this.deliveryStatus = deliveryStatus; }
}
