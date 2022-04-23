package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.threeten.bp.LocalDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "extrato_bancario_RS_2")
public class ExtratoBancario extends GenericEntity<Long>{
	
	private static final long serialVersionUID = -5824703733929187165L;

	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate data_de_movimentacao;
	
	@Column(length = 15 , nullable = false)
	private String tipo_de_mov;
	
	@Column(nullable = false)
	private double valor;
	
	@ManyToOne
	@JoinColumn(name = "fk_ccontabancaria_id")
	private ContaBancaria contaBancaria;

}
