package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.Jsr310Converters.StringToLocalDateConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.threeten.bp.LocalDate;
import com.indracompany.treinamento.model.dto.ConsultaContaBancariaDTO;
import com.indracompany.treinamento.model.dto.ConsultaExtratoBancarioDTO;
import com.indracompany.treinamento.model.dto.DepositoDTO;
import com.indracompany.treinamento.model.dto.SaqueDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.service.ContaBancariaService;
import com.indracompany.treinamento.model.service.ExtratoBancarioService;

import jxl.write.DateTime;

@RestController
@RequestMapping("rest/contas")
public class ContaBancariaRest extends GenericCrudRest<ContaBancaria, Long, ContaBancariaService>{
	
	@Autowired
	private ContaBancariaService contaBancariaService;
	@Autowired
	private ExtratoBancarioService extratoBancarioService;
	
	
	@GetMapping(value = "/consultar-saldo/{agencia}/{numeroConta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Double> consultarSaldo(String agencia, String numeroConta){
		double saldo = contaBancariaService.consultarSaldo(agencia, numeroConta);
		return new ResponseEntity<>(saldo, HttpStatus.OK);
	}

	@GetMapping(value = "/consultar-contas-por-cpf/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ConsultaContaBancariaDTO>> consultarContasPorCpf(@PathVariable String cpf){
		List<ConsultaContaBancariaDTO> contas = contaBancariaService.obterContasPorCpf(cpf);
		if (contas == null || contas.isEmpty()) {
			return new ResponseEntity<List<ConsultaContaBancariaDTO>>(contas, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<ConsultaContaBancariaDTO>>(contas, HttpStatus.OK);
	}
	
	@PutMapping(value = "/deposito", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> depositar(@RequestBody DepositoDTO dto){
		contaBancariaService.depositar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		extratoBancarioService.salvarExtrato("Deposito", dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/saque", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody SaqueDTO dto){
		contaBancariaService.sacar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		extratoBancarioService.salvarExtrato("Saque", dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/transferencia", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody TransferenciaBancariaDTO dto){
		contaBancariaService.transferir(dto);
		extratoBancarioService.salvarExtrato("Trasferencia", dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor());
		extratoBancarioService.salvarExtrato("Trasferencia", dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	

	@GetMapping(value = "/consultarExtratoPorAgenciaNumeroDataInicioDataFim/{agencia}/{numeroConta}/{dt_inicio}/{dt_fim}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ConsultaExtratoBancarioDTO>> consultarExtratoPorAgenciaNumeroDataInicioDataFim(String agencia,String numeroConta,String dtInicio, String dtFim){
		LocalDate dataInicio = LocalDate.parse(dtInicio);
		LocalDate dataFim = LocalDate.parse(dtFim);
		
		List<ConsultaExtratoBancarioDTO> dto = extratoBancarioService.obterExtratoPorAgenciaNumeroDataInicioDataFim(agencia,numeroConta,dataInicio,dataFim);
		
		if (dto == null || dto.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
		
	}
}
