package com.backend.mapper.place;

import com.backend.domain.place.Hospital;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface HospitalMapper {

    @Select("""
            SELECT *
            FROM hospital
            WHERE hospital_id = #{id}
            """)
    Hospital selectById(Integer id);
}
