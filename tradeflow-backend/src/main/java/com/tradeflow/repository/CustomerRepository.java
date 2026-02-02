package com.tradeflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tradeflow.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
