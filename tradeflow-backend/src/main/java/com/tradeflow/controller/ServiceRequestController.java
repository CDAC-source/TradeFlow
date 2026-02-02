package com.tradeflow.controller;

import com.tradeflow.entity.*;
import com.tradeflow.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceRequestController {

    private final ServiceRequestRepository repo;
    private final MechanicRepository mechanicRepo;

    public ServiceRequestController(
            ServiceRequestRepository repo,
            MechanicRepository mechanicRepo
    ) {
        this.repo = repo;
        this.mechanicRepo = mechanicRepo;
    }

    /* =========================
       GET ALL
    ========================= */
    @GetMapping
    public List<ServiceRequest> getAll() {
        return repo.findAll();
    }

    /* =========================
       GET BY ID
    ========================= */
    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /* =========================
       CREATE
    ========================= */
    @PostMapping
    public ServiceRequest create(@RequestBody ServiceRequest request) {

        if (request.getCustomer() == null || request.getCustomer().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Customer is required"
            );
        }

        request.setStatus(ServiceStatus.Pending);
        request.setCreatedDate(LocalDate.now());

        return repo.save(request);
    }

    /* =========================
       UPDATE
    ========================= */
    @PutMapping("/{id}")
    public ServiceRequest update(
            @PathVariable Long id,
            @RequestBody ServiceRequest updated
    ) {

        ServiceRequest sr = repo.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Service request not found"
                        )
                );

        ServiceStatus current = sr.getStatus();
        ServiceStatus incoming =
                updated.getStatus() != null ? updated.getStatus() : current;

        // 🚫 CLOSED → NO CHANGES
        if (current == ServiceStatus.Closed && incoming == ServiceStatus.Closed) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "No changes detected"
            );
        }

        // 🚫 Pending → Closed (skip not allowed)
        if (current == ServiceStatus.Pending && incoming == ServiceStatus.Closed) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Request must go through In Progress first"
            );
        }

        // 🚫 In Progress requires mechanic
        if (incoming == ServiceStatus.In_Progress &&
                (updated.getMechanic() == null || updated.getMechanic().getId() == null)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Assign a mechanic before starting work"
            );
        }

        /* ===== APPLY UPDATES ===== */

        sr.setType(updated.getType());
        sr.setDescription(updated.getDescription());
        sr.setStatus(incoming);

        if (updated.getMechanic() != null && updated.getMechanic().getId() != null) {
            Mechanic mech = mechanicRepo.findById(updated.getMechanic().getId())
                    .orElseThrow(() ->
                            new ResponseStatusException(
                                    HttpStatus.BAD_REQUEST,
                                    "Invalid mechanic"
                            )
                    );
            sr.setMechanic(mech);
        } else {
            sr.setMechanic(null);
        }

        return repo.save(sr);
    }

    /* =========================
       DELETE
    ========================= */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    /* =========================
       STATS
    ========================= */
    @GetMapping("/stats")
    public Map<String, Long> stats() {
        return Map.of(
                "pending", repo.countByStatus(ServiceStatus.Pending),
                "inProgress", repo.countByStatus(ServiceStatus.In_Progress),
                "closed", repo.countByStatus(ServiceStatus.Closed)
        );
    }
}
