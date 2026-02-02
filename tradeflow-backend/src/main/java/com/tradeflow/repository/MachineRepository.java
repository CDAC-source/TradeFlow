package com.tradeflow.repository;

import com.tradeflow.entity.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MachineRepository extends JpaRepository<Machine, Long> {

    /* ============================
       SALES / DASHBOARD QUERIES
    ============================ */

    @Query("SELECT COALESCE(SUM(m.price), 0) FROM Machine m")
    double sumAllMachinePrices();

    @Query("""
        SELECT m.customer.name, m.name, m.price
        FROM Machine m
        WHERE m.customer IS NOT NULL
    """)
    List<Object[]> customerSales();

    @Query("""
        SELECT m.name
        FROM Machine m
        GROUP BY m.name
        ORDER BY COUNT(m.id) DESC
    """)
    List<String> findTopMachineNames();

    default String findTopMachineName() {
        List<String> list = findTopMachineNames();
        return list.isEmpty() ? null : list.get(0);
    }


    /* ============================
       TRENDS & ANALYTICS
    ============================ */

    // ✅ YEAR + MONTH SAFE TREND QUERY
    // RETURNS: [year, monthNumber, count]
    @Query("""
        SELECT
            FUNCTION('YEAR', m.purchaseDate),
            FUNCTION('MONTH', m.purchaseDate),
            COUNT(m.id)
        FROM Machine m
        WHERE m.purchaseDate IS NOT NULL
        GROUP BY
            FUNCTION('YEAR', m.purchaseDate),
            FUNCTION('MONTH', m.purchaseDate)
        ORDER BY
            FUNCTION('YEAR', m.purchaseDate),
            FUNCTION('MONTH', m.purchaseDate)
    """)
    List<Object[]> getMachinePurchaseTrendYearMonth();

    // Top machines by count
    @Query("""
        SELECT m.name, COUNT(m.id)
        FROM Machine m
        GROUP BY m.name
        ORDER BY COUNT(m.id) DESC
    """)
    List<Object[]> getTopMachines();
}
