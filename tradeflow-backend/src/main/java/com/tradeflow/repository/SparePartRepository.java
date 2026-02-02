package com.tradeflow.repository;

import com.tradeflow.dto.TopSparePartDto;
import com.tradeflow.entity.SparePart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SparePartRepository extends JpaRepository<SparePart, Long> {
	
	@Query("""
		    SELECT new com.tradeflow.dto.TopSparePartDto(
		        s.name,
		        COUNT(s.id)
		    )
		    FROM SparePart s
		    GROUP BY s.name
		    ORDER BY COUNT(s.id) DESC
		""")
		List<TopSparePartDto> findTopSellingSpareParts();


}