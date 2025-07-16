package com.event_service.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Event {
    @Id
    private String id;
    private String title;
    private String description;
    private String date;
    private String time;
    private String status;

}