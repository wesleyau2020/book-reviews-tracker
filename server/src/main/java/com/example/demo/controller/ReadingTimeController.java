package com.example.demo.controller;

import com.example.demo.model.ReadingTime;
import com.example.demo.service.ReadingTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
// import java.util.Optional;

@RestController
@RequestMapping("/api/reading-time")
public class ReadingTimeController {

    private final ReadingTimeService service;

    public ReadingTimeController(ReadingTimeService service) {
        this.service = service;
    }

    @GetMapping
    public List<ReadingTime> getAllReadingTimes() {
        return service.getAllReadingTimes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReadingTime> getReadingTimeById(@PathVariable Long id) {
        return service.getReadingTimeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<ReadingTime> getReadingTimeByDate(@PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return service.getReadingTimeByDate(parsedDate)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ReadingTime> saveReadingTime(@RequestBody ReadingTime readingTime) {
        System.out.println("Received reading time: " + readingTime.getMinutesSpent());
        return ResponseEntity.ok(service.saveReadingTime(readingTime));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReadingTime(@PathVariable Long id) {
        service.deleteReadingTime(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exceeds-one-hour")
    public ResponseEntity<Boolean> hasReadMoreThanOneHourToday() {
        boolean result = service.hasReadMoreThanOneHourToday();
        return ResponseEntity.ok(result);
    }
}
