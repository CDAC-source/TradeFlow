package com.tradeflow.controller;

import java.time.Year;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.tradeflow.entity.*;
import com.tradeflow.repository.*;
import com.tradeflow.service.InvoicePdfService;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT }
)
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private InvoicePdfService pdfService;

    @PostMapping
    public Invoice create(@RequestBody Invoice invoice) {

        if (invoice.getItems() == null || invoice.getItems().isEmpty()) {
            throw new RuntimeException("Invoice must contain at least one item");
        }

        // Attach managed customer
        Long customerId = invoice.getCustomer().getId();
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        invoice.setCustomer(customer);

        // Invoice number
        long count = invoiceRepo.count() + 1;
        invoice.setInvoiceNumber(
                "INV-" + Year.now().getValue() + "-" + String.format("%03d", count)
        );

        double subtotal = 0;

        for (InvoiceItem item : invoice.getItems()) {
            item.setInvoice(invoice);
            item.setAmount(item.getRate() * item.getQuantity());
            subtotal += item.getAmount();
        }

        invoice.setSubtotal(subtotal);

        double discountAmount = subtotal * invoice.getDiscountPercent() / 100;
        invoice.setDiscountAmount(discountAmount);

        double taxableAmount = subtotal - discountAmount;
        double gstAmount = taxableAmount * invoice.getGstPercent() / 100;

        double cgst = 0, sgst = 0, igst = 0;

        if ("CGST_SGST".equals(invoice.getGstType())) {
            cgst = gstAmount / 2;
            sgst = gstAmount / 2;
        } else {
            igst = gstAmount;
        }

        invoice.setCgst(cgst);
        invoice.setSgst(sgst);
        invoice.setIgst(igst);

        invoice.setTaxAmount(cgst + sgst + igst);
        invoice.setTotalAmount(taxableAmount + gstAmount);

        // default payment & delivery state
        invoice.setPaidAmount(0);
        invoice.setPaymentStatus("UNPAID");
        invoice.setDeliveryStatus("PENDING");

        return invoiceRepo.save(invoice);
    }

    @GetMapping
    public List<Invoice> getAll() {
        return invoiceRepo.findAll();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> pdf(@PathVariable Long id) throws Exception {

        Invoice invoice = invoiceRepo.findById(id).orElseThrow();
        byte[] pdf = pdfService.generate(invoice);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + invoice.getInvoiceNumber() + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        if (!invoiceRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        invoiceRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/payment")
    public ResponseEntity<Invoice> updatePayment(
            @PathVariable Long id,
            @RequestBody Map<String, Object> req) {

        Invoice invoice = invoiceRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Invoice not found"));

        double paid = Double.parseDouble(req.get("paidAmount").toString());
        invoice.setPaidAmount(paid);

        if (paid <= 0) {
            invoice.setPaymentStatus("UNPAID");
        } else if (paid < invoice.getTotalAmount()) {
            invoice.setPaymentStatus("PARTIAL");
        } else {
            invoice.setPaymentStatus("PAID");
        }

        invoice.setDeliveryStatus(req.get("deliveryStatus").toString());

        return ResponseEntity.ok(invoiceRepo.save(invoice));
    }

}
