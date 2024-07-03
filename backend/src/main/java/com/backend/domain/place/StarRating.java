package com.backend.domain.place;

import lombok.Data;

@Data
public class StarRating {
    private Integer id;
    private Integer hospitalId;
    private Integer memberId;
    private Integer rate;
}
