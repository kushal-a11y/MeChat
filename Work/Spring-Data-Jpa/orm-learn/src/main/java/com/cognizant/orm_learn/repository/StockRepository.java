package com.cognizant.orm_learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cognizant.orm_learn.model.Stock;
import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDate;



public interface StockRepository extends JpaRepository<Stock, Integer>{
    List<Stock> findByDateBetweenAndCode(LocalDate startdate, LocalDate enddate, String text);
    List<Stock> findByCodeAndCloseGreaterThan(String code,BigDecimal price);
    // @Query("SELECT s FROM Stock s order by s.volume desc")
    List<Stock> findAllByOrderByVolumeDesc();
    // @Query("SELECT s FROM Stock s order by s.close")
    List<Stock> findAllByOrderByCloseAsc();
}
