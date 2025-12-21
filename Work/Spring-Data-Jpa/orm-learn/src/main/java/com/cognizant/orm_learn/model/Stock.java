package com.cognizant.orm_learn.model;

import java.beans.Transient;
import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="stock")
@Data
public class Stock {
    @Id
    @Column(name="st_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="st_code")
    private String code;

    @Column(name="st_date")
    private LocalDate date;

    @Column(name="st_open", precision = 10, scale = 2)
    private BigDecimal open;

    @Column(name="st_close", precision = 10, scale = 2)
    private BigDecimal close;

    @Column(name="st_volume")
    private BigDecimal volume;


}
