package com.tradeflow.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import com.tradeflow.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    // ✅ TOTAL REVENUE = ONLY PAID INVOICES
    @Query("""
        SELECT COALESCE(SUM(i.totalAmount), 0)
        FROM Invoice i
        WHERE i.paymentStatus = 'PAID'
    """)
    double getTotalRevenue();

    // ✅ TOTAL PAID ORDERS
    @Query("""
        SELECT COUNT(i)
        FROM Invoice i
        WHERE i.paymentStatus = 'PAID'
    """)
    long getTotalPaidOrders();

    // ✅ TOP PRODUCT (FROM PAID INVOICES ONLY)
    @Query("""
        SELECT ii.machine.name
        FROM InvoiceItem ii
        WHERE ii.invoice.paymentStatus = 'PAID'
          AND ii.machine IS NOT NULL
        GROUP BY ii.machine.name
        ORDER BY SUM(ii.quantity) DESC
        LIMIT 1
    """)
    String getTopProduct();
}
