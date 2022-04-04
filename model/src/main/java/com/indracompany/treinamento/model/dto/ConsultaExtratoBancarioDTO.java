package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import javax.persistence.Column;
import org.threeten.bp.LocalDate;
import lombok.Data;

@Data
public class ConsultaExtratoBancarioDTO implements Serializable{
	
	private static final long serialVersionUID = 7241234582609797095L;
	private LocalDate data_de_movimentacao;
	private String tipo_de_mov;
	private double valor;

}
