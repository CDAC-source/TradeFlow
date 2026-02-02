package com.tradeflow.repository;

import com.tradeflow.entity.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {

    // ✅ Revenue per machine (PAID invoices only)
    @Query("""
        SELECT m.name, SUM(ii.amount)
        FROM InvoiceItem ii
        JOIN ii.invoice i
        JOIN ii.machine m
        WHERE i.paymentStatus = 'PAID'
        GROUP BY m.name
        ORDER BY SUM(ii.amount) DESC
    """)
    List<Object[]> getTopMachinesByRevenue();
}
