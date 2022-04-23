package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import javax.persistence.Column;
import org.threeten.bp.LocalDate;

import lombok.Data;

@Data
public class SalvaExtratoBancariaDTO implements Serializable{
	
	private static final long serialVersionUID = 7241234582609797095L;
	private LocalDate dataDeMovimentacao;
	private String tipoDeMov;
	private double valor;

}
