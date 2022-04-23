package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.threeten.bp.LocalDate;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ConsultaExtratoBancarioDTO;
import com.indracompany.treinamento.model.entity.ExtratoBancario;
import com.indracompany.treinamento.model.repository.ExtratoBancarioRepository;
import com.indracompany.treinamento.model.entity.ContaBancaria;

@Service
public class ExtratoBancarioService extends GenericCrudService<ExtratoBancario, Long, ExtratoBancarioRepository>{

	@Autowired
	private ContaBancariaService contaBancariaService;
	
	public void salvarExtrato (String tipoDeMov, String agencia, String numero,double valor ) {
		if(valor > 0) {
			ExtratoBancario extrato = new ExtratoBancario();
			ContaBancaria conta = contaBancariaService.consultarConta(agencia, numero);
			extrato.setTipo_de_mov(tipoDeMov);
			LocalDate dtAgora = LocalDate.now();
			extrato.setData_de_movimentacao(dtAgora);
			extrato.setValor(valor);
			extrato.setContaBancaria(conta);
			super.salvar(extrato);
		}
	}
	
	public List<ConsultaExtratoBancarioDTO> obterExtratoPorAgenciaNumeroDataInicioDataFim(String agencia, String numero, LocalDate dtInicio, LocalDate dtFim){
		List<ExtratoBancario> listaExtrato = repository.findByAgenciaAndNumeroAndDataInicioAndDataFim(agencia, numero, dtInicio, dtFim);
		
		if (listaExtrato == null || listaExtrato.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		} 
		
		List<ConsultaExtratoBancarioDTO> retorno = new ArrayList<ConsultaExtratoBancarioDTO>();
		for (ExtratoBancario extrato: listaExtrato) {
			ConsultaExtratoBancarioDTO dto = new ConsultaExtratoBancarioDTO();
			BeanUtils.copyProperties(extrato, dto);
			retorno.add(dto);
		}
		return retorno;
			
	}
}
