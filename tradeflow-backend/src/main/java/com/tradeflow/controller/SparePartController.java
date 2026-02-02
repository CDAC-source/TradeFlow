package com.tradeflow.controller;

import com.tradeflow.dto.RackRequest;
import com.tradeflow.entity.Machine;
import com.tradeflow.entity.SparePart;
import com.tradeflow.repository.MachineRepository;
import com.tradeflow.repository.SparePartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/spare-parts")
@CrossOrigin(origins = "http://localhost:5173")
public class SparePartController {

    private final SparePartRepository sparePartRepository;
    private final MachineRepository machineRepository;

    public SparePartController(
            SparePartRepository sparePartRepository,
            MachineRepository machineRepository) {
        this.sparePartRepository = sparePartRepository;
        this.machineRepository = machineRepository;
    }

    // GET ALL
    @GetMapping
    public List<SparePart> getAll() {
        return sparePartRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<SparePart> getById(@PathVariable Long id) {
        return sparePartRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<SparePart> create(@RequestBody SparePart part) {

        if (part.getMachines() != null) {
            List<Machine> machines = part.getMachines().stream()
                .map(m -> machineRepository.findById(m.getId()).orElseThrow())
                .toList();
            part.setPrice(part.getPrice());
            part.setMachines(new ArrayList<>(machines)); // ✅ mutable
        }

        return ResponseEntity.status(201).body(sparePartRepository.save(part));
    }




    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<SparePart> update(
            @PathVariable Long id,
            @RequestBody SparePart updatedPart) {

        SparePart existing = sparePartRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Spare part not found"));

        existing.setName(updatedPart.getName());
        existing.setHsn(updatedPart.getHsn());
        existing.setQuantity(updatedPart.getQuantity());
        existing.setPrice(updatedPart.getPrice());


        // ✅ SAFE machine update
        if (updatedPart.getMachines() != null) {
            existing.getMachines().clear();

            for (Machine m : updatedPart.getMachines()) {
                Machine machine = machineRepository.findById(m.getId())
                    .orElseThrow(() -> new RuntimeException("Machine not found"));
                existing.getMachines().add(machine);
            }
        }

        return ResponseEntity.ok(sparePartRepository.save(existing));
    }



    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!sparePartRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        sparePartRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/rack")
    public ResponseEntity<SparePart> assignRack(
            @PathVariable Long id,
            @RequestBody RackRequest req) {

        return sparePartRepository.findById(id).map(part -> {
            part.setRackRow(req.getRackRow());
            part.setRackCol(req.getRackCol());
            return ResponseEntity.ok(sparePartRepository.save(part));
        }).orElse(ResponseEntity.notFound().build());
    }
}
