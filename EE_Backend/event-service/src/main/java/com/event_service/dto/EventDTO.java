package com.event_service.dto;

import lombok.Data;

@Data
public class EventDTO {

    private String id;
    private String title;
    private String description;
    private String date; // Formato ISO-8601
    private String time;
    private String status;
}