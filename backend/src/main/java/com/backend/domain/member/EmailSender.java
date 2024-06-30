package com.backend.domain.member;

import lombok.Data;

@Data
public class EmailSender {
    private String address;
    private String title;
    private String content;
}
