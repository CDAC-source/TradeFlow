package com.tradeflow.repository;

import com.tradeflow.entity.ServiceRequest;
import com.tradeflow.entity.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    long countByStatus(ServiceStatus status);
}
